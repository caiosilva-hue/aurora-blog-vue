import { apiFetch } from "./api";

export function getArticles(userId?: string) {
  const query = userId ? `?user_id=${userId}` : "";
  return apiFetch(`/article${query}`, { method: "GET" });
}

export function getArticle(id: string) {
  const userId = localStorage.getItem("user_id");

  const query = new URLSearchParams({
    id: id,
    user_id: userId || ""
  }).toString();

  return apiFetch(`/article?${query}`, {
    method: "GET",
  });
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

export function updateArticle(article: { id: string; title?: string; content?: string; image_url?: string }) {
  return apiFetch("/update-article", {
    method: "POST",
    body: JSON.stringify(article),
  });
}

export function deleteArticle(id: string) {
  return apiFetch("/delete-article", {
    method: "POST",
    body: JSON.stringify({ id }),
  });
}
