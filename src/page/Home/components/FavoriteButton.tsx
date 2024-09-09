interface FavoriteButtonProps {
  isFavorita: boolean;
  onClick: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorita,
  onClick,
}) => {
  return (
    <button className="px-4 py-2 rounded text-black text-4xl" onClick={onClick}>
      {isFavorita ? "❤️" : "🤍"}
    </button>
  );
};

export default FavoriteButton;
