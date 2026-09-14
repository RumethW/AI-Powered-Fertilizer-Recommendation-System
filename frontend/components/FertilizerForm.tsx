"use client";

import { useState } from "react";
import LocationSelector from "./LocationSelector";
import type { LocationData } from "../types/index";
import { predictFertilizer } from "../services/api";

interface FertilizerFormProps {
  setResult: (result: any) => void;
  setLoading: (loading: boolean) => void;
}

export default function FertilizerForm({
  setResult,
  setLoading,
}: FertilizerFormProps) {
  const [location, setLocation] = useState<LocationData | null>(null);

  const [formData, setFormData] = useState({
    Soil_Type: "",
    Soil_pH: "",
    Soil_Moisture: "",
    Organic_Carbon: "",
    Electrical_Conductivity: "",

    Nitrogen_Level: "",
    Phosphorus_Level: "",
    Potassium_Level: "",

    Crop_Type: "",
    Crop_Growth_Stage: "",
    Irrigation_Type: "",

    Previous_Crop: "",
    Fertilizer_Used_Last_Season: "",
    Yield_Last_Season: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Clear previous error and result
    setError("");
    setResult(null);

    // Validate location
    if (!location) {
      setError(
        "Please select your farm location before getting a recommendation."
      );
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        latitude: location.latitude,
        longitude: location.longitude,

        Soil_Type: formData.Soil_Type,

        Soil_pH: Number(formData.Soil_pH),

        Soil_Moisture: Number(formData.Soil_Moisture),

        Organic_Carbon: Number(formData.Organic_Carbon),

        Electrical_Conductivity: Number(formData.Electrical_Conductivity),

        Nitrogen_Level: Number(formData.Nitrogen_Level),

        Phosphorus_Level: Number(formData.Phosphorus_Level),

        Potassium_Level: Number(formData.Potassium_Level),

        Crop_Type: formData.Crop_Type,

        Crop_Growth_Stage: formData.Crop_Growth_Stage,

        Irrigation_Type: formData.Irrigation_Type,

        // Optional fields
        Previous_Crop:
          formData.Previous_Crop.trim() === ""
            ? null
            : formData.Previous_Crop,

        Fertilizer_Used_Last_Season:
          formData.Fertilizer_Used_Last_Season === ""
            ? null
            : Number(
                formData.Fertilizer_Used_Last_Season
              ),

        Yield_Last_Season:
          formData.Yield_Last_Season === ""
            ? null
            : Number(
                formData.Yield_Last_Season
              ),
      };

      // Send request to backend
      const result = await predictFertilizer(requestData);

      setResult(result);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <section className="fertilizer-form-section">
      <div className="form-header">
        <p className="form-badge">
          🌱 FARM ANALYSIS
        </p>

        <h2>
          Enter Your Farm Information
        </h2>

        <p>
          Provide your farm and soil details to receive
          an AI-powered fertilizer recommendation.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="fertilizer-form"
      >

        {/* Location */}
        <div className="form-card">

          <div className="card-heading">

            <div className="card-icon">
              📍
            </div>
            <div>
              <h3>Farm Location</h3>

              <p>
                Select your farm location to retrieve
                weather information automatically.
              </p>
            </div>
          </div>

          <LocationSelector
            onLocationChange={setLocation}
          />

        </div>


        {/* Soil Information */}
        <div className="form-card">
          <div className="card-heading">
            <div className="card-icon">
              🟫
            </div>
            <div>
              <h3>Soil Information</h3>

              <p>
                Enter the current characteristics of
                your soil.
              </p>
            </div>
          </div>

          <div className="form-grid">

            <SelectField
              label="Soil Type"
              name="Soil_Type"
              value={formData.Soil_Type}
              onChange={handleChange}
              options={[
                "Clay",
                "Sandy",
                "Loamy",
                "Silty",
              ]}
            />

            <InputField
              label="Soil pH"
              name="Soil_pH"
              value={formData.Soil_pH}
              onChange={handleChange}
              placeholder="Example: 6.5"
            />

            <InputField
              label="Soil Moisture (%)"
              name="Soil_Moisture"
              value={formData.Soil_Moisture}
              onChange={handleChange}
              placeholder="Example: 35"
            />

            <InputField
              label="Organic Carbon"
              name="Organic_Carbon"
              value={formData.Organic_Carbon}
              onChange={handleChange}
              placeholder="Example: 0.5"
            />

            <InputField
              label="Electrical Conductivity"
              name="Electrical_Conductivity"
              value={formData.Electrical_Conductivity}
              onChange={handleChange}
              placeholder="Example: 1.2"
            />
          </div>
        </div>


        {/* Nutrient Levels */}
        <div className="form-card">
          <div className="card-heading">
            <div className="card-icon">
              🧪
            </div>
            <div>
              <h3>Soil Nutrient Levels</h3>

              <p>
                Enter the measured nutrient levels
                in your soil.
              </p>
            </div>
          </div>

          <div className="form-grid three-columns">

            <InputField
              label="Nitrogen Level (N)"
              name="Nitrogen_Level"
              value={formData.Nitrogen_Level}
              onChange={handleChange}
              placeholder="Example: 60"
            />

            <InputField
              label="Phosphorus Level (P)"
              name="Phosphorus_Level"
              value={formData.Phosphorus_Level}
              onChange={handleChange}
              placeholder="Example: 45"
            />

            <InputField
              label="Potassium Level (K)"
              name="Potassium_Level"
              value={formData.Potassium_Level}
              onChange={handleChange}
              placeholder="Example: 80"
            />
          </div>
        </div>


        {/* Crop Information */}
        <div className="form-card">
          <div className="card-heading">
            <div className="card-icon">
              🌾
            </div>
            <div>
              <h3>Crop Information</h3>
              <p>
                Tell the AI about your current crop
                and its growth stage.
              </p>
            </div>
          </div>

          <div className="form-grid three-columns">

            <SelectField
              label="Crop Type"
              name="Crop_Type"
              value={formData.Crop_Type}
              onChange={handleChange}
              options={[
                "Cotton",
                "Rice",
                "Wheat",
                "Maize",
              ]}
            />

            <SelectField
              label="Crop Growth Stage"
              name="Crop_Growth_Stage"
              value={formData.Crop_Growth_Stage}
              onChange={handleChange}
              options={[
                "Sowing",
                "Vegetative",
                "Flowering",
                "Harvest",
              ]}
            />

            <SelectField
              label="Irrigation Type"
              name="Irrigation_Type"
              value={formData.Irrigation_Type}
              onChange={handleChange}
              options={[
                "Canal",
                "Drip",
                "Rainfed",
                "Sprinkler",
              ]}
            />
          </div>
        </div>


        {/* Previous Farming Information (Optional) */}
        <div className="form-card optional-card">
          <div className="card-heading">
            <div className="card-icon">
              📊
            </div>
            <div>
              <h3>
                Previous Farming Information
              </h3>

              <p>
                Optional — leave these fields blank
                if this information is unavailable.
              </p>
            </div>
          </div>

          <div className="form-grid three-columns">

            <InputField
              label="Previous Crop"
              name="Previous_Crop"
              value={formData.Previous_Crop}
              onChange={handleChange}
              type="text"
              placeholder="Optional"
              required={false}
            />

            <InputField
              label="Fertilizer Used Last Season"
              name="Fertilizer_Used_Last_Season"
              value={
                formData.Fertilizer_Used_Last_Season
              }
              onChange={handleChange}
              placeholder="Optional"
              required={false}
            />

            <InputField
              label="Yield Last Season"
              name="Yield_Last_Season"
              value={formData.Yield_Last_Season}
              onChange={handleChange}
              placeholder="Optional"
              required={false}
            />

          </div>
        </div>

        {/* Error Message */}
        {error && (

          <div className="form-error">
            ⚠️ {error}
          </div>

        )}

        {/* Submit Button */}

        <button
          type="submit"
          className="submit-button"
        >

          <span>🤖</span>

          Get AI Fertilizer Recommendation

        </button>
      </form>
    </section>
  );
}

/* Reusable Input Field */
interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "number",
  placeholder,
  required = true,
}: InputFieldProps) {
  return (
    <div className="input-group">

      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={
          type === "number"
            ? "any"
            : undefined
        }
      />
    </div>
  );
}


/* Reusable Select Field */
interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  required?: boolean;
}

function SelectField({
  label,
  name,
  value,
  options,
  onChange,
  required = true,
}: SelectFieldProps) {
  return (
    <div className="input-group">

      <label htmlFor={name}>
        {label} {required && <span className="required">*</span>}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        <option value="">
          Select {label}
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}