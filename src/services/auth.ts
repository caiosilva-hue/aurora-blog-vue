import { apiFetch } from "./api";

export async function login(email: string, password: string) {
  const data = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Backend retorna array com objeto contendo access_token
  const authData = Array.isArray(data) ? data[0] : data;

  if (!authData.access_token) {
    throw new Error("Login falhou: access_token não retornado");
  }

  if (!authData.user?.id) {
    throw new Error("Login falhou: user.id não retornado");
  }

  localStorage.setItem("token", authData.access_token);
  localStorage.setItem("user_id", authData.user.id);
  return authData;
}

export async function logout() {
  await apiFetch("/logout", { method: "POST" });
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
}
