const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
}

/**
 * Wrapper simples sobre fetch: serializa JSON, trata FormData
 * e transforma respostas de erro em exceções legíveis.
 */
export async function request<T = unknown>(path: string, { method = 'GET', body }: RequestOptions = {}): Promise<T> {
  const isForm = body instanceof FormData;
  const options: RequestInit = { method };

  if (body !== undefined) {
    options.body = isForm ? body : JSON.stringify(body);
    if (!isForm) options.headers = { 'Content-Type': 'application/json' };
  }

  let res: Response;
  try {
    res = await fetch(BASE_URL + path, options);
  } catch {
    throw new Error('Não foi possível conectar ao servidor. O backend está rodando?');
  }

  const text = await res.text();

  if (!res.ok) {
    let message = text;
    try {
      const json = JSON.parse(text) as { message?: string; error?: string };
      message = json.message || json.error || text;
    } catch {
      /* resposta não é JSON */
    }
    throw new Error(`Erro ${res.status}${message ? `: ${message}` : ''}`);
  }

  if (!text) return null as T;
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as T;
  }
}
