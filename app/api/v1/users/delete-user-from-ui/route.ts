import { type NextRequest, NextResponse } from "next/server"

const EXTERNAL_API_URL = "http://72.60.178.71:7070/api/v1/users/delete-user-from-ui"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email } = body

        // Validation
        if (!name || !email) {
            return NextResponse.json({ message: "Name and email are required" }, { status: 400 })
        }

        // Call external API
        const response = await fetch(EXTERNAL_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email }),
        })

        const data = await response.json()

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || "Failed to process request" },
                { status: response.status }
            )
        }

        return NextResponse.json(data, { status: response.status })
    } catch (error) {
        console.error("Error calling external API:", error)
        return NextResponse.json(
            { message: "Internal server error", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        )
    }
}
