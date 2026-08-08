// import { useRef, useState } from "react";
// import { uploadPDF } from "../services/api";

// function PDFUpload({ onUploadSuccess }) {
//   const fileInputRef = useRef(null);

//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];

//     setError("");

//     if (!selectedFile) {
//       return;
//     }

//     if (selectedFile.type !== "application/pdf") {
//       setError("Only PDF files are allowed.");
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a PDF first.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const result = await uploadPDF(file);

//       onUploadSuccess(result);

//       setFile(null);

//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }

//     } catch (error) {
//       console.error("Upload error:", error);

//       const message =
//         error?.response?.data?.detail ||
//         "Failed to upload PDF. Please try again.";

//       setError(message);

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="upload-section">

//       <div className="section-title">
//         <div>
//           <h2>Upload Document</h2>
//           <p>
//             Upload a PDF to start asking questions.
//           </p>
//         </div>
//       </div>

//       <div
//         className="upload-box"
//         onClick={() => fileInputRef.current?.click()}
//       >

//         <div className="upload-icon">
//           ↑
//         </div>

//         <h3>
//           {file
//             ? file.name
//             : "Choose a PDF document"}
//         </h3>

//         <p>
//           Click here to browse your files
//         </p>

//         <span>
//           PDF files only
//         </span>

//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".pdf,application/pdf"
//           onChange={handleFileChange}
//           hidden
//         />

//       </div>

//       {file && (
//         <div className="selected-file">

//           <div>
//             <strong>{file.name}</strong>

//             <span>
//               {(file.size / 1024 / 1024).toFixed(2)} MB
//             </span>
//           </div>

//           <button
//             onClick={handleUpload}
//             disabled={loading}
//           >
//             {loading ? "Indexing..." : "Upload & Index"}
//           </button>

//         </div>
//       )}

//       {error && (
//         <div className="error-message">
//           {error}
//         </div>
//       )}

//     </section>
//   );
// }

// export default PDFUpload;



import { useState } from "react";
import { uploadPDF } from "../services/api";

function PDFUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF first.");
      return;
    }

    try {
      setUploading(true);
      setError("");

      const result = await uploadPDF(file);

      console.log("Upload result:", result);

      onUploadSuccess({
        filename: result.filename,
        totalPages: result.total_pages,
        totalChunks: result.total_chunks,
      });
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
      />

      {file && (
        <p>
          Selected: <strong>{file.name}</strong>
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {error && (
        <p className="error">
          {error}
        </p>
      )}

    </div>
  );
}

export default PDFUpload;