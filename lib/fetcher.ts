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
  // Ensure endpoint is provided
  if (!endpoint) {
    throw new Error("Endpoint is required for fetcher");
  }

  const accessToken = await getUserSession();

  // Ensure the endpoint doesn't start with a slash
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;

  // Build the full URL
  const url = `${config.apiUrl}/${cleanEndpoint}`;

  // Set default options
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    next: {
      revalidate: 60, // Cache for 60 seconds by default
    },
  };

  // Merge default options with provided options
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
      throw new ApiError(response.status, response.statusText, errorData);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error(`[fetcher] Failed to fetch: ${error}`);

    // Check for network errors
    if (error instanceof TypeError && error.message.includes("fetch failed")) {
      console.error(
        "[fetcher] Network error: API server may be down or unreachable",
      );
    }

    throw error;
  }
}

export default fetcher;
