"use client";

import { useState } from "react";
import HeroCarousel from "../components/CarousalSlides";
import FertilizerForm from "../components/FertilizerForm";
import RecommendationCard from "../components/RecommendationCard";
import WeatherCard from "../components/WeatherCard";

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

            <RecommendationCard result={result} />
            
            {/* Top 3 including alternatives */}
            {result.alternatives &&
              result.alternatives.length > 0 && (
                <div className="alternatives-card">

                  <h2>
                    📊 Top 3 Fertilizer Recommendations
                  </h2>

                  <p className="section-description">
                    These are the top 3 fertilizer recommedations generated
                    by our model.
                  </p>

                  <div className="alternatives-list">
                    {result.alternatives.map(
                      (item: any, index: number) => (
                        <div
                          key={index}
                          className="alternative-item"
                        >
                          <div className="alternative-rank">
                            #{index + 1}
                          </div>

                          <div className="alternative-info">
                            <h3>{item.fertilizer}</h3>

                            <div className="probability-bar">
                              <div
                                className="probability-fill"
                                style={{
                                  width: `${item.probability}%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="probability-value">
                            {item.probability}%
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {result.weather && (
              <WeatherCard weather={result.weather} />
            )}

            {/* Explainable AI */}
            {result.top_factors &&
              result.top_factors.length > 0 && (
                <div className="ai-factors-card">

                  <div className="section-title">
                    <div>
                      <p className="section-label">
                        EXPLAINABLE AI
                      </p>

                      <h2>
                        🔍 Why did the AI make this recommendation?
                      </h2>
                    </div>
                  </div>

                  <p className="section-description">
                    These are the three most important factors that
                    influenced the AI model's fertilizer recommendation.
                  </p>

                  <div className="factors-grid">
                    {result.top_factors.map(
                      (factor: any, index: number) => (
                        <div
                          key={index}
                          className="factor-card"
                        >
                          <div className="factor-number">
                            {index + 1}
                          </div>

                          <div className="factor-content">
                            <h3>{factor.feature}</h3>
                            <p>AI Impact Score</p>
                          </div>

                          <div className="factor-impact">
                            {factor.impact}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
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
