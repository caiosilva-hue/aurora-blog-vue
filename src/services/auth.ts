import { apiFetch } from "./api";

export async function login(email: string, password: string) {
  const data = await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", data.token);
  return data;
}

export async function logout() {
  await apiFetch("/logout", { method: "POST" });
  localStorage.removeItem("token");
}
