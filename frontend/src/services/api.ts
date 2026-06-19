const BASE_URL = 'http://localhost:5000';

interface RequestOptions extends RequestInit {
  params?: URLSearchParams;
}

export const api = {
  request: async <T>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
    const { params, headers, ...restOptions } = options;
    
    let url = `${BASE_URL}${endpoint}`;
    if (params) {
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const config: RequestInit = {
      ...restOptions,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorMsg = await response.text().catch(() => 'An error occurred');
      throw new Error(errorMsg || `HTTP error! status: ${response.status}`);
    }

    // Handles empty responses (e.g. for DELETE requests)
    if (response.status === 204 || config.method === 'DELETE') {
      return {} as T;
    }

    return response.json();
  },

  get: <T>(endpoint: string, params?: URLSearchParams, options?: RequestInit) =>
    api.request<T>(endpoint, { method: 'GET', params, ...options }),

  post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    api.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body), ...options }),

  patch: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    api.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body), ...options }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    api.request<T>(endpoint, { method: 'DELETE', ...options }),
};
