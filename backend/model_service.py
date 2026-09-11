import pandas as pd
import joblib
import shap
import numpy as np

# Load ML components
model = joblib.load("models/fertilizer_random_forest_model.pkl")

preprocessor = joblib.load("models/fertilizer_preprocessor.pkl")

feature_names = joblib.load("models/fertilizer_feature_names.pkl")

input_columns = joblib.load("models/fertilizer_input_columns.pkl")

label_encoder = joblib.load("models/fertilizer_label_encoder.pkl")

# Create features for the model
def create_features(df: pd.DataFrame) -> pd.DataFrame:

    df = df.copy()

    # Total NPK
    df["Total_NPK"] = (df["Nitrogen_Level"] + df["Phosphorus_Level"] + df["Potassium_Level"])

    # Nutrient Ratios
    df["N_to_P_Ratio"] = (df["Nitrogen_Level"] / (df["Phosphorus_Level"] + 1))

    df["N_to_K_Ratio"] = (df["Nitrogen_Level"] / (df["Potassium_Level"] + 1))

    df["P_to_K_Ratio"] = (df["Phosphorus_Level"] / (df["Potassium_Level"] + 1))

    # NPK Standard Deviation
    df["NPK_Std"] = df[
        [
            "Nitrogen_Level",
            "Phosphorus_Level",
            "Potassium_Level"
        ]
    ].std(axis=1)

    # Temperature × Humidity
    df["Temp_Humidity_Interaction"] = (df["Temperature"] * df["Humidity"])

    # Rainfall × Soil Moisture
    df["Rainfall_Soil_Moisture_Interaction"] = (df["Rainfall"] * df["Soil_Moisture"])

    # Soil pH Category
    def get_ph_category(ph):

        if ph < 6.5:
            return "Acidic"
        elif ph <= 7.5:
            return "Neutral"
        else:
            return "Alkaline"

    df["Soil_pH_Category"] = df["Soil_pH"].apply(get_ph_category)

    return df

# Create SHAP explainer 
explainer = shap.TreeExplainer(model)

def clean_feature_name(feature):
    feature = feature.replace("num__", "")
    feature = feature.replace("cat__", "")
    feature = feature.replace("_", " ")

    return feature

def get_confidence_level(confidence_score):
    if confidence_score >= 0.80:
        return "High"
    elif confidence_score >= 0.60:
        return "Medium"
    else:
        return "Low"

def predict_fertilizer(data):

    df = pd.DataFrame([data])  # Convert the input dictionary into a single-row DataFrame

    df = df.reindex(columns=input_columns)      # Keep only the input features expected by the trained model and in the correct order

    df = create_features(df)   # Generate the same engineered features used during model training

    processed_data = preprocessor.transform(df) # Apply the saved preprocessing pipeline to transform the input

    prediction_encoded = model.predict(processed_data)[0]  # Make the prediction using the trained model

    if isinstance(prediction_encoded, np.generic):  # Check if the prediction is a NumPy scalar type
        prediction_encoded = prediction_encoded.item()      # Convert it to a native Python type for compatibility with the label encoder

    prediction = label_encoder.inverse_transform([prediction_encoded])[0]   # Convert the encoded prediction back to the original fertilizer label using the label encoder

    probabilities = model.predict_proba(processed_data)[0] # Get the predicted probabilities for each fertilizer class

    confidence_score = float(np.max(probabilities))     # Get the highest predicted probability as the confidence score for the recommended fertilizer
    confidence_level = get_confidence_level(confidence_score)


    shap_values = explainer.shap_values(processed_data)  # Compute SHAP values for the input data using the pre-trained SHAP explainer
    shap_array = np.array(shap_values)  # Convert the SHAP values to a NumPy array for easier manipulation and indexing

    predicted_class_index = list(model.classes_).index(prediction_encoded)  # Find the position of the predicted fertilizer class
    class_shap_values = shap_array[0, :, predicted_class_index]   # Extract SHAP values for the predicted fertilizer class.

    local_shap_df = pd.DataFrame({      # Create a DataFrame containing each feature and its SHAP value.
        "feature": feature_names,
        "shap_value": class_shap_values
    })

    local_shap_df["absolute_shap"] = np.abs(local_shap_df["shap_value"])  # Calculate the absolute SHAP values to assess the magnitude of each feature's impact on the prediction.

    local_shap_df = local_shap_df.sort_values(      # Sort features by their contribution and select the top three.
        by="absolute_shap",
        ascending=False
    )

    top_3 = local_shap_df.head(3) 

    top_factors = []  # List to store the top three contributing factors

    # Loop through the top three features and their SHAP values to create a structured output
    for _, row in top_3.iterrows():

        top_factors.append({
            "feature": clean_feature_name(
                row["feature"]
            ),
            "impact": round(
                float(row["absolute_shap"]),
                4
            )
        })

    # Top 3 fertilizer probabilities
    top_indices = np.argsort(probabilities)[::-1][:3]

    alternatives = []

    for index in top_indices:   # Loop through the top three predicted fertilizer classes based on their probabilities

        encoded_class = model.classes_[index]

        fertilizer_name = label_encoder.inverse_transform([encoded_class])[0]

        alternatives.append({
            "fertilizer": str(fertilizer_name),
            "probability": round(float(probabilities[index] * 100), 2)
        })

    return {
        "recommended_fertilizer": str(prediction),
        "confidence": round(confidence_score * 100, 2),
        "confidence_level": confidence_level,
        "top_factors": top_factors,
        "alternatives": alternatives
    }