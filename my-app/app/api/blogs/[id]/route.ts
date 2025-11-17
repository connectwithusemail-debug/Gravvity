import { NextResponse } from "next/server"
import connectToDatabase from "../../../../lib/mongoose"
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

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAuth(request)) return unauthorized()
  const { id } = await params
  const body = await request.json().catch(() => ({}))
  await connectToDatabase()
  try {
    const updated = await Blog.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json(updated)
  } catch (e: any) {
    console.error('[Blog PUT] error', e?.message)
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAuth(request)) return unauthorized()
  const { id } = await params
  await connectToDatabase()
  try {
    await Blog.findByIdAndDelete(id)
    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('[Blog DELETE] error', e?.message)
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}
