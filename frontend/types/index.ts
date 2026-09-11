export interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
}

export interface Weather {
  Temperature: number;
  Humidity: number;
  Rainfall: number;
}

export interface TopFactor {
  feature: string;
  impact: number;
}

export interface Alternative {
  fertilizer: string;
  probability: number;
}

export interface PredictionResult {
  recommended_fertilizer: string;
  confidence: number;
  confidence_level: string;
  top_factors: TopFactor[];
  alternatives: Alternative[];
  weather: Weather;
}

export interface FertilizerRequest {
  latitude: number;
  longitude: number;

  Soil_Type: string;
  Soil_pH: number;
  Soil_Moisture: number;
  Organic_Carbon: number;
  Electrical_Conductivity: number;

  Nitrogen_Level: number;
  Phosphorus_Level: number;
  Potassium_Level: number;

  Crop_Type: string;
  Crop_Growth_Stage: string;
  Irrigation_Type: string;

  Previous_Crop?: string | null;
  Fertilizer_Used_Last_Season?: number | null;
  Yield_Last_Season?: number | null;
}