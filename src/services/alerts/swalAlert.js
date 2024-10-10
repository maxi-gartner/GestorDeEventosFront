import Swal from "sweetalert2";

const alert = {
  loading(message, willCloseCallback = null) {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: "#1e1e1e",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
      },
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: willCloseCallback,
    });
  },

  success(message, willCloseCallback = null) {
    Swal.fire({
      title: "Success!",
      text: message,
      icon: "success",
      background: "#1e1e1e",
      color: "#fff",
      confirmButtonColor: "#3085d6",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
      },
      willClose: willCloseCallback,
    });
  },

  error(message, willCloseCallback = null) {
    Swal.fire({
      title: "Error",
      text: message,
      icon: "error",
      background: "#1e1e1e",
      color: "#fff",
      confirmButtonColor: "#d33",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
      },
      willClose: willCloseCallback,
    });
  },

  warning(message, title = "Advertencia", willCloseCallback = null) {
    Swal.fire({
      title: title,
      text: message,
      icon: "warning",
      background: "#1e1e1e",
      color: "#fff",
      confirmButtonColor: "#f39c12",
      customClass: {
        popup: "dark-popup",
        confirmButton: "dark-confirm-button",
      },
      willClose: willCloseCallback,
    });
  },
};

export default alert;
