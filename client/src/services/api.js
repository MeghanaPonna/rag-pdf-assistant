import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000",
  timeout: 120000,
});

const errorMessage = (error, fallback) => {
  const detail = error.response?.data?.detail;
  return typeof detail === "string" ? detail : error.message || fallback;
};

export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    return (await API.post("/upload/", formData)).data;
  } catch (error) {
    throw new Error(errorMessage(error, "Failed to upload PDF."), { cause: error });
  }
};

export const askQuestion = async (question, source, history = []) => {
  try {
    return (await API.post("/chat/", { question, source, history })).data;
  } catch (error) {
    throw new Error(errorMessage(error, "Failed to get an answer."), { cause: error });
  }
};

const analyze = async (endpoint, source) => {
  try {
    return (await API.post(`/document/${endpoint}`, { source })).data;
  } catch (error) {
    throw new Error(errorMessage(error, "Document analysis failed."), { cause: error });
  }
};

export const generateSummary = (source) => analyze("summary", source);
export const getKeyTopics = (source) => analyze("topics", source);
export const getSections = (source) => analyze("sections", source);
export const generateInterviewQuestions = (source) => analyze("interview-questions", source);
export const getDocuments = async () => {
  try {
    return (await API.get("/document/list")).data.documents || [];
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load indexed documents."), { cause: error });
  }
};
export const pdfUrl = (source, page) => `${API.defaults.baseURL}/files/${encodeURIComponent(source)}#page=${page}`;

export default API;
