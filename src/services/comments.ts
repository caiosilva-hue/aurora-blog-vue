import { apiFetch } from "./api";

export function getComments(articleId: string) {
  return apiFetch("/get-comment", {
    method: "POST",
    body: JSON.stringify({ article_id: articleId }),
  });
}

export function createComment(content: string, articleId: string) {
  const userId = localStorage.getItem("user_id");
  
  return apiFetch("/post-comment", {
    method: "POST",
    body: JSON.stringify({
      content,
      user_id: userId,
      article_id: articleId,
    }),
  });
}

export function updateComment(commentId: string, content: string) {
  return apiFetch(`/update-comment?id=${commentId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function deleteComment(commentId: string) {
  return apiFetch(`/delete-comment?id=${commentId}`, {
    method: "POST",
  });
}
