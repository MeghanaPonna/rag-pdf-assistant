// // // // // import { useState } from "react";

// // // // // import Header from "./components/Header";
// // // // // import Sidebar from "./components/Sidebar";
// // // // // import PDFUpload from "./components/PDFUpload";
// // // // // import ChatWindow from "./components/ChatWindow";

// // // // // import "./App.css";

// // // // // function App() {

// // // // //   const [uploadedFile, setUploadedFile] =
// // // // //     useState(null);

// // // // //   const handleUploadSuccess = (result) => {

// // // // //     setUploadedFile({
// // // // //       filename: result.filename,
// // // // //       total_pages: result.total_pages,
// // // // //       total_chunks: result.total_chunks,
// // // // //     });

// // // // //   };

// // // // //   const handleClearChat = () => {

// // // // //     window.location.reload();

// // // // //   };

// // // // //   return (
// // // // //     <div className="app">

// // // // //       <Header />

// // // // //       <div className="app-layout">

// // // // //         <Sidebar
// // // // //           uploadedFile={uploadedFile}
// // // // //           onClearChat={handleClearChat}
// // // // //         />

// // // // //         <main className="main-content">

// // // // //           <PDFUpload
// // // // //             onUploadSuccess={handleUploadSuccess}
// // // // //           />

// // // // //           <ChatWindow
// // // // //             uploadedFile={uploadedFile}
// // // // //           />

// // // // //         </main>

// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default App;


// // // // import { useState } from "react";
// // // // import "./App.css";

// // // // import PDFUpload from "./components/PDFUpload";
// // // // import ChatWindow from "./components/ChatWindow";

// // // // function App() {
// // // //   const [document, setDocument] = useState(null);

// // // //   const handleUploadSuccess = (result) => {
// // // //     setDocument(result);
// // // //   };

// // // //   return (
// // // //     <div className="app">

// // // //       {/* ================= HEADER ================= */}

// // // //       <header className="header">

// // // //         <div className="brand">

// // // //           <div className="logo">
// // // //             AI
// // // //           </div>

// // // //           <div>
// // // //             <h1>
// // // //               Enterprise AI PDF Assistant
// // // //             </h1>

// // // //             <p>
// // // //               Intelligent document analysis powered by RAG
// // // //             </p>
// // // //           </div>

// // // //         </div>

// // // //         <div className="status">
// // // //           <span className="status-dot"></span>
// // // //           AI Online
// // // //         </div>

// // // //       </header>


// // // //       {/* ================= MAIN ================= */}

// // // //       <main className="main">

// // // //         {/* ================= UPLOAD ================= */}

// // // //         <section className="upload-section">

// // // //           <h2>
// // // //             Upload Document
// // // //           </h2>

// // // //           <p>
// // // //             Upload a PDF to start asking questions.
// // // //           </p>

// // // //           <PDFUpload
// // // //             onUploadSuccess={handleUploadSuccess}
// // // //           />

// // // //           {/* Document information after upload */}

// // // //           {document && (
// // // //             <div className="document-info">

// // // //               <strong>
// // // //                 {document.filename}
// // // //               </strong>

// // // //               <p>
// // // //                 {document.total_pages} pages •{" "}
// // // //                 {document.total_chunks} chunks indexed
// // // //               </p>

// // // //             </div>
// // // //           )}

// // // //         </section>


// // // //         {/* ================= CHAT ================= */}

// // // //         <section className="chat-section">

// // // //           <h2>
// // // //             Ask Your Document
// // // //           </h2>

// // // //           <p>
// // // //             Ask questions based on your uploaded PDF.
// // // //           </p>

// // // //           <ChatWindow
// // // //             document={document}
// // // //           />

// // // //         </section>

// // // //       </main>

// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;


// // // import { useState } from "react";
// // // import "./App.css";

// // // import PDFUpload from "./components/PDFUpload";
// // // import ChatWindow from "./components/ChatWindow";

// // // function App() {
// // //   const [document, setDocument] = useState(null);

// // //   const handleUploadSuccess = (result) => {
// // //     setDocument(result);
// // //   };

// // //   return (
// // //     <div className="app">

// // //       {/* ================= HEADER ================= */}

// // //       <header className="header">

// // //         <div className="brand">

// // //           <div className="logo">
// // //             AI
// // //           </div>

// // //           <div>
// // //             <h1>
// // //               Enterprise AI PDF Assistant
// // //             </h1>

