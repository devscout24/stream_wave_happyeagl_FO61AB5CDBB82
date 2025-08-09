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
