export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  theme: string;
  language: string;
  createdAt: Date;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
