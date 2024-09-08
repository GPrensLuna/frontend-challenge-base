interface LoadingSpinnerProps {
  message?: string;
  color?: string;
  size?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  color = "bg-[#FF6600]",
  size = "w-12 h-12",
  className = "min-w-full min-h-[600px]",
}) => {
  return (
    <article
      className={`flex flex-col items-center justify-center min-h-screen ${className}`}
    >
      <section
        className={`relative flex items-center justify-center ${size} ${size}`}
      >
        <div
          className={`border-4 border-gray-200 border-t-4 ${color} rounded-full ${size} animate-spin`}
        ></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-gray-700 rounded-full animate-ping"></div>
        </div>
      </section>
      <p className="mt-4 text-gray-700 text-lg font-medium">{message}</p>
    </article>
  );
};

export default LoadingSpinner;
