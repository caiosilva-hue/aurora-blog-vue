import { apiFetch } from "./api";

export async function login(email: string, password: string) {
  const authData = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Backend retorna array com objeto contendo access_token
  const data = Array.isArray(authData) ? authData[0] : authData;

  if (!data.access_token) {
    throw new Error("Login falhou: access_token não retornado");
  }

  if (!data.user?.id) {
    throw new Error("Login falhou: user.id não retornado");
  }

  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user_id", data.user.id);
  return data;
}

export async function signup(email: string, password: string) {
  const authData = await apiFetch("/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // Backend retorna array com objeto contendo access_token
  const data = Array.isArray(authData) ? authData[0] : authData;

  if (!data.access_token) {
    throw new Error("Cadastro falhou: access_token não retornado");
  }

  if (!data.user?.id) {
    throw new Error("Cadastro falhou: user.id não retornado");
  }

  localStorage.setItem("token", data.access_token);
  localStorage.setItem("user_id", data.user.id);
  return data;
}

export async function logout() {
  await apiFetch("/logout", { method: "POST" });
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
}
