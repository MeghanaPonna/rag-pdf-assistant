import axios from "axios";

const clientId = (() => {
  const key = "enterprise_pdf_client_id";
  let value = localStorage.getItem(key);
  if (!value) {
    value = crypto.randomUUID();
    localStorage.setItem(key, value);
  }
  return value;
})();

const API = axios.create({
  // Vite proxy removes local-development CORS entirely. Set VITE_API_URL in production.
  baseURL: import.meta.env.VITE_API_URL || "/api",
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
    formData.append("client_id", clientId);
    return (await API.post("/upload/", formData)).data;
  } catch (error) {
    throw new Error(errorMessage(error, "Failed to upload PDF."), { cause: error });
  }
};

export const askQuestion = async (question, source, history = []) => {
  try {
    return (await API.post("/chat/", { question, source, history, client_id: clientId })).data;
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
    return (await API.get("/document/list", { params: { client_id: clientId } })).data.documents || [];
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load indexed documents."), { cause: error });
  }
};
export const pdfUrl = (source, page) => `${API.defaults.baseURL}/files/${encodeURIComponent(source)}#page=${page}`;
export const getChatHistory = async (source) => {
  try {
    return (await API.get("/chat/history", { params: { source, client_id: clientId } })).data;
  } catch (error) {
    throw new Error(errorMessage(error, "Unable to load chat history."), { cause: error });
  }
};

export default API;
