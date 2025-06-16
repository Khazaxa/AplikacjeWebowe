class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string) {
    this.token = token;
  }

  clearToken() {
    this.token = null;
  }

  private getHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(extraHeaders as Record<string, string>),
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`GET ${endpoint} failed with status ${res.status}`);
    }

    return res.json();
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`POST ${endpoint} failed with status ${res.status}`);
    }

    return res.json();
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`PUT ${endpoint} failed with status ${res.status}`);
    }

    return res.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`DELETE ${endpoint} failed with status ${res.status}`);
    }

    return res.json();
  }
}

export default ApiClient;
