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
    let errorData: unknown;
    try {
      errorData = JSON.parse(text);
    } catch {
      errorData = text;
    }
    // Always throw an Error with the message if available
    if (errorData && typeof errorData === "object" && "message" in errorData) {
      throw new Error(String((errorData as { message?: unknown }).message));
    }
    throw new Error(
      typeof errorData === "string" ? errorData : "Unknown error",
    );
  }
  return JSON.parse(text) as T;
}

export default fetcher;
