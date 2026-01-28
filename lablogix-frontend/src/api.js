import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadStudents = (formData) =>
  API.post("/admin/upload-students", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
