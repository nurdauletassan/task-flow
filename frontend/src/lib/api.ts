const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export interface ApiTask {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  created_at: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
  completed: boolean;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.detail || 'API request failed',
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Network error', 0);
  }
}

export const authApi = {
  signUp: (data: SignUpRequest): Promise<ApiUser> =>
    apiRequest<ApiUser>('/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  signIn: (data: SignInRequest): Promise<AuthResponse> => {
    const formData = new URLSearchParams();
    formData.append('username', data.username);
    formData.append('password', data.password);

    return apiRequest<AuthResponse>('/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
  },

  getMe: (): Promise<ApiUser> =>
    apiRequest<ApiUser>('/auth/me'),
};

export const tasksApi = {
  getTasks: (): Promise<ApiTask[]> =>
    apiRequest<ApiTask[]>('/tasks/'),

  createTask: (data: CreateTaskRequest): Promise<ApiTask> =>
    apiRequest<ApiTask>('/tasks/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateTask: (id: number, data: UpdateTaskRequest): Promise<ApiTask> =>
    apiRequest<ApiTask>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteTask: (id: number): Promise<void> =>
    apiRequest<void>(`/tasks/${id}`, {
      method: 'DELETE',
    }),
}; 