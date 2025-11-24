import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (same as in route.ts - replace with database)
const users: Array<{ id: string; name: string; email: string }> = []

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = users.find((u) => u.id === id)

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const userIndex = users.findIndex((u) => u.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }

  users.splice(userIndex, 1)

  return NextResponse.json({ message: "User deleted successfully" })
}
