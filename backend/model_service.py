import pandas as pd
import joblib
import shap

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

# Create SHAP explainer once
explainer = shap.TreeExplainer(model)

def clean_feature_names(feature):
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

