import { apiFetch } from "./api";

export function getArticles() {
  return apiFetch("/article", { method: "GET" });
}

export function getArticle(id: string) {
  return apiFetch(`/article/${id}`, { method: "GET" });
}

export function createArticle(article: { title: string; content: string; image_url?: string; user_id?: string }) {
  const userId = localStorage.getItem("user_id");
  
  const payload = {
    title: article.title,
    content: article.content,
    image_url: article.image_url || "",
    user_id: article.user_id || userId || "",
  };

  return apiFetch("/article", {
    method: "POST",
    body: JSON.stringify(payload),
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
