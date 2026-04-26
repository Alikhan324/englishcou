"use client";

import { useEffect, useState } from "react";

type Props = {
  courseId: number;
  totalLessons: number;
};

export default function CourseProgress({ courseId, totalLessons }: Props) {
  const [completedCount, setCompletedCount] = useState(0);

  const storageKey = `completed-lessons-course-${courseId}`;

  useEffect(() => {
    function updateProgress() {
      const saved = localStorage.getItem(storageKey);
      const completedLessons: number[] = saved ? JSON.parse(saved) : [];
      setCompletedCount(completedLessons.length);
    }

    updateProgress();

    window.addEventListener("storage", updateProgress);

    return () => {
      window.removeEventListener("storage", updateProgress);
    };
  }, [storageKey]);

  const progress =
    totalLessons === 0 ? 0 : Math.round((completedCount / totalLessons) * 100);

  return (
    <div className="card-elevated mb-8 rounded-3xl border border-border bg-card p-6 md:p-7 shadow-none hover:translate-y-0 hover:shadow-none">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">Your progress</h2>
        <span className="font-semibold text-accent">
          {completedCount}/{totalLessons} lessons
        </span>
      </div>

      <div className="h-3 w-full overflow-hidden rounded-full bg-accent-soft">
        <div
          className="h-3 rounded-full bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 text-sm text-muted">{progress}% completed</p>
    </div>
  );
}
