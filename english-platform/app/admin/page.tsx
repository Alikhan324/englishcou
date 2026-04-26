"use client";

import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (password === "alikhan123") {
      setIsAdmin(true);
      setError("");
    } else {
      setError("Қате пароль");
    }
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-white p-6 shadow"
        >
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Admin Login
          </h1>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && (
            <p className="mt-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            Кіру
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Panel
        </h1>

        <p className="mt-2 text-gray-600">
          Бұл жер тек админге арналған.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">Lessons</h2>
            <p className="text-sm text-gray-500">Сабақтарды басқару</p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">Users</h2>
            <p className="text-sm text-gray-500">Қолданушылар</p>
          </div>

          <div className="rounded-xl border p-4">
            <h2 className="font-semibold">Statistics</h2>
            <p className="text-sm text-gray-500">Сайт статистикасы</p>
          </div>
        </div>
      </div>
    </main>
  );
}