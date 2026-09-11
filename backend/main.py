from fastapi import FastAPI
from fastapi.exceptions import HTTPException
from schemas import FertilizerRequest
from weather_service import get_weather
from model_service import predict_fertilizer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Fertilizer Recommendation API")

@app.get("/")
def home():

    return {
        "message": "AI Fertilizer Recommendation API is running"
    }

# Predict fertilizer recommendation
@app.post("/predict")
def predict(request: FertilizerRequest):

    try:

        # Convert request to dictionary
        farmer_data = request.model_dump()

        # Get weather information
        weather_data = get_weather(
            request.latitude,
            request.longitude
        )

        # Add weather data
        farmer_data.update(weather_data)

        # Remove location before ML prediction
        farmer_data.pop("latitude")
        farmer_data.pop("longitude")

        # Make prediction
        result = predict_fertilizer(farmer_data)

        # Add weather information to response
        result["weather"] = weather_data

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

# Allow Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

