import { NextResponse } from "next/server"
import connectToDatabase from "../../../lib/mongoose"
import { Blog } from "@/lib/models/blog"

export const runtime = "nodejs"

function unauthorized() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
}

function requireAuth(request: Request) {
  const auth = request.headers.get('authorization')
  const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me'
  if (!auth) return false
  try {
    const token = auth.replace('Bearer ', '')
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken')
    jwt.verify(token, JWT_SECRET)
    return true
  } catch {
    return false
  }
}

export async function GET(request: Request) {
  if (!requireAuth(request)) return unauthorized()
  await connectToDatabase()
  const blogs = await Blog.find().sort({ createdAt: -1 })
  return NextResponse.json(blogs)
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  const { title, name, rollNumber, mediumUrl, datePublished } = body as Record<string, string>
  if (!title || !name || !rollNumber || !mediumUrl) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }
  await connectToDatabase()
  try {
    const created = await Blog.create({ title: title.trim(), name: name.trim(), rollNumber: rollNumber.trim(), mediumUrl: mediumUrl.trim(), datePublished: (datePublished || new Date().toISOString()), approved: false })
    return NextResponse.json(created, { status: 201 })
  } catch (e: any) {
    console.error('[Blog POST] error', e?.message)
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 })
  }
}