// // //             <p>
// // //               Intelligent document analysis powered by RAG
// // //             </p>
// // //           </div>

// // //         </div>

// // //         <div className="status">
// // //           <span className="status-dot"></span>
// // //           AI Online
// // //         </div>

// // //       </header>


// // //       {/* ================= MAIN ================= */}

// // //       <main className="main">

// // //         {/* ================= UPLOAD SECTION ================= */}

// // //         <section className="upload-section">

// // //           <h2>
// // //             Upload Document
// // //           </h2>

// // //           <p>
// // //             Upload a PDF to start asking questions.
// // //           </p>

// // //           <PDFUpload
// // //             onUploadSuccess={handleUploadSuccess}
// // //           />

// // //           {/* ================= DOCUMENT INFO ================= */}

// // //           {document && (
// // //             <div className="document-info">

// // //               <strong>
// // //                 {document.filename}
// // //               </strong>

// // //               <p>
// // //                 {document.total_pages} pages{" "}
// // //                 •{" "}
// // //                 {document.total_chunks} chunks indexed
// // //               </p>

// // //             </div>
// // //           )}

// // //         </section>


// // //         {/* ================= CHAT SECTION ================= */}

// // //         <section className="chat-section">

// // //           <h2>
// // //             Ask Your Document
// // //           </h2>

// // //           <p>
// // //             Ask questions based on your uploaded PDF.
// // //           </p>

// // //           <ChatWindow
// // //             document={document}
// // //           />

// // //         </section>

// // //       </main>

// // //     </div>
// // //   );
// // // }

// // // export default App;



// // import { useState } from "react";
// // import "./App.css";

// // import PDFUpload from "./components/PDFUpload";
// // import ChatWindow from "./components/ChatWindow";

// // function App() {
// //   const [document, setDocument] = useState(null);
// //   const [documentVersion, setDocumentVersion] = useState(0);

// //   // ==========================================
// //   // PDF UPLOAD SUCCESS
// //   // ==========================================

// //   const handleUploadSuccess = (result) => {
// //     console.log("Uploaded document:", result);

// //     // Store uploaded document
// //     setDocument(result);

// //     // Change version so ChatWindow knows
// //     // that a new document was uploaded
// //     setDocumentVersion((previous) => previous + 1);
// //   };

// //   return (
// //     <div className="app">

// //       {/* ==========================================
// //           HEADER
// //       =========================================== */}

// //       <header className="header">

// //         <div className="brand">

// //           <div className="logo">
// //             AI
// //           </div>

// //           <div className="brand-text">

// //             <h1>
// //               Enterprise AI PDF Assistant
// //             </h1>

// //             <p>
// //               Intelligent document analysis powered by RAG
// //             </p>

// //           </div>

// //         </div>

// //         <div className="status">

// //           <span className="status-dot"></span>

// //           <span>
// //             AI Online
// //           </span>

// //         </div>

// //       </header>


// //       {/* ==========================================
// //           MAIN CONTENT
// //       =========================================== */}

// //       <main className="main">

// //         {/* ========================================
// //             UPLOAD SECTION
// //         ========================================= */}

// //         <section className="upload-section">

// //           <div className="section-header">

// //             <h2>
// //               Upload Document
// //             </h2>

// //             <p>
// //               Upload a PDF to start asking questions.
// //             </p>

// //           </div>

// //           <PDFUpload
// //             onUploadSuccess={handleUploadSuccess}
// //           />


// //           {/* ======================================
// //               DOCUMENT INFORMATION
// //           ======================================= */}

// //           {document && (
// //             <div className="document-info">

// //               <div className="document-icon">
// //                 📄
// //               </div>

// //               <div className="document-details">

// //                 <strong>
// //                   {document.filename}
// //                 </strong>

// //                 <p>
// //                   {document.total_pages} pages
// //                   {" • "}
// //                   {document.total_chunks} chunks indexed
// //                 </p>

// //               </div>

// //               <div className="document-status">
// //                 ✓ Indexed
// //               </div>

// //             </div>
// //           )}

// //         </section>


// //         {/* ========================================
// //             CHAT SECTION
// //         ========================================= */}

// //         <section className="chat-section">

// //           <div className="section-header">

// //             <h2>
// //               Ask Your Document
// //             </h2>

// //             <p>
// //               Ask questions based on your uploaded PDF.
// //             </p>

// //           </div>


// //           {/* ======================================
// //               CHAT WINDOW
// //           ======================================= */}

