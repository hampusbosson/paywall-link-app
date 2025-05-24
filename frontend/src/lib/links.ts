import { apiClient } from "./api-client";

const api = apiClient;

export async function createLink(title: string, targetUrl: string, price: number, swishNumber: string) {
  try {
    const response = await api.post("/link/create", {
      title,
      targetUrl,
      price,
      swishNumber,
    });

    return response.data; 
  } catch (error) {
    console.error("Failed to create link:", error);
    throw error; // re-throw so caller can also handle it if needed
  }
}