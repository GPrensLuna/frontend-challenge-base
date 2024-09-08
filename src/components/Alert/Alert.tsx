/* eslint-disable @typescript-eslint/naming-convention */
import Swal from "sweetalert2";

const Alert = {
  success: (title: string, text?: string): void => {
    Swal.fire({
      icon: "success",
      title,
      text,
      confirmButtonColor: "#FF6600",
    });
  },
  error: (title: string, text?: string): void => {
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: "#FF6600",
    });
  },
  confirm: async (title: string, text?: string): Promise<boolean> => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF6600",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
    });
    return result.isConfirmed;
  },
};

export default Alert;
