import Swal from "sweetalert2";

const alert = {
  loading(message, willCloseCallback = null) {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      allowEscapeKey: false,
      background: "#1e1e1e",
      color: "#fff",
      showConfirmButton: false,
      timerProgressBar: true,
      width: "300px",
      position: "top-end",
      customClass: {
        popup: "dark-popup",
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
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      width: "300px",
      position: "top-end",
      customClass: {
        popup: "dark-popup",
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
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      width: "300px",
      position: "top-end",
      customClass: {
        popup: "dark-popup",
      },
      willClose: willCloseCallback,
    });
  },

  warning(message, willCloseCallback = null) {
    Swal.fire({
      title: "Warning",
      text: message,
      icon: "warning",
      background: "#1e1e1e",
      color: "#fff",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      width: "300px",
      position: "top-end",
      customClass: {
        popup: "dark-popup",
      },
      willClose: willCloseCallback,
    });
  },
};

export default alert;
