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

  // O backend retorna um array com um único objeto
  const response = Array.isArray(data) ? data[0] : data;
  return response as PracticeResponse;
}
