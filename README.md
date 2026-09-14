# 🌱 AI-Powered Fertilizer Recommendation System

This system analyzes soil properties, nutrient levels, crop information, and real-time weather conditions to recommend the most suitable fertilizer.

The system uses machine learning for fertilizer classification and SHAP (SHapley Additive exPlanations) to explain the main factors influencing each recommendation.

---

## 🚀 Project Overview

The system is designed to help farmers make data-driven fertilizer decisions.

Users provide:

- Farm location
- Soil characteristics
- Nitrogen, Phosphorus, and Potassium levels
- Crop type
- Crop growth stage
- Irrigation type
- Optional - Previous farming information (if available)


The selected location is used to retrieve real-time weather information through a Weather API.

The backend then processes the information using the trained machine learning model and returns:

- Recommended fertilizer
- Prediction confidence score
- Confidence level
- Top 3 factors influencing the prediction
- Top 3 fertilizer alternatives
- Current weather information

---
## 🛠️ Development Workflow

<img width="1440" height="870" alt="Blank diagram (3)" src="https://github.com/user-attachments/assets/cf9ef5c1-a8f7-4fc9-9be2-b8dfffed7fdf" />


---
## ⚙️ Technologies Used

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)

### Backend

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Uvicorn](https://img.shields.io/badge/Uvicorn-499848?style=flat-square&logo=uvicorn&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)

### Machine Learning

![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![Random Forest](https://img.shields.io/badge/Random%20Forest-228B22?style=flat-square)
![Decision Tree](https://img.shields.io/badge/Decision%20Tree-228B22?style=flat-square) 
![Logistic Regression](https://img.shields.io/badge/Logistic%20Regression-4285F4?style=flat-square)
![XGBoost](https://img.shields.io/badge/XGBoost-189FDD?style=flat-square&logo=xgboost&logoColor=white)
![CatBoost](https://img.shields.io/badge/CatBoost-FFCC00?style=flat-square&logo=catboost&logoColor=black)

### Explainable AI

![SHAP](https://img.shields.io/badge/SHAP-Explainable%20AI-8A2BE2?style=flat-square)

### External Services

![Open-Meteo](https://img.shields.io/badge/Open--Meteo-Weather%20API-4CAF50?style=flat-square)

---
## 🌐 Access the Application

The application is deployed on Vercel:
```
https://ai-powered-fertilizer-recommendatio.vercel.app/
```

---

## 💻 To Run Locally

## Backend Setup

### 1. Clone the Repository  
```bash
git clone <https://github.com/RumethW/AI-Powered-Fertilizer-Recommendation-System>
```

### 2. Navigate to the Backend  
```bash
cd backend
```

### 3. Create a Virtual Environment  
```bash
python -m venv venv
```

### 4. Activate the Virtual Environment  
```bash
venv\Scripts\activate
```

### 5. Install Dependencies  
```bash
pip install -r requirements.txt
```

---
## ▶️ Running the Backend

### 6. Start the FastAPI Server  
```bash
uvicorn main:app --reload
```

The API will be available at:
```bash
http://127.0.0.1:8000
```

FastAPI interactive documentation:
```bash 
http://127.0.0.1:8000/docs
```

---

## Frontend Setup

### 1. Navigate to the Frontend

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env.local` file in the `frontend` directory:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## ▶️ Running the Frontend

Start the Next.js development server:

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

Open the URL in your browser to access the application.
