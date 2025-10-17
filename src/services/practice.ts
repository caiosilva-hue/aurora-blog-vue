import { apiFetch } from "./api";

export interface QuizQuestion {
  question: string;
  options: string[];
  correct_option: string;
}

export interface PracticeResponse {
  output: {
    questions: QuizQuestion[];
  };
}

export async function generatePractice(title: string, content: string) {
  const data = await apiFetch("/practice", {
    method: "POST",
    body: JSON.stringify({ title, content }),
  });

  return data[0] as PracticeResponse;
}
