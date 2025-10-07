const API_BASE = "https://primary-production-e91c.up.railway.app/webhook";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Prefer": "return=representation",
    "apikey":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpbndmbmVhb2N5am9zemxpeHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3Mzk0ODYsImV4cCI6MjA3NDMxNTQ4Nn0.m75wbKpY_PWggGRpiQyPI_4q151mYDCFPNxeTRNin3c",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  // Tenta converter a resposta em JSON, se existir conteúdo
  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  // Caso o backend retorne erro (status >= 400)
  if (!res.ok) {
    const message = data?.error || `Erro HTTP ${res.status}`;
    throw new Error(message);
  }

  // Retorna o corpo da resposta (objeto, array ou vazio)
  return data;
}
