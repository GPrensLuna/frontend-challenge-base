interface RatingCircleProps {
  rating: number;
}

const getColorByRating = (
  rating: number,
): "stroke-green-500" | "stroke-yellow-500" | "stroke-red-500" => {
  if (rating >= 7) return "stroke-green-500";
  if (rating >= 4) return "stroke-yellow-500";
  return "stroke-red-500";
};
const RatingCircle: React.FC<RatingCircleProps> = ({ rating }) => {
  const ratingPercentage = (rating / 10) * 100;
  const colorClass = getColorByRating(rating);

  return (
    <div className="relative w-12 h-12 bg-white rounded-full">
      <svg className="absolute top-0 left-0 w-full h-full " viewBox="0 0 36 36">
        <circle
          className="text-gray-200"
          strokeWidth="4"
          stroke="currentColor"
          fill="none"
          cx="18"
          cy="18"
          r="16"
        />
        <circle
          className={`absolute top-0 left-0 w-full h-full ${colorClass}`}
          strokeWidth="4"
          strokeDasharray={`${ratingPercentage} ${100 - ratingPercentage}`}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          cx="18"
          cy="18"
          r="16"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-sm font-semibold text-gray-900 bg-white"
        >
          {rating.toFixed(1)}
        </text>
      </svg>
    </div>
  );
};

export default RatingCircle;
