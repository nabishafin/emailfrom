"use client"

import { useState } from "react"
import { UserForm } from "@/components/user-form"
import { UserList } from "@/components/user-list"

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleUserAdded = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">User Management</h1>
          <p className="text-center text-gray-600">Add, view, and manage users easily</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New User</h2>
            <UserForm onSuccess={handleUserAdded} />
          </div>

          {/* Users List Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">All Users</h2>
            <UserList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </main>
  )
}
