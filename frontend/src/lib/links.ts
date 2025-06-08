import { apiClient } from "./api-client";
import { Link } from "../types/link";

const api = apiClient;

export async function createLink(
  title: string,
  targetUrl: string,
  price: number,
  swishNumber: string
) {
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
    throw error;
  }
}

export async function fetchLinksForUser(): Promise<Link[]> {
  try {
    const response = await api.get("/link/fetch");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch links:", error);
    throw error;
  }
}

export async function getLinkById(id: string | undefined): Promise<Link> {
  try {
    const response = await api.get(`/link/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch link by ID:", error);
    throw error;
  }
}