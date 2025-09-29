import { apiFetch } from "./api";

export function getArticles() {
  return apiFetch("/article", { method: "GET" });
}

export function getArticle(id: string) {
  return apiFetch(`/article/${id}`, { method: "GET" });
}

export function createArticle(article: { title: string; content: string }) {
  return apiFetch("/article", {
    method: "POST",
    body: JSON.stringify(article),
  });
}

export function updateArticle(id: string, article: any) {
  return apiFetch(`/article/${id}`, {
    method: "PATCH",
    body: JSON.stringify(article),
  });
}

export function deleteArticle(id: string) {
  return apiFetch(`/article/${id}`, { method: "DELETE" });
}
