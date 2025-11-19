// Explicitly load .env.local (Next.js style) or fallback to .env
const path = require('path')
const dotenv = require('dotenv')
// Resolve .env.local relative to this file so Netlify Functions can find it
dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') })
dotenv.config() // fallback if .env.local not found

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// Models
const Member = require('./models/Member')
const Event = require('./models/Event')
const Project = require('./models/Project')

const app = express()
app.use(cors())
app.use(express.json())

// In Netlify Functions, the incoming path may be "/public/..." instead of "/api/public/...".
// Normalize by prefixing "/api" when missing so our routes match in both environments.
app.use((req, _res, next) => {
  // Normalize Netlify Functions base path if present
  const FN_BASE = '/.netlify/functions/api'
  if (req.url.startsWith(FN_BASE)) {
    req.url = req.url.slice(FN_BASE.length) || '/'
  }
  // Ensure all requests are rooted under /api so our routes match
  if (!req.url.startsWith('/api/')) {
    const suffix = req.url.startsWith('/') ? req.url : `/${req.url}`
    req.url = `/api${suffix}`
  }
  if (process.env.NETLIFY || process.env.NODE_ENV === 'development') {
    // Light debug: log normalized URL for routing diagnostics
    try { console.log('[FN]', req.method, req.originalUrl, '->', req.url) } catch {}
  }
  next()
})

// Debug endpoint to verify path normalization
app.get('/api/debug', (req, res) => {
  res.json({ ok: true, url: req.url, path: req.path })
})

// Config
const MONGO_URI = process.env.MONGO_URI
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gravity123'
const ADMIN_ID = process.env.ADMIN_ID || '123456'
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'

if (!MONGO_URI) {
  // Do NOT throw in serverless context; allow health endpoint to report missing config.
  console.error('[Config] MONGO_URI is undefined. API routes will return 503 for DB access.')
}

// Connect to MongoDB (reuse connection across hot reloads / serverless invocations)
if (MONGO_URI && !global.__MONGO_CONN_PROMISE__) {
  global.__MONGO_CONN_PROMISE__ = mongoose
    .connect(MONGO_URI, { dbName: 'gravity' })
    .then(() => console.log('[MongoDB] Connected'))
    .catch((err) => {
      console.error('[MongoDB] Connection error', err.message)
    })
}

function auth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' })
  const token = authHeader.replace('Bearer ', '')
  try {
    jwt.verify(token, JWT_SECRET)
    next()
  } catch (_e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

// Simple health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, env: { hasMongoUri: !!process.env.MONGO_URI, adminId: !!ADMIN_ID } })
})

// Diagnostic endpoint for deployment troubleshooting
app.get('/api/diag', (_req, res) => {
  const keys = ['MONGO_URI','ADMIN_ID','ADMIN_PASSWORD','JWT_SECRET']
  const envPresence = Object.fromEntries(keys.map(k => [k, !!process.env[k]]))
  const stateMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' }
  let mongoState = 'not-initialized'
  try { mongoState = stateMap[mongoose.connection.readyState] ?? String(mongoose.connection.readyState) } catch {}
  res.json({ ok: true, mongo: { state: mongoState }, env: envPresence })
})

// Auth
app.post('/api/admin/login', (req, res) => {
  try {
    const { id, password } = req.body || {}
    if (!id || !password) {
      return res.status(400).json({ error: 'Missing id or password' })
    }
    if (id === ADMIN_ID && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ admin: true, id }, JWT_SECRET, { expiresIn: '2h' })
      return res.json({ token })
    }
    return res.status(401).json({ error: 'Invalid credentials' })
  } catch (e) {
    console.error('[Login] Error', e)
    return res.status(500).json({ error: 'Login failed' })
  }
})

// Public, read-only endpoints
app.get('/api/public/members', async (_req, res) => {
  if (!MONGO_URI) return res.status(503).json({ error: 'Database unavailable (no MONGO_URI)' })
  try {
    const members = await Member.find().sort({ createdAt: -1 })
    res.json(members)
  } catch (_e) {
    console.error('[Members] Public fetch error:', _e && _e.message)
    res.status(500).json({ error: 'Failed to load members' })
  }
})

app.get('/api/public/events', async (_req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (_e) {
    res.status(500).json({ error: 'Failed to load events' })
  }
})

app.get('/api/public/projects', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (_e) {
    res.status(500).json({ error: 'Failed to load projects' })
  }
})

// Admin-protected CRUD
app.get('/api/members', auth, async (_req, res) => {
  const members = await Member.find().sort({ createdAt: -1 })
  res.json(members)
})

app.post('/api/members', auth, async (req, res) => {
  try {
    const member = await Member.create(req.body)
    res.status(201).json(member)
  } catch (e) {
    try {
      const bodyPreview = JSON.stringify(req.body).slice(0, 1000)
      console.error('[Members] Create failed. Body preview:', bodyPreview)
    } catch (_) {}
    res.status(400).json({ error: e.message })
  }
})

app.put('/api/members/:id', auth, async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.delete('/api/members/:id', auth, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.get('/api/events', auth, async (_req, res) => {
  const events = await Event.find().sort({ date: 1 })
  res.json(events)
})

app.post('/api/events', auth, async (req, res) => {
  try {
    const event = await Event.create(req.body)
    res.status(201).json(event)
  } catch (e) {
    try {
      const bodyPreview = JSON.stringify(req.body).slice(0, 1000)
      console.error('[Events] Create failed. Body preview:', bodyPreview)
    } catch (_) {}
    res.status(400).json({ error: e.message })
  }
})

app.put('/api/events/:id', auth, async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.delete('/api/events/:id', auth, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.get('/api/projects', auth, async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 })
  res.json(projects)
})

app.post('/api/projects', auth, async (req, res) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json(project)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.put('/api/projects/:id', auth, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

app.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

// Global error handler (placed before 404)
// Any uncaught error bubbles here instead of producing a 502/timeout.
app.use((err, _req, res, _next) => {
  console.error('[API ERROR]', err && err.stack ? err.stack : err)
  res.status(500).json({ error: 'Internal server error', detail: err && err.message })
})

// Final catch-all 404 AFTER all route definitions
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', url: req.url })
})

module.exports = app
