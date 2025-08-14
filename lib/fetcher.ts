"use server";

import config from "@/config";
import { getUserSession } from "./actions";

/**
 * Fetcher function for making API requests with minimal error handling.
 * Returns raw response or throws raw error.
 * @param endpoint - API endpoint (without the base URL)
 * @param options - Fetch options
 * @returns Promise with the response data
 */
export async function fetcher<T = unknown>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  if (!endpoint) {
    throw new Error("Endpoint is required for fetcher");
  }

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  const url = `${config.apiUrl}/${cleanEndpoint}`;

  // Don't add auth header for auth endpoints
  const isAuthEndpoint = ["login/", "signup/", "register/", "logout/"].includes(
    cleanEndpoint,
  );
  const accessToken = !isAuthEndpoint ? await getUserSession() : null;

  console.log(accessToken && { Authorization: `Bearer ${accessToken}` })

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    next: {
      revalidate: 60,
    },
  };

  const fetchOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options?.headers,
    },
  };

  const response = await fetch(url, fetchOptions);

  const text = await response.text();

  if (!text) {
    return null as T;
  }
  // If not ok, just throw the response as is
  if (!response.ok) {
    type ErrorResponse = {
      message?: string;
      detail?: string;
      error?: string;
      code?: string | number;
      [key: string]: unknown;
    };

    let errorData: unknown;
    try {
      errorData = JSON.parse(text);
    } catch {
      errorData = text;
    }
    // Prefer message, then detail, then error, then code, then fallback
    if (errorData && typeof errorData === "object") {
      const err = errorData as ErrorResponse;
      if ("message" in err && err.message) {
        // Optionally log the error
        console.warn("API error:", err.message);
        return null as T;
      }
      if ("detail" in err && err.detail) {
        console.warn("API error:", err.detail);
        return null as T;
      }
      if ("error" in err && err.error) {
        console.warn("API error:", err.error);
        return null as T;
      }
      if ("code" in err && err.code) {
        console.warn("API error:", err.code);
        return null as T;
      }
    }
    console.warn("API error:", errorData);
    return null as T;
  }

  return JSON.parse(text) as T;
}

export default fetcher;
