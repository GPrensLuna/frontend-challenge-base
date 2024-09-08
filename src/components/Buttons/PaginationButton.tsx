import { PaginationButtonProps } from "./TypeScrip";
const PaginationButton: React.FC<PaginationButtonProps> = ({
  label,
  onClick,
  disabled,
  ariaLabel,
  className,
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-3 rounded-md transition duration-300 border border-transparent ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-[#FF6600] hover:text-white focus:ring-2 focus:ring-[#FF6600]"} ${className ?? ""}`}
    aria-label={ariaLabel}
  >
    {label}
  </button>
);

export default PaginationButton;
