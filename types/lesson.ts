import { TraceEvent } from "./trace";

export type LessonStep = {
  title: string;
  explanation: string;
  trace: TraceEvent[];
};

export type Lesson = {
  id: string;
  title: string;
  category: string; // e.g., "linked-list"
  algorithm: string; // e.g., "linear-search"
  steps: LessonStep[];
};
