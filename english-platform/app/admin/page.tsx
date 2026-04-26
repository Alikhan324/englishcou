export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow">
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>

        <p className="mt-2 text-gray-600">
          Бұл бет тек админге арналған.
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