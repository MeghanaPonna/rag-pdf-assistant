function SourceList({ sources }) {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="sources-container">

      <h4>Sources</h4>

      <div className="source-list">

        {sources.map((source, index) => (
          <div
            className="source-item"
            key={index}
          >

            <span className="source-icon">
              PDF
            </span>

            <div>
              <strong>
                {source.source || "Document"}
              </strong>

              <span>
                Page {source.page ?? "Unknown"}
              </span>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default SourceList;