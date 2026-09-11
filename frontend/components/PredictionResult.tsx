interface Factor {
  feature: string;
  impact: number;
}

interface Props {
  factors: Factor[];
}

// Function to display the top three factors influencing the AI model's fertilizer recommendation
export default function PredictionFactors({  
  factors,
}: Props) {
  return (
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

        {factors.map((factor, index) => (

          <div
            key={index}
            className="factor-card"
          >

            <div className="factor-number">
              {index + 1}
            </div>

            <div className="factor-content">

              <h3>
                {factor.feature}
              </h3>

              <p>
                AI Impact Score
              </p>

            </div>

            <div className="factor-impact">
              {factor.impact}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}