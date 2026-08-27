import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
});

export const uploadResume = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/api/resumes/upload", formData);

  return response.data;
};
