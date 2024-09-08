"use client";
import { CSSProperties, useEffect } from "react";
import { toast } from "sonner";

const successToast = (message: string): void => {
  toast.success(message || "Archivo borrado con éxito", {
    position: "bottom-center",
    duration: 3000,
    style: stylesToast.successToast,
  });
};

const errorToast = (message: string): void => {
  toast.error(message || "Error al enviar el archivo", {
    position: "bottom-center",
    duration: 3000,
    style: stylesToast.errorToast,
  });
};
const useLoadingToast = (isVisible: boolean, message?: string): void => {
  useEffect(() => {
    let loadingToast: string | number | null = null;

    if (isVisible) {
      loadingToast = toast.loading(message ?? "Creando cliente...", {
        position: "bottom-center",
        duration: 1000,
        style: stylesToast.loadingToast,
      });
    }

    return () => {
      if (loadingToast !== null) {
        toast.dismiss(loadingToast);
      }
    };
  }, [isVisible, message]);
};

const stylesToast: Record<string, CSSProperties> = {
  successToast: {
    backgroundColor: "#4caf50",
    color: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    padding: "16px",
  },
  loadingToast: {
    backgroundColor: "#ff9800",
    color: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    padding: "16px",
  },
  errorToast: {
    backgroundColor: "#f44336",
    color: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    padding: "16px",
  },
};

export { errorToast, successToast, useLoadingToast };
