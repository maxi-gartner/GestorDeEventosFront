let apiUrl;

if (process.env.NODE_ENV === "production") {
  apiUrl = import.meta.env.VITE_API || "ruta de la base de datos";
} else {
  apiUrl = "http://localhost:4000/api/";
}

export default apiUrl;