// //           <ChatWindow
// //             key={documentVersion}
// //             document={document}
// //           />

// //         </section>

// //       </main>

// //     </div>
// //   );
// // }

// // export default App;




// import { useState } from "react";
// import "./App.css";

// import PDFUpload from "./components/PDFUpload";
// import ChatWindow from "./components/ChatWindow";
// import Sidebar from "./components/Sidebar";
// import DocumentIntelligence from "./components/DocumentIntelligence";

// function App() {
//   const [document, setDocument] = useState(null);
//   const [documentVersion, setDocumentVersion] = useState(0);

//   const [quickQuestion, setQuickQuestion] = useState(null);

//   // ==========================================
//   // PDF UPLOAD SUCCESS
//   // ==========================================

//   const handleUploadSuccess = (result) => {
//     console.log("Uploaded document:", result);

//     setDocument(result);

//     // Reset ChatWindow when a new PDF is uploaded
//     setDocumentVersion((previous) => previous + 1);

//     // Clear any pending quick question
//     setQuickQuestion(null);
//   };

//   // ==========================================
//   // QUICK QUESTION
//   // ==========================================

//   const handleQuickQuestion = (question) => {
//     if (!document) return;

//     setQuickQuestion(question);
//   };

//   // ==========================================
//   // QUICK QUESTION HANDLED
//   // ==========================================

//   const handleQuickQuestionHandled = () => {
//     setQuickQuestion(null);
//   };

//   // ==========================================
//   // CLEAR CHAT
//   // ==========================================

//   const handleClearChat = () => {
//     setDocumentVersion((previous) => previous + 1);
//   };

//   return (
//     <div className="app">

//       {/* ======================================
//           HEADER
//       ======================================= */}

//       <header className="header">

//         <div className="brand">

//           <div className="logo">
//             AI
//           </div>

//           <div className="brand-text">

//             <h1>
//               Enterprise AI PDF Assistant
//             </h1>

//             <p>
//               Intelligent document analysis powered by RAG
//             </p>

//           </div>

//         </div>

//         <div className="status">

//           <span className="status-dot"></span>

//           <span>
//             AI Online
//           </span>

//         </div>

//       </header>


//       {/* ======================================
//           APPLICATION BODY
//       ======================================= */}

//       <div className="app-body">

//         {/* ====================================
//             SIDEBAR
//         ===================================== */}

//         <Sidebar
//           document={document}
//           onQuickQuestion={handleQuickQuestion}
//           onClearChat={handleClearChat}
//         />


//         {/* ====================================
//             MAIN CONTENT
//         ===================================== */}

//         <main className="main">

//           {/* ==================================
//               UPLOAD SECTION
//           =================================== */}

//           <section className="upload-section">

//             <div className="section-header">

//               <h2>
//                 Upload Document
//               </h2>

//               <p>
//                 Upload a PDF to start asking questions.
//               </p>

//             </div>

//             <PDFUpload
//               onUploadSuccess={handleUploadSuccess}
//             />


//             {/* DOCUMENT INFO */}

//             {document && (
//               <div className="document-info">

//                 <div className="document-icon">
//                   📄
//                 </div>

//                 <div className="document-details">

//                   <strong>
//                     {document.filename}
//                   </strong>

//                   <p>
//                     {document.total_pages} pages
//                     {" • "}
//                     {document.total_chunks} chunks indexed
//                   </p>

//                 </div>

//                 <div className="document-status">
//                   ✓ Indexed
//                 </div>

//               </div>
//             )}

//           </section>


//           {/* ==================================
//               CHAT
//           =================================== */}

//           <section className="chat-section">

//             <div className="section-header">

//               <h2>
//                 Ask Your Document
//               </h2>

//               <p>
//                 Ask questions based on your uploaded PDF.
//               </p>

//             </div>

//             <ChatWindow
//               key={documentVersion}
//               document={document}
//               quickQuestion={quickQuestion}
//               onQuickQuestionHandled={
//                 handleQuickQuestionHandled
//               }
//             />

//           </section>

//         </main>

//       </div>

//     </div>
//   );
// }

// export default App;




import { useEffect, useState } from "react";
import "./App.css";

import PDFUpload from "./components/PDFUpload";
import ChatWindow from "./components/ChatWindow";
import Sidebar from "./components/Sidebar";
import DocumentIntelligence from "./components/DocumentIntelligence";
import { getDocuments } from "./services/api";


