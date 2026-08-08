function Header() {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          AI
        </div>

        <div>
          <h1>Enterprise AI PDF Assistant</h1>
          <p>Intelligent document analysis powered by RAG</p>
        </div>
      </div>

      <div className="header-status">
        <span className="status-dot"></span>
        AI Online
      </div>
    </header>
  );
}

export default Header;