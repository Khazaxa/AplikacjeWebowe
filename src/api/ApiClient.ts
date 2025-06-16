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

  private getStorageKey(endpoint: string) {
    return `${this.baseUrl}_${endpoint}`;
  }

  async get<T>(endpoint: string): Promise<T> {
    const key = this.getStorageKey(endpoint);
    const data = localStorage.getItem(key);
    if (!data) {
      return [] as unknown as T;
    }
    return JSON.parse(data) as T;
  }

  async getById<T>(endpoint: string, id: string): Promise<T | undefined> {
    const items = await this.get<T[]>(endpoint);
    return items.find((item: any) => item.id === id);
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    const key = this.getStorageKey(endpoint);
    const data = localStorage.getItem(key);
    const items = data ? JSON.parse(data) : [];
    items.push(body);
    localStorage.setItem(key, JSON.stringify(items));
    return body as T;
  }

  async put<T>(endpoint: string, id: string, body: any): Promise<T> {
    const key = this.getStorageKey(endpoint);
    const data = localStorage.getItem(key);
    let items = data ? JSON.parse(data) : [];
    items = items.map((item: any) => (item.id === id ? body : item));
    localStorage.setItem(key, JSON.stringify(items));
    return body as T;
  }

  async delete<T>(endpoint: string, id: string): Promise<void> {
    const key = this.getStorageKey(endpoint);
    const data = localStorage.getItem(key);
    const items = data ? JSON.parse(data) : [];
    const filtered = items.filter((item: any) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(filtered));
  }
}

export default ApiClient;
