export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: 'user' | 'admin';
  accessToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  tel: string;          
  password: string;
  adminSecretKey?: string;
}
