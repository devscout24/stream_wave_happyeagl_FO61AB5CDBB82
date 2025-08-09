"use server";

import config from "@/config";
import { getUserSession } from "./actions";

/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  status: number;
  statusText: string;
  data: unknown;

  constructor(status: number, statusText: string, data: unknown) {
    super(`API Error: ${status} ${statusText}`);
    this.status = status;
    this.statusText = statusText;
    this.data = data;
    this.name = "ApiError";
  }
}

/**
 * Fetcher function for making API requests with error handling
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

  try {
    console.log(`Fetching data from API: ${url}`);
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      let errorData: unknown;
      const text = await response.text();
      try {
        errorData = JSON.parse(text);
      } catch {
        errorData = text;
      }

      // Log the server response for debugging
      console.error(
        `API Error: ${response.status} ${response.statusText}`,
        errorData,
      );

      // Extract the server's message and throw it
      if (
        errorData &&
        typeof errorData === "object" &&
        "message" in errorData
      ) {
        throw new Error(errorData.message as string);
      }

      // Fallback to status-based messages
      if (response.status === 401) {
        throw new Error(
          "Invalid credentials. Please check your email and password.",
        );
      } else if (response.status === 400) {
        throw new Error("Invalid request. Please check your input.");
      } else if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }

      throw new ApiError(response.status, response.statusText, errorData);
    }

    const text = await response.text();
    if (!text) {
      return null as T;
    }
    return JSON.parse(text) as T;
  } catch (error) {
    // Re-throw errors from the if (!response.ok) block
    if (
      error instanceof Error &&
      error.message !== `[fetcher] Failed to fetch: ${error}`
    ) {
      throw error;
    }

    console.error(`[fetcher] Failed to fetch: ${error}`);

    if (error instanceof TypeError && error.message.includes("fetch failed")) {
      console.error(
        "[fetcher] Network error: API server may be down or unreachable",
      );
      throw new Error(
        "Network error. Please check your connection and try again.",
      );
    }

    throw error;
  }
}

export default fetcher;
