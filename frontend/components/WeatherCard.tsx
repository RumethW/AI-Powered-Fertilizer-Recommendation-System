import { Weather } from "../types"; 
interface Props {
  weather: Weather;
}

export default function WeatherCard({ weather }: Props) {
  return (
    <div className="weather-card">
      <h2>🌦️ Current Weather Data</h2>

      <div className="weather-grid">
        <div className="weather-item">
          <span>🌡️</span>
          <p>Temperature</p>
          <strong>{weather.Temperature} °C</strong>
        </div>

        <div className="weather-item">
          <span>💧</span>
          <p>Humidity</p>
          <strong>{weather.Humidity}%</strong>
        </div>

        <div className="weather-item">
          <span>🌧️</span>
          <p>Rainfall</p>
          <strong>{weather.Rainfall} mm</strong>
        </div>
      </div>
    </div>
  );
}