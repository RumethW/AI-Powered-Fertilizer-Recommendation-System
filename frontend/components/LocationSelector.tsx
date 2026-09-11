"use client";

import { useState } from "react";
import type { LocationData } from "../types";

interface Props {
  onLocationChange: (
    location: LocationData
  ) => void;
}

export default function LocationSelector({
  onLocationChange,
}: Props) {

  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

// Current Location
  const useCurrentLocation = () => {

    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {
        const newLocation = {
          latitude:
            position.coords.latitude,

          longitude:
            position.coords.longitude,
        };

        setLocation(newLocation);
        onLocationChange(newLocation);
        setLoading(false);
      },

      () => {

        setError("Unable to get your current location.");
        setLoading(false);
      }

    );
  };

  // Address Search
  const searchAddress = async () => {

    if (!address.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&limit=1`
      );

      const data = await response.json();

      if (!data.length) {
        throw new Error(
          "Location not found."
        );
      }

      const newLocation = {

        latitude:
          parseFloat(data[0].lat),

        longitude:
          parseFloat(data[0].lon),

        address:
          data[0].display_name,
      };

      setLocation(newLocation);
      onLocationChange(newLocation);

    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);

    }
  };

  return (

    <div className="space-y-5">
      {/* Address Search */}
      <div>
        <label className="block font-medium mb-2">
          🔎 Search Farm Location
        </label>

        <div className="flex gap-2">

          <input
            type="text"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            placeholder="Example: Gampaha, Sri Lanka"
            className="flex-1 border rounded-lg p-3"
          />

          <button
            type="button"
            onClick={searchAddress}
            disabled={loading}
            className="bg-blue-600 text-white px-5 rounded-lg"
          >
            Search

          </button>

        </div>

      </div>


      {/* Current Location */}
      <button
        type="button"
        onClick={useCurrentLocation}
        disabled={loading}
        className="border border-green-600 text-green-700 px-5 py-3 rounded-lg"
      >

        📍 Use My Current Location

      </button>


      {/* Selected Location */}
      {location && (

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">

          <h3 className="font-semibold">
            📍 Selected Farm Location
          </h3>

          {location.address && (

            <p className="text-sm mt-2">
              {location.address}
            </p>

          )}

          <p className="text-sm mt-2">
            Latitude: {location.latitude.toFixed(6)}

          </p>
          <p className="text-sm">

            Longitude: {location.longitude.toFixed(6)}

          </p>
        </div>

      )}

      {error && (
        <p className="text-red-600">
          {error}
        </p>

      )}
    </div>
  );
}