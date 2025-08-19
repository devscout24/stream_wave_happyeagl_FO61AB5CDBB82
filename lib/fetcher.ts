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
      // Only set Content-Type for non-FormData requests
      ...(!(options?.body instanceof FormData) && {
        "Content-Type": "application/json",
      }),
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

  // Check if response has content
  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  const text = await response.text();

  if (!text) {
    return null as T;
  }

  // If not ok, throw a rich error so frontend can handle it
  if (!response.ok) {
    type ErrorResponse = {
      message?: string;
      detail?: string;
      error?: string;
      code?: string | number;
      [key: string]: unknown;
    };

    let errorData: unknown;
    if (isJson) {
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = text;
      }
    } else {
      errorData = text;
    }

    // Determine the best error message to surface
    let errorMessage = `Request failed with status ${response.status}`;
    if (errorData && typeof errorData === "object") {
      const err = errorData as ErrorResponse;
      if (err.message) errorMessage = String(err.message);
      else if (err.detail) errorMessage = String(err.detail);
      else if (err.error) errorMessage = String(err.error);
      else if (err.code) errorMessage = `Error code: ${String(err.code)}`;
    } else if (typeof errorData === "string" && errorData.length) {
      errorMessage = errorData;
    }

    class FetcherError extends Error {
      status: number;
      data: unknown;
      constructor(message: string, status: number, data: unknown) {
        super(message);
        this.status = status;
        this.data = data;
      }
    }
    throw new FetcherError(errorMessage, response.status, errorData);
  }

  // Only parse as JSON if content-type indicates JSON
  if (isJson) {
    try {
      return JSON.parse(text) as T;
    } catch {
      // If JSON parsing fails, return text as fallback
      return text as T;
    }
  }

  // For non-JSON responses, return the text or null
  return (text || null) as T;
}

export default fetcher;
