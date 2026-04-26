import { lessons } from "@/data/lessons";
import { quizzes } from "@/data/quizzes";
import { currentUser } from "@/data/user";
import Link from "next/link";
import { notFound } from "next/navigation";
import LessonCompleteButton from "@/components/LessonCompleteButton";
import Quiz from "@/components/Quiz";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function LessonPage({ params }: Props) {
  const { id } = await params;
  const lessonId = Number(id);

  const lesson = lessons.find((item) => item.id === lessonId);

  if (!lesson) {
    notFound();
  }

  if (lesson.isPremium && !currentUser.isPremium) {
    return (
      <main className="page-shell">
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="card-locked rounded-3xl p-10 text-center shadow-sm">
            <div className="font-display mb-5 text-5xl text-accent" aria-hidden>
              ◆
            </div>

            <h1 className="font-display mb-3 text-3xl font-semibold text-foreground">
              This lesson is premium
            </h1>

            <p className="mb-8 text-muted leading-relaxed">
              Бұл сабақты көру үшін premium access керек.
            </p>

            <Link href="/pricing" className="btn-primary inline-block rounded-xl px-8 py-3 text-sm">
              View premium plan
            </Link>

            <div className="mt-8">
              <Link
                href={`/courses/${lesson.courseId}`}
                className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
              >
                ← Back to course
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const courseLessons = lessons.filter(
    (item) => item.courseId === lesson.courseId
  );

  const currentIndex = courseLessons.findIndex(
    (item) => item.id === lesson.id
  );

  const previousLesson = courseLessons[currentIndex - 1];
  const nextLesson = courseLessons[currentIndex + 1];

  const quiz = quizzes.find((item) => item.lessonId === lesson.id);

  return (
    <main className="page-shell">
      <section className="mx-auto max-w-4xl px-6 py-14">
        <Link
          href={`/courses/${lesson.courseId}`}
          className="text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          ← Back to lessons
        </Link>

        <div className="mb-10 mt-8">
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-soft-fg">
            {lesson.badge}
          </span>

          <h1 className="font-display mt-5 text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {lesson.shortTitle}
          </h1>

          <p className="mt-4 text-lg text-muted leading-relaxed">{lesson.description}</p>
        </div>

        <div className="grid gap-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">Қазақша түсіндіру</h2>
            <p className="leading-relaxed text-muted">{lesson.contentKz}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">Русское объяснение</h2>
            <p className="leading-relaxed text-muted">{lesson.contentRu}</p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-4 text-2xl font-semibold text-foreground">Examples</h2>

            <div className="grid gap-4 sm:grid-cols-3">
              {lesson.examples.map((example) => (
                <div
                  key={example.letter}
                  className="rounded-2xl border border-border bg-accent-soft/50 p-4 text-center transition-transform duration-300 hover:-translate-y-0.5 dark:bg-accent-soft/20"
                >
                  <p className="font-display text-3xl font-semibold text-accent">{example.letter}</p>
                  <p className="text-sm text-muted">{example.word}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">Practice</h2>

            <p className="mb-4 text-muted">Мына мысалдарды дауыстап оқы:</p>

            <ul className="space-y-2 text-foreground/90">
              {lesson.examples.map((example) => (
                <li key={example.letter}>
                  {example.letter} — {example.word}
                </li>
              ))}
            </ul>
          </div>

          {quiz && <Quiz questions={quiz.questions} />}
        </div>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8">
          <h2 className="font-display mb-3 text-2xl font-semibold text-foreground">Lesson status</h2>
          <p className="mb-5 text-muted">Сабақты аяқтасаң, төмендегі кнопканы бас.</p>

          <LessonCompleteButton courseId={lesson.courseId} lessonId={lesson.id} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {previousLesson ? (
            <Link
              href={`/lessons/${previousLesson.id}`}
              className="btn-ghost rounded-xl px-5 py-3 text-sm font-semibold"
            >
              ← Previous lesson
            </Link>
          ) : (
            <div />
          )}

          {nextLesson ? (
            <Link href={`/lessons/${nextLesson.id}`} className="btn-primary rounded-xl px-5 py-3 text-sm">
              Next lesson →
            </Link>
          ) : (
            <Link
              href={`/courses/${lesson.courseId}`}
              className="rounded-xl bg-deep px-5 py-3 text-sm font-semibold text-on-deep transition-colors duration-300 hover:bg-deep-hover"
            >
              Finish course
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
