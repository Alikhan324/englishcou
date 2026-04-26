import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { currentUser } from "@/data/user";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseProgress from "@/components/CourseProgress";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const courseId = Number(id);

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    notFound();
  }

  const courseLessons = lessons.filter(
    (lesson) => lesson.courseId === courseId
  );

  return (
    <main className="page-shell">
      <section className="max-w-5xl mx-auto px-6 py-14">
        <Link
          href="/courses"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors duration-300 hover:text-accent-hover"
        >
          <span aria-hidden>←</span> Back to courses
        </Link>

        <div className="mt-8 mb-10">
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-soft-fg">
            {course.level}
          </span>

          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {course.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-muted leading-relaxed">{course.description}</p>
        </div>

        <CourseProgress
          courseId={course.id}
          totalLessons={courseLessons.length}
        />

        {courseLessons.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-foreground mb-2">No lessons yet</h2>
            <p className="text-muted">Бұл курсқа сабақтар әлі қосылған жоқ.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {courseLessons.map((lesson) => {
              const isLocked = lesson.isPremium && !currentUser.isPremium;

              return (
                <Link
                  key={lesson.id}
                  href={isLocked ? "/pricing" : `/lessons/${lesson.id}`}
                  className={
                    isLocked
                      ? "card-locked block rounded-3xl p-6 opacity-95 shadow-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-md"
                      : "card-elevated block rounded-3xl p-6"
                  }
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-2xl font-semibold text-foreground">
                          {lesson.title}
                        </h2>

                        {lesson.isPremium && (
                          <span className="badge-premium">Premium</span>
                        )}
                      </div>

                      <p className="text-muted">{lesson.description}</p>
                    </div>

                    <span
                      className={
                        isLocked
                          ? "pill-locked shrink-0"
                          : "inline-flex shrink-0 items-center justify-center rounded-xl bg-accent-soft px-4 py-2 text-sm font-semibold text-accent"
                      }
                    >
                      {isLocked ? "Locked" : lesson.duration}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
