"use client";

import { useState } from "react";
import HeroCarousel from "../components/CarousalSlides";
import FertilizerForm from "../components/FertilizerForm";

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
