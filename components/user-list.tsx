"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface User {
  id: string
  name: string
  email: string
}

interface UserListProps {
  refreshTrigger: number
}

export function UserList({ refreshTrigger }: UserListProps) {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [refreshTrigger])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/users")
      const data = await response.json()
      if (Array.isArray(data)) {
        setUsers(data)
      }
    } catch (error) {
      console.error("Failed to fetch users:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return

    setDeletingId(id)
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete user")
      }

      setUsers(users.filter((user) => user.id !== id))
    } catch (error) {
      console.error("Failed to delete user:", error)
      alert("Failed to delete user")
    } finally {
      setDeletingId(null)
    }
  }

  if (loading) {
    return <div className="text-center text-gray-500 py-8">Loading users...</div>
  }

  if (users.length === 0) {
    return <div className="text-center text-gray-500 py-8">No users yet. Add one to get started!</div>
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <Button
            onClick={() => handleDelete(user.id)}
            disabled={deletingId === user.id}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
          >
            {deletingId === user.id ? "Deleting..." : "Delete"}
          </Button>
        </div>
      ))}
    </div>
  )
}
