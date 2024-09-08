interface ButtonRefetchProps {
  handleRefetch: () => void;
  isRefetching: boolean;
}

const ButtonRefetch: React.FC<ButtonRefetchProps> = ({
  handleRefetch,
  isRefetching,
}) => {
  return (
    <button
      onClick={handleRefetch}
      disabled={isRefetching}
      className={`mb-4 px-4 py-2 rounded transition-colors duration-300 border border-black ${isRefetching ? "bg-[#FF6600]/60" : "bg-[#FF6600] hover:bg-[#e65c00] focus:ring-4 focus:ring-[#FF6600]/50"} text-white dark:bg-[#FF6600] dark:hover:bg-[#e65c00] dark:focus:ring-[#FF6600]/50 ${isRefetching ? "cursor-not-allowed" : "cursor-pointer"} focus:outline-none`}
    >
      {isRefetching ? "Actualizando..." : "Actualizar"}
    </button>
  );
};

export default ButtonRefetch;
