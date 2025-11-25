"use client";

import { useState } from "react";
import { UserForm } from "@/components/user-form";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUserAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen mx-auto bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
            Delete User Management
          </h1>
          <p className="text-center text-gray-600">
            Add, view, and manage users easily
          </p>
        </div>

        <div className="">
          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Delete User
            </h2>
            <UserForm onSuccess={handleUserAdded} />
          </div>
        </div>
      </div>
    </main>
  );
}
