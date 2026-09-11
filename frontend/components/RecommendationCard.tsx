interface Props {
  result: any;
}

export default function RecommendationCard({
  result,
}: Props) {

  return (

    <div className="recommendation-card">
      <p className="result-label">
        🤖 AI RECOMMENDATION
      </p>

      <h2>
        {result.recommended_fertilizer}
      </h2>

      <div className="confidence">
        <span>
          Confidence
        </span>

        <strong>
          {result.confidence}%
        </strong>

      </div>

      <div className={`confidence-level ${result.confidence_level.toLowerCase()}`} >
        {result.confidence_level} Confidence
      </div>
    </div>
  );
}