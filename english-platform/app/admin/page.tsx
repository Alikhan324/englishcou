const stats = [
  {
    title: "Courses",
    value: "3",
  },
  {
    title: "Lessons",
    value: "9",
  },
  {
    title: "Students",
    value: "0",
  },
];

export default function AdminPage() {
  return (
    <main className="page-shell">
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl mb-3">
          Admin Panel
        </h1>

        <p className="mb-10 max-w-2xl text-muted text-lg leading-relaxed">
          Курстарды, сабақтарды және материалдарды осы жерден басқарасың.
        </p>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow duration-500 hover:shadow-md"
            >
              <p className="text-sm font-medium text-muted">{item.title}</p>

              <h2 className="font-display mt-2 text-3xl font-semibold text-accent">{item.value}</h2>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="font-display mb-6 text-2xl font-semibold text-foreground">Create new lesson</h2>

          <form className="grid gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Lesson title</label>

              <input
                type="text"
                placeholder="Lesson 4: Present Simple"
                className="input-field"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Kazakh explanation</label>

              <textarea
                placeholder="Қазақша түсіндіру..."
                className="input-field min-h-28 resize-y"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Russian explanation</label>

              <textarea
                placeholder="Русское объяснение..."
                className="input-field min-h-28 resize-y"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-foreground">Upload material</label>

              <input type="file" className="input-field py-2 file:mr-4 file:rounded-lg file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-sm file:font-semibold file:text-accent-soft-fg" />
            </div>

            <button type="button" className="btn-primary rounded-xl py-3 text-sm">
              Save lesson
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
