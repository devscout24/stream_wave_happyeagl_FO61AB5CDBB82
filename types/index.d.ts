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

export interface ChatMessage {
  id: number;
  content: string;
  sender: "user" | "bot";
  avatar: string;
  timestamp: string;
}
