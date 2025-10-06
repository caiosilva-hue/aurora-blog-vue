import { apiFetch } from "./api";

export function getArticles(userId?: string) {
  const body: { user_id?: string } = {};
  if (userId) {
    body.user_id = userId;
  }
  
  return apiFetch("/get-articles", { 
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function getArticle(id: string) {
  const userId = localStorage.getItem("user_id");
  
  const body: { id: string; user_id?: string } = { id };
  if (userId) {
    body.user_id = userId;
  }

  return apiFetch("/get-articles", {
    method: "POST",
    body: JSON.stringify(body),
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

  return apiFetch("/post-article", {
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
