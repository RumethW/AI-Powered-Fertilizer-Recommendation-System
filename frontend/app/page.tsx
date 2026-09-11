"use client";

import { useState } from "react";
import HeroCarousel from "../components/CarousalSlides";
import FertilizerForm from "../components/FertilizerForm";
import RecommendationCard from "../components/RecommendationCard";
import WeatherCard from "../components/WeatherCard";
import AlternativePredictions from "../components/AlternativePredictions";
import PredictionFactors from "../components/PredictionResult";

export default function Home() {
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  return (
    <main className="min-h-screen">

      {/* Carousel Slides */}
      <HeroCarousel />

      {/* Main Content */}
      <section className="container">
        <FertilizerForm
          setResult={setResult}
          setLoading={setLoading}
        />

      {/* Loading */}
        {loading && (
          <div className="loading-card">
            <div className="loading-icon">🤖</div>
            <div>
              <h3>AI is analyzing your farm...</h3>
              <p>
                Processing soil, crop, nutrient and weather conditions.
              </p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <section className="results-section">

            <div className="results-header">
              <p className="badge">✨ AI ANALYSIS COMPLETE</p>

              <h2>Your Fertilizer Recommendation</h2>

              <p>
                Based on your farm conditions and real-time weather data.
              </p>
            </div>

            {/* Main Recommendation */}
            <RecommendationCard result={result} />

            {/* Alternative (Top 3) Recommendations */}
            {result.alternatives &&
              result.alternatives.length > 0 && (
                <AlternativePredictions
                  alternatives={result.alternatives}
                />
            )}

            {/* Weather Factors */}
            {result.weather && (
              <WeatherCard weather={result.weather} />
            )}

            {/* Prediction Factors */}
            {result.top_factors &&
              result.top_factors.length > 0 && (
                <PredictionFactors
                  factors={result.top_factors}
                />
              )}

          </section>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>🌱 AI-Powered Fertilizer Recommendation System</p>

        <p className="footer-text">
          Machine Learning • Weather Data • Explainable AI
        </p>
      </footer>
    </main>
  );
}
