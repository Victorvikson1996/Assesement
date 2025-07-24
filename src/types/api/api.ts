export interface LoginRequest {
  authenticationMethod: 'EMAIL';
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  zodiacSign: string;
  cashBalance: number;
}

export interface Psychic {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  isUserFavorite: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
