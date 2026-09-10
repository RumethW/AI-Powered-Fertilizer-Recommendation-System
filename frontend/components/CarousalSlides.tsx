"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/farm-1.jpeg",
    eyebrow: "AI-POWERED AGRICULTURE",
    title: "Smart Fertilizer",
    highlight: "Recommendations",
    description:
      "Make smarter farming decisions with AI-powered fertilizer recommendations based on your soil, crops, nutrients, and weather conditions.",
  },
  {
    image: "/images/farm-2.jpg",
    eyebrow: "SMART FARMING",
    title: "Better Decisions.",
    highlight: "Better Crops.",
    description:
      "Use data-driven insights to understand your farm conditions and choose the fertilizer that best matches your crop needs.",
  },
  {
    image: "/images/farm-3.jpg",
    eyebrow: "PRECISION AGRICULTURE",
    title: "Powered by",
    highlight: "Artificial Intelligence",
    description:
      "Combine soil information, crop characteristics and real-time weather data to receive an intelligent fertilizer recommendation.",
  },
  {
    image: "/images/farm-6.jpg",
    eyebrow: "SUSTAINABLE FARMING",
    title: "Grow Smarter.",
    highlight: "Farm Better.",
    description:
      "Turn agricultural data into useful recommendations that support efficient and sustainable farm management.",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === slides.length - 1 ? 0 : previous + 1
      );
    }, 5500);

    return () => clearInterval(interval);}, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === slides.length - 1 ? 0 : previous + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0 ? slides.length - 1 : previous - 1
    );
  };

  const slide = slides[currentSlide];

  return (
    <section
      className="hero-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background images */}
      {slides.map((item, index) => (
        <div
          key={item.image}
          className={`hero-slide ${
            index === currentSlide ? "hero-slide-active" : ""
          }`}
          style={{
            backgroundImage: `url("${item.image}")`,
          }}
        />
      ))}

      {/* Dark green overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          {slide.eyebrow}
        </div>

        <h1>
          {slide.title}
          <span>{slide.highlight}</span>
        </h1>

        <p className="hero-description">{slide.description}</p>

        <div className="hero-features">
          <div>
            <span>🌱</span>
            <p>Soil Analysis</p>
          </div>

          <div>
            <span>🤖</span>
            <p>AI Prediction</p>
          </div>

          <div>
            <span>🌦️</span>
            <p>Weather Data</p>
          </div>
        </div>
      </div>

      {/* Previous button */}
      <button
        type="button"
        className="carousel-arrow carousel-arrow-left"
        onClick={previousSlide}
        aria-label="Previous slide"
      >
        ‹
      </button>

      {/* Next button */}
      <button
        type="button"
        className="carousel-arrow carousel-arrow-right"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Bottom controls */}
      <div className="carousel-controls">
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              type="button"
              key={index}
              className={`carousel-dot ${
                index === currentSlide ? "carousel-dot-active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}