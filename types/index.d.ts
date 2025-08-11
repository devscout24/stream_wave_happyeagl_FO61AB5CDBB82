export interface UserProfile {
  first_name: string;
  last_name: string;
  profile_pic: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: number;
  content: string;
  author: string;
  ratings: number;
}

export interface Chat {
  id: string;
  body: string;
  sender: "user" | "bot";
  avatar: string;
  createdAt: string;
  name: string;
}

// Response from the API
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: string;
}

// Error response from the API
export interface ApiError {
  error: string;
  message: string;
}

// Login response structure
export interface LoginResponse {
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface EmailResetResponse {
  message: string;
}

export interface VerifyCodeResponse {
  otp: string;
}

export interface ChatFormValues {
  body: string;
  sender: "user" | "bot";
  avatar: string;
  name: string;
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};
