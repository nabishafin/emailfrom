import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (replace with database in production)
const users: Array<{ id: string; name: string; email: string }> = []

export async function GET() {
  return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validation
    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 })
    }

    if (!email.includes("@")) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Check for duplicate email
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 })
    }

    // Create user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: name.trim(),
      email: email.trim(),
    }

    users.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
