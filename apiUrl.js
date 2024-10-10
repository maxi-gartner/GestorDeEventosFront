let apiUrl;

if (import.meta.env.MODE === "production") {
  apiUrl = import.meta.env.VITE_API;
} else {
  apiUrl = "http://localhost:4000/api/"; /* import.meta.env.VITE_API; */
}

export default apiUrl;
