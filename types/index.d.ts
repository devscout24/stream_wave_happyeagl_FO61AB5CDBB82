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

export interface ChatHistory {
  id: number;
  title: string;
  created_at: string;
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
  tokens: {
    access: string;
    refresh: string;
  };
}

export interface FileProcessing {
  file_type: string;
  file_name: string;
  processing_method: string;
  status: string;
}
export interface IMessage {
  id?: number;
  chat_id: number | null;
  chat_title: string;
  agent_type: "legal_assistant" | "user";
  ai_response: string;
  is_new_chat: boolean;
  word_count: number;
  requires_authentication: boolean;
  file_processing?: FileProcessing;
}
export interface IMessages {
  messages: Message[];
  total_count: number;
  chat_id: number;
}

export interface ChatFormValues {
  content: string;
  chat_id?: number;
  location: string;
}

export interface PasswordResetResponse {
  message: string;
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

// ===== Context Types
export interface ContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

export interface State {
  chats: ChatResponse[];
  messages: Message[];
}

export interface ChatHistoryResponse {
  chats: ChatTitle[];
  total_count: number;
}

export interface ArchivedResponse {
  archived_chats: ChatTitle[];
  total_archived: number;
}

export interface UpdateProfileResponse {
  message: string;
}

export interface FormValues {
  first_name: string;
  last_name: string;
}

export interface UpdatePass {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChatMeta {
  id: number;
  chat: number;
  sender_type: string;
  message_type: string;
  content: string;
  file: number | null;
  file_url: string | null;
  file_name: string | null;
  created_at: string;
}

export interface ChatHistorySearch {
  total_messages: number;
  chat_groups: ChatMessage[];
}

export interface SaveChatHistoryResponse {
  save_chat_history: boolean;
}
