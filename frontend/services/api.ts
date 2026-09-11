import {
  FertilizerRequest,
  PredictionResult,
} from "@/types";

// API URL for the backend server
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Function to send a fertilizer prediction request to the backend
export async function predictFertilizer(
  data: FertilizerRequest
): Promise<PredictionResult> {

  const response = await fetch(
    `${API_URL}/predict`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  // Check if the response is not OK 
  if (!response.ok) {
    const error = await response.json();

    throw new Error(
      error.detail ||
      "Failed to get fertilizer recommendation"
    );
  }

  return response.json();
}

