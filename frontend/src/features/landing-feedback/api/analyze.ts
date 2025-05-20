import { apiClient } from "../../../lib/api-client";

export const analyzeContent = async(url: string): Promise<string> => {
    try {
        const response = await apiClient.post("/feedback/analyze", {
           url, 
        });

        console.log("Response from analyzeContent:", response.data.feedback); // Log the response data

        return response.data.feedback;
    } catch (error) {
        console.error("Error analyzing url", error);
        throw new Error("Failed to analyze url");
    }
}