function App() {

  const [document, setDocument] = useState(null);
  const [documents, setDocuments] = useState([]);

  const [documentVersion, setDocumentVersion] = useState(0);

  const [quickQuestion, setQuickQuestion] = useState(null);
  const [documentLoadError, setDocumentLoadError] = useState("");

  useEffect(() => {
    getDocuments()
      .then((indexedDocuments) => {
        setDocuments(indexedDocuments);
        setDocument((current) => current || indexedDocuments[0] || null);
      })
      .catch((error) => setDocumentLoadError(error.message));
  }, []);


  // ==========================================
  // PDF UPLOAD SUCCESS
  // ==========================================

  const handleUploadSuccess = (result) => {

    console.log(
      "Uploaded document:",
      result
    );

    // Save uploaded document
    const normalized = {
      ...result,
      total_pages: result.total_pages ?? result.totalPages,
      total_chunks: result.total_chunks ?? result.totalChunks,
    };
    setDocuments((current) => [
      ...current.filter((item) => item.filename !== normalized.filename),
      normalized,
    ]);
    setDocument(normalized);
    setDocumentLoadError("");

    // Reset ChatWindow
    setDocumentVersion(
      (previous) => previous + 1
    );

    // Clear pending quick question
    setQuickQuestion(null);
  };


  // ==========================================
  // QUICK QUESTION
  // ==========================================

  const handleQuickQuestion = (question) => {

    if (!document) {
      return;
    }

    setQuickQuestion(question);
  };


  // ==========================================
  // QUICK QUESTION HANDLED
  // ==========================================

  const handleQuickQuestionHandled = () => {

    setQuickQuestion(null);
  };


  // ==========================================
  // CLEAR CHAT
  // ==========================================

  const handleClearChat = () => {

    setDocumentVersion(
      (previous) => previous + 1
    );
  };


  return (
    <div className="app">

      {/* ======================================
          HEADER
      ======================================= */}

      <header className="header">

        <div className="brand">

          <div className="logo">
            AI
          </div>

          <div className="brand-text">

            <h1>
              Enterprise AI PDF Assistant
            </h1>

            <p>
              Intelligent document analysis powered by RAG
            </p>

          </div>

        </div>


        <div className="status">

          <span className="status-dot"></span>

          <span>
            AI Online
          </span>

        </div>

      </header>


      {/* ======================================
          APPLICATION BODY
      ======================================= */}

      <div className="app-body">


        {/* ====================================
            SIDEBAR
        ===================================== */}

          <Sidebar
            document={document}
            documents={documents}
            onSelectDocument={(selected) => { setDocument(selected); setDocumentVersion((previous) => previous + 1); setQuickQuestion(null); }}
            onQuickQuestion={handleQuickQuestion}
            onClearChat={handleClearChat}
          />


        {/* ====================================
            MAIN CONTENT
        ===================================== */}

        <main className="main">


          {/* ==================================
              UPLOAD DOCUMENT
          =================================== */}

          <section className="upload-section">

            <div className="section-header">

              <h2>
                Upload Document
              </h2>

              <p>
                Upload a PDF to start asking
                questions.
              </p>

            </div>


            <PDFUpload
              onUploadSuccess={
                handleUploadSuccess
              }
            />

            {documentLoadError && (
              <p className="error">{documentLoadError}</p>
            )}


            {/* ==================================
                DOCUMENT INFORMATION
            =================================== */}

            {document && (

              <div className="document-info">

                <div className="document-icon">
                  📄
                </div>


                <div className="document-details">

                  <strong>
                    {document.filename}
                  </strong>

                  <p>
                    {document.total_pages} pages
                    {" • "}
                    {document.total_chunks} chunks indexed
                  </p>

                </div>


                <div className="document-status">
                  ✓ Indexed
                </div>

              </div>

            )}

          </section>


          {/* ==================================
              DOCUMENT INTELLIGENCE
          =================================== */}

          {document && (

            <DocumentIntelligence
              key={document.filename}
              document={document}
            />

          )}


          {/* ==================================
              CHAT SECTION
          =================================== */}

          <section className="chat-section">

            <div className="section-header">

              <h2>
                Ask Your Document
              </h2>

              <p>
                Ask questions based on your
                uploaded PDF.
              </p>

            </div>


            <ChatWindow
              key={documentVersion}
              document={document}
              quickQuestion={quickQuestion}
              onQuickQuestionHandled={
                handleQuickQuestionHandled
              }
            />

          </section>


        </main>

      </div>

    </div>
  );
}


export default App;
