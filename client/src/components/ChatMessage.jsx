function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={`message-row ${
        isUser ? "user-message" : "assistant-message"
      }`}
    >

      <div className="message-avatar">
        {isUser ? "You" : "AI"}
      </div>

      <div className="message-content">

        <div className="message-name">
          {isUser ? "You" : "AI Assistant"}
        </div>

        <div className="message-text">
          {message.content}
        </div>

      </div>

    </div>
  );
}

export default ChatMessage;