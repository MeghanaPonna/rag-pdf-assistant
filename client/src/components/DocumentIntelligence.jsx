// import { useState } from "react";
// import ReactMarkdown from "react-markdown";
// import { generateSummary } from "../services/api";


// function DocumentIntelligence({ document }) {

//   const [summary, setSummary] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   const handleSummary = async () => {

//     if (!document) return;

//     setLoading(true);
//     setError("");

//     try {

//       const result = await generateSummary(
//         document.filename
//       );

//       setSummary(result.summary);

//     } catch (error) {

//       setError(
//         error.message ||
//         "Failed to generate summary."
//       );

//     } finally {

//       setLoading(false);

//     }
//   };


//   if (!document) {
//     return null;
//   }


//   return (

//     <section className="document-intelligence">

//       <div className="intelligence-header">

//         <div>

//           <h2>
//             Document Intelligence
//           </h2>

//           <p>
//             Analyze your uploaded document
//             with AI.
//           </p>

//         </div>

//       </div>


//       <div className="intelligence-actions">

//         <button
//           onClick={handleSummary}
//           disabled={loading}
//         >
//           {loading
//             ? "Generating..."
//             : "Generate Summary"}
//         </button>

//         <button disabled>
//           Key Topics
//         </button>

//         <button disabled>
//           Sections
//         </button>

//         <button disabled>
//           Interview Questions
//         </button>

//       </div>


//       {error && (

//         <div className="intelligence-error">
//           {error}
//         </div>

//       )}


//       {summary && (

//         <div className="summary-card">

//           <h3>
//             Document Summary
//           </h3>

//           <ReactMarkdown>
//             {summary}
//           </ReactMarkdown>

//         </div>

//       )}

//     </section>

//   );
// }


// export default DocumentIntelligence;



import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateSummary } from "../services/api";

function DocumentIntelligence({ document }) {
  const [activeTab, setActiveTab] = useState("summary");

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // GENERATE SUMMARY
  // ==========================================

  const handleSummary = async () => {
    if (!document) return;

    setActiveTab("summary");
    setLoading(true);
    setError("");

    try {
      console.log(
        "Generating summary for:",
        document.filename
      );

      const result = await generateSummary(
        document.filename
      );

      console.log(
        "Summary response:",
        result
      );

      if (!result?.summary) {
        throw new Error(
          "No summary was returned from the server."
        );
      }

      setSummary(result.summary);

    } catch (error) {
      console.error(
        "Document summary error:",
        error
      );

      setError(
        error.message ||
        "Failed to generate document summary."
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // TAB HANDLER
  // ==========================================

  const handleTabClick = (tab) => {
    setActiveTab(tab);

    // Currently only summary is implemented.
    if (tab === "summary") {
      handleSummary();
    }
  };

  // ==========================================
  // NO DOCUMENT
  // ==========================================

  if (!document) {
    return null;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <section className="document-intelligence">

      {/* ======================================
          HEADER
      ======================================= */}

      <div className="document-intelligence-header">

        <div>

          <h2>
            Document Intelligence
          </h2>

          <p>
            Analyze your uploaded document with AI.
          </p>

        </div>

        <div className="intelligence-document-name">
          📄 {document.filename}
        </div>

      </div>


      {/* ======================================
          ANALYSIS TABS
      ======================================= */}

      <div className="analysis-tabs">

        {/* SUMMARY */}

        <button
          className={`analysis-tab ${
            activeTab === "summary"
              ? "active"
              : ""
          }`}
          onClick={() =>
            handleTabClick("summary")
          }
          disabled={loading}
        >
          📋 Summary
        </button>


        {/* KEY TOPICS */}

        <button
          className={`analysis-tab ${
            activeTab === "topics"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("topics")
          }
          disabled
        >
          🔑 Key Topics
        </button>


        {/* SECTIONS */}

        <button
          className={`analysis-tab ${
            activeTab === "sections"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("sections")
          }
          disabled
        >
          📑 Sections
        </button>


        {/* INTERVIEW QUESTIONS */}

        <button
          className={`analysis-tab ${
            activeTab === "interview"
              ? "active"
              : ""
          }`}
          onClick={() =>
            setActiveTab("interview")
          }
          disabled
        >
          💡 Interview Questions
        </button>

      </div>


      {/* ======================================
          CONTENT
      ======================================= */}

      <div className="analysis-content">

        {/* ====================================
            ERROR
        ===================================== */}

        {error && (
          <div className="analysis-error">
            <strong>
              Unable to analyze document
            </strong>

            <p>
              {error}
            </p>

            <button
              className="generate-analysis-btn"
              onClick={handleSummary}
              disabled={loading}
            >
              Try Again
            </button>
          </div>
        )}


        {/* ====================================
            LOADING
        ===================================== */}

        {loading && !error && (
          <div className="analysis-loading">

            <div className="analysis-spinner"></div>

            <h3>
              Analyzing your document...
            </h3>

            <p>
              The AI is reading the document
              and generating a summary.
            </p>

          </div>
        )}


        {/* ====================================
            SUMMARY
        ===================================== */}

        {!loading &&
          !error &&
          activeTab === "summary" &&
          summary && (

            <div className="analysis-result">

              <div className="analysis-result-header">

                <div>

                  <h3>
                    Document Summary
                  </h3>

                  <p>
                    AI-generated overview of
                    your uploaded PDF.
                  </p>

                </div>

              </div>


              <div className="analysis-markdown">

                <ReactMarkdown>
                  {summary}
                </ReactMarkdown>

              </div>

            </div>
          )}


        {/* ====================================
            EMPTY SUMMARY
        ===================================== */}

        {!loading &&
          !error &&
          activeTab === "summary" &&
          !summary && (

            <div className="analysis-empty">

              <div className="analysis-empty-icon">
                ✨
              </div>

              <h3>
                Analyze Your Document
              </h3>

              <p>
                Generate an AI-powered summary
                of your uploaded PDF.
              </p>

              <button
                className="generate-analysis-btn"
                onClick={handleSummary}
              >
                Generate Summary
              </button>

            </div>
          )}


        {/* ====================================
            FUTURE FEATURES
        ===================================== */}

        {activeTab === "topics" && (

          <div className="analysis-empty">

            <div className="analysis-empty-icon">
              🔑
            </div>

            <h3>
              Key Topics
            </h3>

            <p>
              Key topic extraction will be
              available soon.
            </p>

          </div>
        )}


        {activeTab === "sections" && (

          <div className="analysis-empty">

            <div className="analysis-empty-icon">
              📑
            </div>

            <h3>
              Document Sections
            </h3>

            <p>
              Automatic section detection will
              be available soon.
            </p>

          </div>
        )}


        {activeTab === "interview" && (

          <div className="analysis-empty">

            <div className="analysis-empty-icon">
              💡
            </div>

            <h3>
              Interview Questions
            </h3>

            <p>
              AI-generated interview questions
              will be available soon.
            </p>

          </div>
        )}

      </div>

    </section>
  );
}

export default DocumentIntelligence;