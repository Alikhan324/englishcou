"use client";

import { useEffect, useState } from "react";

type Props = {
  courseId: number;
  lessonId: number;
};

export default function LessonCompleteButton({ courseId, lessonId }: Props) {
  const [isCompleted, setIsCompleted] = useState(false);

  const storageKey = `completed-lessons-course-${courseId}`;

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const completedLessons = JSON.parse(saved);
      setIsCompleted(completedLessons.includes(lessonId));
    }
  }, [lessonId, storageKey]);

  function toggleComplete() {
    const saved = localStorage.getItem(storageKey);
    const completedLessons: number[] = saved ? JSON.parse(saved) : [];

    let updatedLessons;

    if (completedLessons.includes(lessonId)) {
      updatedLessons = completedLessons.filter((id) => id !== lessonId);
      setIsCompleted(false);
    } else {
      updatedLessons = [...completedLessons, lessonId];
      setIsCompleted(true);
    }

    localStorage.setItem(storageKey, JSON.stringify(updatedLessons));
  }

  return (
    <button
      type="button"
      onClick={toggleComplete}
      className={
        isCompleted
          ? "w-full rounded-xl bg-deep py-3 font-semibold text-on-deep transition-all duration-300 ease-out hover:bg-deep-hover"
          : "btn-primary w-full py-3"
      }
    >
      {isCompleted ? "Completed" : "Mark as completed"}
    </button>
  );
}
