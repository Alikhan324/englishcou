import Link from "next/link";
import { courses } from "@/data/courses";

export default function CoursesPage() {
  return (
    <main className="page-shell">
      <section className="max-w-6xl mx-auto px-6 py-14 md:py-20">
        <div className="mb-12 md:mb-14 max-w-2xl">
          <p className="font-display text-accent font-semibold tracking-wide text-sm uppercase mb-3">
            Courses
          </p>

          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground mb-4">
            Choose your English course
          </h1>

          <p className="text-muted text-lg leading-relaxed">
            Өзіңе керек курсты таңда. Әр курс қазақша және орысша түсіндірумен
            беріледі.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course) => (
            <article
              key={course.id}
              className="card-elevated flex flex-col rounded-3xl p-7 md:p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-soft-fg">
                  {course.level}
                </span>

                <span className="text-sm text-muted">{course.lessons} lessons</span>
              </div>

              <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
                {course.title}
              </h2>

              <p className="text-muted leading-relaxed mb-8 flex-1">{course.description}</p>

              <Link
                href={`/courses/${course.id}`}
                className="btn-primary mt-auto block w-full rounded-xl py-3 text-center text-sm"
              >
                Open course
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
