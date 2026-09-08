from fastapi import FastAPI

app = FastAPI(Title="AI Fertilizer Recommendation API")

@app.get("/")
def home():

    return {
        "message": "AI Fertilizer Recommendation API is running"
    }


