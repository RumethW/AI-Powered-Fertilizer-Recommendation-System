from pydantic import BaseModel
from typing import Optional

class FertilizerRequest(BaseModel):

    # Location Information
    latitude: float
    longitude: float

    # Soil Information
    Soil_Type: str
    Soil_pH: float
    Soil_Moisture: float
    Organic_Carbon: float
    Electrical_Conductivity: float

    # Nutrient Information
    Nitrogen_Level: float
    Phosphorus_Level: float
    Potassium_Level: float

    # Crop Information
    Crop_Type: str
    Crop_Growth_Stage: str
    Irrigation_Type: str

    # Previous Farming Information (Optional)
    Previous_Crop: Optional[str] = None
    Fertilizer_Used_Last_Season: Optional[float] = None
    Yield_Last_Season: Optional[float] = None