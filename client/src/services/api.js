// // // import axios from "axios";

// // // const API = axios.create({
// // //   baseURL: "http://127.0.0.1:8000",
// // //   timeout: 120000,
// // // });

// // // // Upload PDF
// // // export const uploadPDF = async (file) => {
// // //   const formData = new FormData();

// // //   formData.append("file", file);

// // //   const response = await API.post("/upload/", formData, {
// // //     headers: {
// // //       "Content-Type": "multipart/form-data",
// // //     },
// // //   });

// // //   return response.data;
// // // };

// // // // Ask question
// // // export const askQuestion = async (question) => {
// // //   const response = await API.post("/chat/", {
// // //     question,
// // //   });

// // //   return response.data;
// // // };

// // // export default API;


// // import axios from "axios";

// // const API = axios.create({
// //   baseURL: "http://127.0.0.1:8000",
// //   timeout: 120000,
// // });

// // // ==========================================
// // // UPLOAD PDF
// // // ==========================================

// // export const uploadPDF = async (file) => {
// //   try {
// //     const formData = new FormData();

// //     formData.append("file", file);

// //     const response = await API.post("/upload/", formData);

// //     return response.data;
// //   } catch (error) {
// //     console.error("Upload API Error:", error);

// //     const message =
// //       error.response?.data?.detail ||
// //       error.message ||
// //       "Failed to upload PDF";

// //     throw new Error(
// //       typeof message === "string"
// //         ? message
// //         : JSON.stringify(message)
// //     );
// //   }
// // };

// // // ==========================================
// // // ASK QUESTION
// // // ==========================================

// // export const askQuestion = async (question) => {
// //   try {
// //     const response = await API.post("/chat/", {
// //       question: question,
// //     });

// //     console.log("Chat API Response:", response.data);

// //     return response.data;

// //   } catch (error) {
// //     console.error("Chat API Error:", error);

// //     const detail = error.response?.data?.detail;

// //     const message =
// //       typeof detail === "string"
// //         ? detail
// //         : detail
// //           ? JSON.stringify(detail)
// //           : error.message || "Failed to get answer";

// //     throw new Error(message);
// //   }
// // };

// // export default API;


// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://127.0.0.1:8000",
//   timeout: 120000,
// });

// // ==========================================
// // UPLOAD PDF
// // ==========================================

// export const uploadPDF = async (file) => {
//   try {
//     const formData = new FormData();

//     formData.append("file", file);

//     const response = await API.post("/upload/", formData);

//     console.log("Upload API Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Upload API Error:", error);

//     const detail = error.response?.data?.detail;

//     const message =
//       typeof detail === "string"
//         ? detail
//         : detail
//           ? JSON.stringify(detail)
//           : error.message || "Failed to upload PDF";

//     throw new Error(message);
//   }
// };

// // ==========================================
// // ASK QUESTION
// // ==========================================

// export const askQuestion = async (question) => {
//   try {
//     const response = await API.post("/chat/", {
//       question: question,
//     });

//     console.log("Chat API Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Chat API Error:", error);

//     const detail = error.response?.data?.detail;

//     const message =
//       typeof detail === "string"
//         ? detail
//         : detail
//           ? JSON.stringify(detail)
//           : error.message || "Failed to get answer";

//     throw new Error(message);
//   }
// };

// // export default API;

// export const generateSummary = async (source) => {
//   try {
//     const response = await API.post(
//       "/document/summary",
//       {
//         source,
//       }
//     );

//     return response.data;

//   } catch (error) {

//     console.error(
//       "Summary API Error:",
//       error
//     );

//     const detail =
//       error.response?.data?.detail;

//     throw new Error(
//       typeof detail === "string"
//         ? detail
//         : error.message ||
//           "Failed to generate summary"
//     );
//   }
// };


// export default API;



import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
  timeout: 120000,
});

// =====================================================
// UPLOAD PDF
// =====================================================

export const uploadPDF = async (file) => {
  try {
    const formData = new FormData();

    formData.append("file", file);

    const response = await API.post("/upload/", formData);

    return response.data;
  } catch (error) {
    console.error("Upload API Error:", error);

    const detail = error.response?.data?.detail;

    const message =
      typeof detail === "string"
        ? detail
        : detail
        ? JSON.stringify(detail)
        : error.message || "Failed to upload PDF";

    throw new Error(message);
  }
};

// =====================================================
// ASK QUESTION
// =====================================================

// export const askQuestion = async (question) => {
//   try {
//     const response = await API.post("/chat/", {
//       question,
//     });

//     console.log("Chat API Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Chat API Error:", error);

//     const detail = error.response?.data?.detail;

//     const message =
//       typeof detail === "string"
//         ? detail
//         : detail
//         ? JSON.stringify(detail)
//         : error.message || "Failed to get answer";

//     throw new Error(message);
//   }
// };

export const askQuestion = async (question, source) => {
  try {
    const response = await API.post("/chat/", {
      question: question,
      source: source,
    });

    console.log("Chat API Response:", response.data);

    return response.data;

  } catch (error) {
    console.error("Chat API Error:", error);

    const detail = error.response?.data?.detail;

    const message =
      typeof detail === "string"
        ? detail
        : detail
          ? JSON.stringify(detail)
          : error.message || "Failed to get answer";

    throw new Error(message);
  }
};


// =====================================================
// DOCUMENT INTELLIGENCE
// =====================================================

// export const generateSummary = async () => {
//   try {
//     const response = await API.get("/document/summary");

//     console.log("Summary API Response:", response.data);

//     return response.data;
//   } catch (error) {
//     console.error("Summary API Error:", error);

//     const detail = error.response?.data?.detail;

//     throw new Error(
//       typeof detail === "string"
//         ? detail
//         : error.message || "Failed to generate summary"
//     );
//   }
// };


export const generateSummary = async (source) => {
  try {
    const response = await API.post("/document/summary", {
      source: source,
    });

    console.log("Summary API Response:", response.data);

    return response.data;

  } catch (error) {
    console.error("Summary API Error:", error);

    const detail = error.response?.data?.detail;

    throw new Error(
      typeof detail === "string"
        ? detail
        : error.message || "Failed to generate summary"
    );
  }
};

export const getKeyTopics = async () => {
  try {
    const response = await API.get("/document/topics");

    console.log("Topics API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Topics API Error:", error);

    const detail = error.response?.data?.detail;

    throw new Error(
      typeof detail === "string"
        ? detail
        : error.message || "Failed to get key topics"
    );
  }
};

export const getSections = async () => {
  try {
    const response = await API.get("/document/sections");

    console.log("Sections API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Sections API Error:", error);

    const detail = error.response?.data?.detail;

    throw new Error(
      typeof detail === "string"
        ? detail
        : error.message || "Failed to get document sections"
    );
  }
};

export const generateInterviewQuestions = async () => {
  try {
    const response = await API.get(
      "/document/interview-questions"
    );

    console.log(
      "Interview Questions API Response:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "Interview Questions API Error:",
      error
    );

    const detail = error.response?.data?.detail;

    throw new Error(
      typeof detail === "string"
        ? detail
        : error.message ||
          "Failed to generate interview questions"
    );
  }
};

export default API;