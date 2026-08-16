function Sidebar({
  document,
  documents = [],
  onSelectDocument,
  onQuickQuestion,
  onClearChat,
}) {
  const quickQuestions = [
    "What is this document about?",
    "Summarize the main topics.",
    "What are the important concepts?",
  ];

  return (
    <aside className="sidebar">

      {/* =====================================
          DOCUMENT
      ====================================== */}

      <div className="sidebar-document">

        {document ? (
          <>
            <div className="sidebar-file-icon">
              📄
            </div>

            <div className="sidebar-file-info">

              <strong>
                {document.filename}
              </strong>

              <span>
                {document.total_pages} pages
              </span>

            </div>
          </>
        ) : (
          <div className="no-document">
            No document uploaded
          </div>
        )}

      </div>

      {documents.length > 0 && (
        <div className="document-list">
          <h3>DOCUMENTS</h3>
          {documents.map((item) => (
            <button key={item.filename} className={`document-select ${item.filename === document?.filename ? "active" : ""}`} onClick={() => onSelectDocument?.(item)}>
              📄 {item.filename}
            </button>
          ))}
        </div>
      )}


      {/* =====================================
          QUICK QUESTIONS
      ====================================== */}

      <div className="quick-questions">

        <h3>
          QUICK QUESTIONS
        </h3>

        {quickQuestions.map((question, index) => (
          <button
            key={index}
            className="quick-question"
            onClick={() => onQuickQuestion(question)}
            disabled={!document}
          >
            {question}
          </button>
        ))}

      </div>


      {/* =====================================
          CLEAR CHAT
      ====================================== */}

      <button
        className="sidebar-clear"
        onClick={onClearChat}
      >
        Clear Chat
      </button>

    </aside>
  );
}

export default Sidebar;
