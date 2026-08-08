// // // // // // // import { useState } from "react";
// // // // // // // import { askQuestion } from "../services/api";
// // // // // // // import ChatMessage from "./ChatMessage";
// // // // // // // import SourceList from "./SourceList";

// // // // // // // function ChatWindow({ uploadedFile }) {

// // // // // // //   const [question, setQuestion] = useState("");

// // // // // // //   const [messages, setMessages] = useState([]);

// // // // // // //   const [sources, setSources] = useState([]);

// // // // // // //   const [loading, setLoading] = useState(false);

// // // // // // //   const handleAsk = async () => {

// // // // // // //     const trimmedQuestion = question.trim();

// // // // // // //     if (!trimmedQuestion) {
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (!uploadedFile) {
// // // // // // //       setMessages((previous) => [
// // // // // // //         ...previous,
// // // // // // //         {
// // // // // // //           role: "assistant",
// // // // // // //           content:
// // // // // // //             "Please upload a PDF before asking a question.",
// // // // // // //         },
// // // // // // //       ]);

// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const userMessage = {
// // // // // // //       role: "user",
// // // // // // //       content: trimmedQuestion,
// // // // // // //     };

// // // // // // //     setMessages((previous) => [
// // // // // // //       ...previous,
// // // // // // //       userMessage,
// // // // // // //     ]);

// // // // // // //     setQuestion("");
// // // // // // //     setLoading(true);
// // // // // // //     setSources([]);

// // // // // // //     try {

// // // // // // //       const result = await askQuestion(
// // // // // // //         trimmedQuestion
// // // // // // //       );

// // // // // // //       const assistantMessage = {
// // // // // // //         role: "assistant",
// // // // // // //         content:
// // // // // // //           result.answer ||
// // // // // // //           "No answer was generated.",
// // // // // // //       };

// // // // // // //       setMessages((previous) => [
// // // // // // //         ...previous,
// // // // // // //         assistantMessage,
// // // // // // //       ]);

// // // // // // //       setSources(result.sources || []);

// // // // // // //     } catch (error) {

// // // // // // //       console.error("Chat error:", error);

// // // // // // //       setMessages((previous) => [
// // // // // // //         ...previous,
// // // // // // //         {
// // // // // // //           role: "assistant",
// // // // // // //           content:
// // // // // // //             "Sorry, something went wrong while processing your question.",
// // // // // // //         },
// // // // // // //       ]);

// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleKeyDown = (event) => {

// // // // // // //     if (
// // // // // // //       event.key === "Enter" &&
// // // // // // //       !event.shiftKey
// // // // // // //     ) {
// // // // // // //       event.preventDefault();

// // // // // // //       handleAsk();
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <section className="chat-section">

// // // // // // //       <div className="chat-header">

// // // // // // //         <div>
// // // // // // //           <h2>Ask Your Document</h2>

// // // // // // //           <p>
// // // // // // //             Ask questions based on your uploaded PDF.
// // // // // // //           </p>
// // // // // // //         </div>

// // // // // // //         {uploadedFile && (
// // // // // // //           <div className="active-document">
// // // // // // //             {uploadedFile.filename}
// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //       </div>

// // // // // // //       <div className="chat-messages">

// // // // // // //         {messages.length === 0 && (
// // // // // // //           <div className="chat-empty">

// // // // // // //             <div className="chat-empty-icon">
// // // // // // //               AI
// // // // // // //             </div>

// // // // // // //             <h3>
// // // // // // //               Ask anything about your document
// // // // // // //             </h3>

// // // // // // //             <p>
// // // // // // //               Upload a PDF and ask questions.
// // // // // // //               The AI will answer using the
// // // // // // //               information retrieved from your document.
// // // // // // //             </p>

// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //         {messages.map((message, index) => (
// // // // // // //           <ChatMessage
// // // // // // //             key={index}
// // // // // // //             message={message}
// // // // // // //           />
// // // // // // //         ))}

// // // // // // //         {loading && (
// // // // // // //           <div className="message-row assistant-message">

// // // // // // //             <div className="message-avatar">
// // // // // // //               AI
// // // // // // //             </div>

// // // // // // //             <div className="message-content">

// // // // // // //               <div className="message-name">
// // // // // // //                 AI Assistant
// // // // // // //               </div>

// // // // // // //               <div className="typing">
// // // // // // //                 <span></span>
// // // // // // //                 <span></span>
// // // // // // //                 <span></span>
// // // // // // //               </div>

// // // // // // //             </div>

// // // // // // //           </div>
// // // // // // //         )}

// // // // // // //       </div>

// // // // // // //       <SourceList sources={sources} />

// // // // // // //       <div className="chat-input-area">

// // // // // // //         <textarea
// // // // // // //           value={question}
// // // // // // //           onChange={(event) =>
// // // // // // //             setQuestion(event.target.value)
// // // // // // //           }
// // // // // // //           onKeyDown={handleKeyDown}
// // // // // // //           placeholder={
// // // // // // //             uploadedFile
// // // // // // //               ? "Ask a question about your document..."
// // // // // // //               : "Upload a PDF first..."
// // // // // // //           }
// // // // // // //           disabled={loading || !uploadedFile}
// // // // // // //           rows={1}
// // // // // // //         />

// // // // // // //         <button
// // // // // // //           onClick={handleAsk}
// // // // // // //           disabled={
// // // // // // //             loading ||
// // // // // // //             !question.trim() ||
// // // // // // //             !uploadedFile
// // // // // // //           }
// // // // // // //         >
// // // // // // //           {loading ? "..." : "Send"}
// // // // // // //         </button>

// // // // // // //       </div>

// // // // // // //       <p className="input-hint">
// // // // // // //         Press Enter to send • Shift + Enter for a new line
// // // // // // //       </p>

// // // // // // //     </section>
// // // // // // //   );
// // // // // // // }

// // // // // // // export default ChatWindow;



// // // // // // import { useState } from "react";
// // // // // // import { askQuestion } from "../api";

// // // // // // function ChatWindow() {
// // // // // //   const [question, setQuestion] = useState("");
// // // // // //   const [messages, setMessages] = useState([]);
// // // // // //   const [loading, setLoading] = useState(false);

// // // // // //   const handleAsk = async () => {
// // // // // //     if (!question.trim()) return;

// // // // // //     const userQuestion = question.trim();

// // // // // //     setMessages((previous) => [
// // // // // //       ...previous,
// // // // // //       {
// // // // // //         role: "user",
// // // // // //         content: userQuestion,
// // // // // //       },
// // // // // //     ]);

// // // // // //     setQuestion("");
// // // // // //     setLoading(true);

// // // // // //     try {
// // // // // //       const result = await askQuestion(userQuestion);

// // // // // //       setMessages((previous) => [
// // // // // //         ...previous,
// // // // // //         {
// // // // // //           role: "assistant",
// // // // // //           content: result.answer,
// // // // // //           sources: result.sources,
// // // // // //         },
// // // // // //       ]);
// // // // // //     } catch (error) {
// // // // // //       setMessages((previous) => [
// // // // // //         ...previous,
// // // // // //         {
// // // // // //           role: "assistant",
// // // // // //           content: `Error: ${error.message}`,
// // // // // //         },
// // // // // //       ]);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleKeyDown = (event) => {
// // // // // //     if (event.key === "Enter" && !event.shiftKey) {
// // // // // //       event.preventDefault();
// // // // // //       handleAsk();
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="chat-window">

// // // // // //       <div className="messages">

// // // // // //         {messages.length === 0 && (
// // // // // //           <div className="empty-chat">
// // // // // //             <div className="ai-icon">
// // // // // //               AI
// // // // // //             </div>

// // // // // //             <h3>
// // // // // //               Ask questions about your document
// // // // // //             </h3>

// // // // // //             <p>
// // // // // //               Upload a PDF and start chatting with your document.
// // // // // //             </p>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {messages.map((message, index) => (
// // // // // //           <div
// // // // // //             key={index}
// // // // // //             className={`message ${message.role}`}
// // // // // //           >

// // // // // //             <div className="message-content">
// // // // // //               {message.content}
// // // // // //             </div>

// // // // // //             {message.sources &&
// // // // // //               message.sources.length > 0 && (
// // // // // //                 <div className="sources">

// // // // // //                   <strong>Sources</strong>

// // // // // //                   {message.sources.map((source, sourceIndex) => (
// // // // // //                     <span key={sourceIndex}>
// // // // // //                       Page {source.page}
// // // // // //                     </span>
// // // // // //                   ))}

// // // // // //                 </div>
// // // // // //               )}

// // // // // //           </div>
// // // // // //         ))}

// // // // // //         {loading && (
// // // // // //           <div className="message assistant">
// // // // // //             <div className="message-content">
// // // // // //               Thinking...
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //       </div>

// // // // // //       <div className="chat-input">

// // // // // //         <textarea
// // // // // //           value={question}
// // // // // //           onChange={(event) =>
// // // // // //             setQuestion(event.target.value)
// // // // // //           }
// // // // // //           onKeyDown={handleKeyDown}
// // // // // //           placeholder="Ask something about your PDF..."
// // // // // //           rows={2}
// // // // // //         />

// // // // // //         <button
// // // // // //           onClick={handleAsk}
// // // // // //           disabled={loading || !question.trim()}
// // // // // //         >
// // // // // //           {loading ? "..." : "Send"}
// // // // // //         </button>

// // // // // //       </div>

// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default ChatWindow;



// // // // // import { useState } from "react";
// // // // // import { askQuestion } from "../api";

// // // // // function ChatWindow({ document }) {
// // // // //   const [question, setQuestion] = useState("");
// // // // //   const [messages, setMessages] = useState([]);
// // // // //   const [loading, setLoading] = useState(false);

// // // // //   const handleAsk = async () => {
// // // // //     if (!question.trim()) return;

// // // // //     if (!document) {
// // // // //       setMessages((previous) => [
// // // // //         ...previous,
// // // // //         {
// // // // //           role: "assistant",
// // // // //           content: "Please upload a PDF before asking a question.",
// // // // //         },
// // // // //       ]);
// // // // //       return;
// // // // //     }

// // // // //     const userQuestion = question.trim();

// // // // //     // Add user message
// // // // //     setMessages((previous) => [
// // // // //       ...previous,
// // // // //       {
// // // // //         role: "user",
// // // // //         content: userQuestion,
// // // // //       },
// // // // //     ]);

// // // // //     setQuestion("");
// // // // //     setLoading(true);

// // // // //     try {
// // // // //       // Send question + selected PDF filename
// // // // //       const result = await askQuestion(
// // // // //         userQuestion,
// // // // //         document.filename
// // // // //       );

// // // // //       // Add AI response
// // // // //       setMessages((previous) => [
// // // // //         ...previous,
// // // // //         {
// // // // //           role: "assistant",
// // // // //           content: result.answer,
// // // // //           sources: result.sources || [],
// // // // //         },
// // // // //       ]);
// // // // //     } catch (error) {
// // // // //       console.error("Chat error:", error);

// // // // //       setMessages((previous) => [
// // // // //         ...previous,
// // // // //         {
// // // // //           role: "assistant",
// // // // //           content:
// // // // //             error.message ||
// // // // //             "Something went wrong while processing your question.",
// // // // //         },
// // // // //       ]);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const handleKeyDown = (event) => {
// // // // //     // Enter = send
// // // // //     // Shift + Enter = new line
// // // // //     if (event.key === "Enter" && !event.shiftKey) {
// // // // //       event.preventDefault();
// // // // //       handleAsk();
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="chat-window">

// // // // //       {/* =========================
// // // // //           MESSAGES
// // // // //       ========================== */}

// // // // //       <div className="messages">

// // // // //         {/* Empty state */}
// // // // //         {messages.length === 0 && (
// // // // //           <div className="empty-chat">

// // // // //             <div className="ai-icon">
// // // // //               AI
// // // // //             </div>

// // // // //             <h3>
// // // // //               Ask questions about your document
// // // // //             </h3>

// // // // //             <p>
// // // // //               {document
// // // // //                 ? `Ask anything about ${document.filename}`
// // // // //                 : "Upload a PDF and start chatting with your document."}
// // // // //             </p>

// // // // //           </div>
// // // // //         )}

// // // // //         {/* Messages */}
// // // // //         {messages.map((message, index) => (
// // // // //           <div
// // // // //             key={index}
// // // // //             className={`message ${message.role}`}
// // // // //           >

// // // // //             <div className="message-content">
// // // // //               {message.content}
// // // // //             </div>

// // // // //             {/* Sources */}
// // // // //             {message.role === "assistant" &&
// // // // //               message.sources &&
// // // // //               message.sources.length > 0 && (
// // // // //                 <div className="sources">

// // // // //                   <strong>
// // // // //                     Sources
// // // // //                   </strong>

// // // // //                   {message.sources.map(
// // // // //                     (source, sourceIndex) => (
// // // // //                       <span
// // // // //                         key={sourceIndex}
// // // // //                         className="source-badge"
// // // // //                       >
// // // // //                         Page {source.page}
// // // // //                       </span>
// // // // //                     )
// // // // //                   )}

// // // // //                 </div>
// // // // //               )}

// // // // //           </div>
// // // // //         ))}

// // // // //         {/* Loading */}
// // // // //         {loading && (
// // // // //           <div className="message assistant">

// // // // //             <div className="message-content">
// // // // //               Thinking...
// // // // //             </div>

// // // // //           </div>
// // // // //         )}

// // // // //       </div>


// // // // //       {/* =========================
// // // // //           INPUT
// // // // //       ========================== */}

// // // // //       <div className="chat-input">

// // // // //         <textarea
// // // // //           value={question}
// // // // //           onChange={(event) =>
// // // // //             setQuestion(event.target.value)
// // // // //           }
// // // // //           onKeyDown={handleKeyDown}
// // // // //           placeholder={
// // // // //             document
// // // // //               ? "Ask something about your PDF..."
// // // // //               : "Upload a PDF first..."
// // // // //           }
// // // // //           rows={2}
// // // // //           disabled={!document || loading}
// // // // //         />

// // // // //         <button
// // // // //           onClick={handleAsk}
// // // // //           disabled={
// // // // //             !document ||
// // // // //             loading ||
// // // // //             !question.trim()
// // // // //           }
// // // // //         >
// // // // //           {loading ? "..." : "Send"}
// // // // //         </button>

// // // // //       </div>

// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default ChatWindow;


// // // // import { useState } from "react";
// // // // import { askQuestion } from "../services/api";

// // // // function ChatWindow({ document }) {
// // // //   const [question, setQuestion] = useState("");
// // // //   const [messages, setMessages] = useState([]);
// // // //   const [loading, setLoading] = useState(false);

// // // //   // ================================
// // // //   // ASK QUESTION
// // // //   // ================================

// // // //   const handleAsk = async () => {
// // // //     if (!question.trim()) return;

// // // //     // Don't allow chat before PDF upload
// // // //     if (!document) {
// // // //       setMessages((previous) => [
// // // //         ...previous,
// // // //         {
// // // //           role: "assistant",
// // // //           content: "Please upload a PDF before asking a question.",
// // // //         },
// // // //       ]);

// // // //       return;
// // // //     }

// // // //     const userQuestion = question.trim();

// // // //     // Add user message
// // // //     setMessages((previous) => [
// // // //       ...previous,
// // // //       {
// // // //         role: "user",
// // // //         content: userQuestion,
// // // //       },
// // // //     ]);

// // // //     // Clear input
// // // //     setQuestion("");

// // // //     // Show loading
// // // //     setLoading(true);

// // // //     try {
// // // //       // Your current backend accepts only:
// // // //       // { "question": "..." }
// // // //       const result = await askQuestion(userQuestion);

// // // //       // Add AI response
// // // //       setMessages((previous) => [
// // // //         ...previous,
// // // //         {
// // // //           role: "assistant",
// // // //           content: result.answer,
// // // //           sources: result.sources || [],
// // // //         },
// // // //       ]);
// // // //     } catch (error) {
// // // //       console.error("Chat error:", error);

// // // //       setMessages((previous) => [
// // // //         ...previous,
// // // //         {
// // // //           role: "assistant",
// // // //           content:
// // // //             error.message ||
// // // //             "Something went wrong while processing your question.",
// // // //         },
// // // //       ]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // ================================
// // // //   // ENTER KEY
// // // //   // ================================

// // // //   const handleKeyDown = (event) => {
// // // //     // Enter = Send
// // // //     // Shift + Enter = New line
// // // //     if (event.key === "Enter" && !event.shiftKey) {
// // // //       event.preventDefault();
// // // //       handleAsk();
// // // //     }
// // // //   };

// // // //   // ================================
// // // //   // UI
// // // //   // ================================

// // // //   return (
// // // //     <div className="chat-window">

// // // //       {/* =========================
// // // //           MESSAGES
// // // //       ========================== */}

// // // //       <div className="messages">

// // // //         {/* Empty Chat */}
// // // //         {messages.length === 0 && (
// // // //           <div className="empty-chat">

// // // //             <div className="ai-icon">
// // // //               AI
// // // //             </div>

// // // //             <h3>
// // // //               Ask questions about your document
// // // //             </h3>

// // // //             <p>
// // // //               {document
// // // //                 ? `Ask anything about ${document.filename}`
// // // //                 : "Upload a PDF and start chatting with your document."}
// // // //             </p>

// // // //           </div>
// // // //         )}

// // // //         {/* =========================
// // // //             CHAT MESSAGES
// // // //         ========================== */}

// // // //         {messages.map((message, index) => (
// // // //           <div
// // // //             key={index}
// // // //             className={`message ${message.role}`}
// // // //           >

// // // //             <div className="message-content">
// // // //               {message.content}
// // // //             </div>

// // // //             {/* =========================
// // // //                 SOURCES
// // // //             ========================== */}

// // // //             {message.role === "assistant" &&
// // // //               message.sources &&
// // // //               message.sources.length > 0 && (
// // // //                 <div className="sources">

// // // //                   <strong>
// // // //                     Sources
// // // //                   </strong>

// // // //                   {message.sources.map(
// // // //                     (source, sourceIndex) => (
// // // //                       <span
// // // //                         key={sourceIndex}
// // // //                         className="source-badge"
// // // //                       >
// // // //                         Page {source.page}
// // // //                       </span>
// // // //                     )
// // // //                   )}

// // // //                 </div>
// // // //               )}

// // // //           </div>
// // // //         ))}

// // // //         {/* =========================
// // // //             LOADING
// // // //         ========================== */}

// // // //         {loading && (
// // // //           <div className="message assistant">

// // // //             <div className="message-content">
// // // //               Thinking...
// // // //             </div>

// // // //           </div>
// // // //         )}

// // // //       </div>


// // // //       {/* =========================
// // // //           CHAT INPUT
// // // //       ========================== */}

// // // //       <div className="chat-input">

// // // //         <textarea
// // // //           value={question}
// // // //           onChange={(event) => {
// // // //             setQuestion(event.target.value);
// // // //           }}
// // // //           onKeyDown={handleKeyDown}
// // // //           placeholder={
// // // //             document
// // // //               ? "Ask something about your PDF..."
// // // //               : "Upload a PDF first..."
// // // //           }
// // // //           rows={2}
// // // //           disabled={!document || loading}
// // // //         />

// // // //         <button
// // // //           onClick={handleAsk}
// // // //           disabled={
// // // //             !document ||
// // // //             loading ||
// // // //             !question.trim()
// // // //           }
// // // //         >
// // // //           {loading ? "..." : "Send"}
// // // //         </button>

// // // //       </div>

// // // //     </div>
// // // //   );
// // // // }

// // // // export default ChatWindow;






// // // // import { useState } from "react";
// // // import { useEffect, useRef, useState } from "react";
// // // import { askQuestion } from "../services/api";
// // // import ReactMarkdown from "react-markdown";

// // // function ChatWindow({ document }) {
// // //   const [question, setQuestion] = useState("");
// // //   const [messages, setMessages] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   // ==========================================
// // //   // ASK QUESTION
// // //   // ==========================================

// // //   const handleAsk = async () => {
// // //     if (!question.trim()) return;

// // //     if (!document) {
// // //       setMessages((previous) => [
// // //         ...previous,
// // //         {
// // //           role: "assistant",
// // //           content: "Please upload a PDF before asking a question.",
// // //         },
// // //       ]);

// // //       return;
// // //     }

// // //     const userQuestion = question.trim();

// // //     // Add user message
// // //     setMessages((previous) => [
// // //       ...previous,
// // //       {
// // //         role: "user",
// // //         content: userQuestion,
// // //       },
// // //     ]);

// // //     setQuestion("");
// // //     setLoading(true);

// // //     try {
// // //       console.log("Sending question:", userQuestion);

// // //       const result = await askQuestion(userQuestion);

// // //       console.log("Received result:", result);

// // //       // Make sure answer is always displayable
// // //       let answer = result.answer;

// // //       if (typeof answer !== "string") {
// // //         answer = JSON.stringify(answer, null, 2);
// // //       }

// // //       setMessages((previous) => [
// // //         ...previous,
// // //         {
// // //           role: "assistant",
// // //           content: answer,
// // //           sources: result.sources || [],
// // //         },
// // //       ]);

// // //     } catch (error) {
// // //       console.error("Chat error:", error);

// // //       setMessages((previous) => [
// // //         ...previous,
// // //         {
// // //           role: "assistant",
// // //           content:
// // //             error.message ||
// // //             "Something went wrong while processing your question.",
// // //         },
// // //       ]);

// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ==========================================
// // //   // ENTER KEY
// // //   // ==========================================

// // //   const handleKeyDown = (event) => {
// // //     if (event.key === "Enter" && !event.shiftKey) {
// // //       event.preventDefault();
// // //       handleAsk();
// // //     }
// // //   };

// // //   // ==========================================
// // //   // UI
// // //   // ==========================================

// // //   return (
// // //     <div className="chat-window">

// // //       {/* =========================
// // //           MESSAGES
// // //       ========================== */}

// // //       <div className="messages">

// // //         {/* Empty State */}

// // //         {messages.length === 0 && (
// // //           <div className="empty-chat">

// // //             <div className="ai-icon">
// // //               AI
// // //             </div>

// // //             <h3>
// // //               Ask questions about your document
// // //             </h3>

// // //             <p>
// // //               {document
// // //                 ? `Ask anything about ${document.filename}`
// // //                 : "Upload a PDF and start chatting with your document."}
// // //             </p>

// // //           </div>
// // //         )}

// // //         {/* Messages */}

// // //         {messages.map((message, index) => (
// // //           <div
// // //             key={index}
// // //             className={`message ${message.role}`}
// // //           >

// // //             {/* <div className="message-content">
// // //               {message.content}
// // //             </div> */}
// // //             <div className="message-content">
// // //                 {message.role === "assistant" ? (
// // //                     <ReactMarkdown>
// // //                     {message.content}
// // //                     </ReactMarkdown>
// // //                 ) : (
// // //                     message.content
// // //                 )}
// // //             </div>

// // //             {/* Sources */}

// // //             {message.role === "assistant" &&
// // //               message.sources &&
// // //               message.sources.length > 0 && (

// // //                 <div className="sources">

// // //                   <strong>
// // //                     Sources
// // //                   </strong>

// // //                   {/* {message.sources.map(
// // //                     (source, sourceIndex) => (

// // //                       <span
// // //                         key={sourceIndex}
// // //                         className="source-badge"
// // //                       >
// // //                         Page {source.page}
// // //                       </span>

// // //                     )
// // //                   )} */}
// // //                   {/* {message.sources.map((source, sourceIndex) => (
// // //                     <span
// // //                         key={sourceIndex}
// // //                         className="source-badge"
// // //                     >
// // //                         📄 Page {source.page}
// // //                     </span>
// // //                  ))} */}
// // //                  {message.role === "assistant" &&
// // //                 message.sources &&
// // //                 message.sources.length > 0 && (
// // //                     <div className="sources">

// // //                     <strong>
// // //                         Sources
// // //                     </strong>

// // //                     {[
// // //                         ...new Map(
// // //                         message.sources.map((source) => [
// // //                             source.page,
// // //                             source,
// // //                         ])
// // //                         ).values(),
// // //                     ].map((source, sourceIndex) => (
// // //                         <span
// // //                         key={sourceIndex}
// // //                         className="source-badge"
// // //                         >
// // //                         📄 Page {source.page}
// // //                         </span>
// // //                     ))}

// // //                     </div>
// // //                 )}

// // //                 </div>

// // //               )}

// // //           </div>
// // //         ))}

// // //         {/* Loading */}

// // //         {/* {loading && (
// // //           <div className="message assistant">

// // //             <div className="message-content">
// // //               Thinking...
// // //             </div>

// // //           </div>
// // //         )} */}
// // //         {loading && (
// // //         <div className="message assistant">
// // //             <div className="message-content typing">
// // //             <span></span>
// // //             <span></span>
// // //             <span></span>
// // //             </div>
// // //         </div>
// // //         )}

// // //       </div>

// // //       {/* =========================
// // //           INPUT
// // //       ========================== */}

// // //       <div className="chat-input">

// // //         <textarea
// // //           value={question}
// // //           onChange={(event) =>
// // //             setQuestion(event.target.value)
// // //           }
// // //           onKeyDown={handleKeyDown}
// // //           placeholder={
// // //             document
// // //               ? "Ask something about your PDF..."
// // //               : "Upload a PDF first..."
// // //           }
// // //           rows={2}
// // //           disabled={!document || loading}
// // //         />

// // //         <button
// // //           onClick={handleAsk}
// // //           disabled={
// // //             !document ||
// // //             loading ||
// // //             !question.trim()
// // //           }
// // //         >
// // //           {loading ? "..." : "Send"}
// // //         </button>

// // //       </div>

// // //     </div>
// // //   );
// // // }

// // // export default ChatWindow;




// // import { useEffect, useRef, useState } from "react";
// // import { askQuestion } from "../services/api";
// // import ReactMarkdown from "react-markdown";

// // function ChatWindow({ document }) {
// //   const [question, setQuestion] = useState("");
// //   const [messages, setMessages] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // ==========================================
// //   // AUTO SCROLL
// //   // ==========================================

// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({
// //       behavior: "smooth",
// //     });
// //   }, [messages, loading]);

// //   // ==========================================
// //   // ASK QUESTION
// //   // ==========================================

// //   const handleAsk = async () => {
// //     if (!question.trim()) return;

// //     // Check whether PDF is uploaded
// //     if (!document) {
// //       setMessages((previous) => [
// //         ...previous,
// //         {
// //           role: "assistant",
// //           content: "Please upload a PDF before asking a question.",
// //           sources: [],
// //         },
// //       ]);

// //       return;
// //     }

// //     const userQuestion = question.trim();

// //     // Add user's question
// //     setMessages((previous) => [
// //       ...previous,
// //       {
// //         role: "user",
// //         content: userQuestion,
// //         sources: [],
// //       },
// //     ]);

// //     // Clear input
// //     setQuestion("");

// //     // Start loading
// //     setLoading(true);

// //     try {
// //       console.log("Sending question:", userQuestion);

// //       // Call backend API
// //       const result = await askQuestion(userQuestion);

// //       console.log("Received result:", result);

// //       // ==========================================
// //       // PROCESS ANSWER
// //       // ==========================================

// //       let answer = result?.answer;

// //       if (answer === undefined || answer === null) {
// //         answer = "No answer was returned from the server.";
// //       }

// //       // Make sure ReactMarkdown receives a string
// //       if (typeof answer !== "string") {
// //         answer = JSON.stringify(answer, null, 2);
// //       }

// //       // ==========================================
// //       // PROCESS SOURCES
// //       // ==========================================

// //       const sources = Array.isArray(result?.sources)
// //         ? result.sources
// //         : [];

// //       // Add AI response
// //       setMessages((previous) => [
// //         ...previous,
// //         {
// //           role: "assistant",
// //           content: answer,
// //           sources: sources,
// //         },
// //       ]);
// //     } catch (error) {
// //       console.error("Chat error:", error);

// //       setMessages((previous) => [
// //         ...previous,
// //         {
// //           role: "assistant",
// //           content:
// //             error.message ||
// //             "Something went wrong while processing your question.",
// //           sources: [],
// //         },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ==========================================
// //   // ENTER KEY
// //   // ==========================================

// //   const handleKeyDown = (event) => {
// //     // Enter = Send
// //     // Shift + Enter = New line

// //     if (event.key === "Enter" && !event.shiftKey) {
// //       event.preventDefault();
// //       handleAsk();
// //     }
// //   };

// //   // ==========================================
// //   // UI
// //   // ==========================================

// //   return (
// //     <div className="chat-window">

// //       {/* =====================================
// //           MESSAGES
// //       ====================================== */}

// //       <div className="messages">

// //         {/* =====================================
// //             EMPTY STATE
// //         ====================================== */}

// //         {messages.length === 0 && (
// //           <div className="empty-chat">

// //             <div className="ai-icon">
// //               AI
// //             </div>

// //             <h3>
// //               Ask questions about your document
// //             </h3>

// //             <p>
// //               {document
// //                 ? `Ask anything about ${document.filename}`
// //                 : "Upload a PDF and start chatting with your document."}
// //             </p>

// //           </div>
// //         )}

// //         {/* =====================================
// //             CHAT MESSAGES
// //         ====================================== */}

// //         {messages.map((message, index) => (
// //           <div
// //             key={index}
// //             className={`message ${message.role}`}
// //           >

// //             {/* =================================
// //                 MESSAGE CONTENT
// //             ================================== */}

// //             <div className="message-content">

// //               {message.role === "assistant" ? (
// //                 <ReactMarkdown>
// //                   {message.content}
// //                 </ReactMarkdown>
// //               ) : (
// //                 message.content
// //               )}

// //             </div>

// //             {/* =================================
// //                 SOURCES
// //             ================================== */}

// //             {message.role === "assistant" &&
// //               message.sources &&
// //               message.sources.length > 0 && (
// //                 <div className="sources">

// //                   <strong>
// //                     Sources
// //                   </strong>

// //                   {[
// //                     ...new Map(
// //                       message.sources.map((source) => [
// //                         source.page,
// //                         source,
// //                       ])
// //                     ).values(),
// //                   ].map((source, sourceIndex) => (
// //                     <span
// //                       key={sourceIndex}
// //                       className="source-badge"
// //                     >
// //                       📄 Page {source.page}
// //                     </span>
// //                   ))}

// //                 </div>
// //               )}

// //           </div>
// //         ))}

// //         {/* =====================================
// //             LOADING / TYPING INDICATOR
// //         ====================================== */}

// //         {loading && (
// //           <div className="message assistant">

// //             <div className="message-content typing">

// //               <span></span>
// //               <span></span>
// //               <span></span>

// //             </div>

// //           </div>
// //         )}

// //         {/* =====================================
// //             AUTO SCROLL TARGET
// //         ====================================== */}

// //         <div ref={messagesEndRef} />

// //       </div>

// //       {/* =====================================
// //           CHAT INPUT
// //       ====================================== */}

// //       <div className="chat-input">

// //         <textarea
// //           value={question}
// //           onChange={(event) =>
// //             setQuestion(event.target.value)
// //           }
// //           onKeyDown={handleKeyDown}
// //           placeholder={
// //             document
// //               ? "Ask something about your PDF..."
// //               : "Upload a PDF first..."
// //           }
// //           rows={2}
// //           disabled={!document || loading}
// //         />

// //         <button
// //           onClick={handleAsk}
// //           disabled={
// //             !document ||
// //             loading ||
// //             !question.trim()
// //           }
// //         >
// //           {loading ? "..." : "Send"}
// //         </button>

// //       </div>

// //     </div>
// //   );
// // }

// // export default ChatWindow;



// import { useEffect, useRef, useState } from "react";
// import { askQuestion } from "../services/api";
// import ReactMarkdown from "react-markdown";

// function ChatWindow({
//   document,
//   quickQuestion,
//   onQuickQuestionHandled,
// }) {
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ==========================================
//   // AUTO SCROLL
//   // ==========================================

// useEffect(() => {
//   if (!quickQuestion) return;

//   setQuestion(quickQuestion);

//   onQuickQuestionHandled?.();

//   // Small delay so React updates the state
//   // before sending the question
//   setTimeout(() => {
//     handleAsk(quickQuestion);
//   }, 0);
// }, [quickQuestion]);

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({
//       behavior: "smooth",
//     });
//   }, [messages, loading]);

//   // ==========================================
//   // ASK QUESTION
//   // ==========================================

// //   const handleAsk = async () => {
// //     const userQuestion = question.trim();
// const handleAsk = async (questionFromSidebar = null) => {
//   const userQuestion = (
//     questionFromSidebar || question
//   ).trim();

//     // Don't send empty questions
//     if (!userQuestion) {
//       return;
//     }

//     // ========================================
//     // CHECK PDF
//     // ========================================

//     if (!document) {
//       setMessages((previous) => [
//         ...previous,
//         {
//           role: "assistant",
//           content: "Please upload a PDF before asking a question.",
//           sources: [],
//         },
//       ]);

//       return;
//     }

//     // ========================================
//     // ADD USER MESSAGE
//     // ========================================

//     setMessages((previous) => [
//       ...previous,
//       {
//         role: "user",
//         content: userQuestion,
//         sources: [],
//       },
//     ]);

//     // Clear input
//     setQuestion("");

//     // Show loading
//     setLoading(true);

//     try {
//       console.log("Sending question:", userQuestion);

//       // ======================================
//       // CALL BACKEND
//       // ======================================

//     //   const result = await askQuestion(userQuestion);
//     const result = await askQuestion(
//         userQuestion,
//         document.filename
//     );

//       console.log("Received result:", result);

//       // ======================================
//       // PROCESS ANSWER
//       // ======================================

//       let answer = result?.answer;

//       if (answer === null || answer === undefined) {
//         answer = "No answer was returned from the server.";
//       }

//       // ReactMarkdown needs a string
//       if (typeof answer !== "string") {
//         answer = JSON.stringify(answer, null, 2);
//       }

//       // ======================================
//       // PROCESS SOURCES
//       // ======================================

//       const sources = Array.isArray(result?.sources)
//         ? result.sources
//         : [];

//       // ======================================
//       // ADD ASSISTANT MESSAGE
//       // ======================================

//       setMessages((previous) => [
//         ...previous,
//         {
//           role: "assistant",
//           content: answer,
//           sources,
//         },
//       ]);
//     } catch (error) {
//       console.error("Chat error:", error);

//       // ======================================
//       // ERROR MESSAGE
//       // ======================================

//       setMessages((previous) => [
//         ...previous,
//         {
//           role: "assistant",
//           content:
//             error?.message ||
//             "Something went wrong while processing your question.",
//           sources: [],
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ==========================================
//   // ENTER KEY
//   // ==========================================

//   const handleKeyDown = (event) => {
//     // Enter = Send
//     // Shift + Enter = New line

//     if (event.key === "Enter" && !event.shiftKey) {
//       event.preventDefault();

//       if (!loading) {
//         handleAsk();
//       }
//     }
//   };

//   // ==========================================
//   // CLEAR CHAT
//   // ==========================================

//   const handleClearChat = () => {
//     setMessages([]);
//     setQuestion("");
//   };

//   // ==========================================
//   // UNIQUE SOURCES
//   // ==========================================

//   const getUniqueSources = (sources) => {
//     if (!Array.isArray(sources)) {
//       return [];
//     }

//     const uniqueSources = new Map();

//     sources.forEach((source) => {
//       const page = source?.page;

//       if (page !== undefined && page !== null) {
//         if (!uniqueSources.has(page)) {
//           uniqueSources.set(page, source);
//         }
//       }
//     });

//     return Array.from(uniqueSources.values());
//   };

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="chat-window">

//       {/* =====================================
//           MESSAGES
//       ====================================== */}

//       <div className="messages">

//         {/* =====================================
//             EMPTY STATE
//         ====================================== */}

//         {messages.length === 0 && (
//           <div className="empty-chat">

//             <div className="ai-icon">
//               AI
//             </div>

//             <h3>
//               Ask questions about your document
//             </h3>

//             <p>
//               {document
//                 ? `Ask anything about ${document.filename}`
//                 : "Upload a PDF and start chatting with your document."}
//             </p>

//           </div>
//         )}

//         {/* =====================================
//             CHAT MESSAGES
//         ====================================== */}

//         {messages.map((message, index) => (
//           <div
//             key={index}
//             className={`message ${message.role}`}
//           >

//             {/* =================================
//                 MESSAGE CONTENT
//             ================================== */}

//             <div className="message-content">

//               {message.role === "assistant" ? (
//                 <ReactMarkdown>
//                   {message.content}
//                 </ReactMarkdown>
//               ) : (
//                 <p>{message.content}</p>
//               )}

//             </div>

//             {/* =================================
//                 SOURCES
//             ================================== */}

//             {message.role === "assistant" &&
//               message.sources?.length > 0 && (

//                 <div className="sources">

//                   <strong>
//                     Sources
//                   </strong>

//                   {getUniqueSources(message.sources).map(
//                     (source, sourceIndex) => (
//                       <span
//                         key={sourceIndex}
//                         className="source-badge"
//                       >
//                         📄 Page {source.page}
//                       </span>
//                     )
//                   )}

//                 </div>
//               )}

//           </div>
//         ))}

//         {/* =====================================
//             TYPING INDICATOR
//         ====================================== */}

//         {loading && (
//           <div className="message assistant">

//             <div className="message-content typing">

//               <span></span>
//               <span></span>
//               <span></span>

//             </div>

//           </div>
//         )}

//         {/* =====================================
//             AUTO SCROLL TARGET
//         ====================================== */}

//         <div ref={messagesEndRef} />

//       </div>

//       {/* =====================================
//           CHAT INPUT
//       ====================================== */}

//       <div className="chat-input">

//         <textarea
//           value={question}
//           onChange={(event) =>
//             setQuestion(event.target.value)
//           }
//           onKeyDown={handleKeyDown}
//           placeholder={
//             document
//               ? "Ask something about your PDF..."
//               : "Upload a PDF first..."
//           }
//           rows={2}
//           disabled={!document || loading}
//         />

//         <button
//           onClick={handleAsk}
//           disabled={
//             !document ||
//             loading ||
//             !question.trim()
//           }
//         >
//           {loading ? "..." : "Send"}
//         </button>

//       </div>

//       {/* =====================================
//           CLEAR CHAT
//       ====================================== */}

//       {/* {messages.length > 0 && (
//         <button
//           className="clear-chat"
//           onClick={handleClearChat}
//         >
//           Clear Chat
//         </button>
//       )} */}

//     </div>
//   );
// }

// export default ChatWindow;



import { useEffect, useRef, useState } from "react";
import { askQuestion } from "../services/api";
import ReactMarkdown from "react-markdown";

function ChatWindow({
  document,
  quickQuestion,
  onQuickQuestionHandled,
}) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // ==========================================
  // AUTO SCROLL
  // ==========================================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ==========================================
  // ASK QUESTION
  // Handles both:
  // 1. Typed questions
  // 2. Sidebar quick questions
  // ==========================================

  const handleAsk = async (questionFromSidebar = null) => {
    // Use sidebar question if provided,
    // otherwise use textarea question
    const userQuestion = (
      questionFromSidebar || question
    ).trim();

    // Don't send empty question
    if (!userQuestion) {
      return;
    }

    // ==========================================
    // CHECK DOCUMENT
    // ==========================================

    if (!document) {
      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            "Please upload a PDF before asking a question.",
          sources: [],
        },
      ]);

      return;
    }

    // ==========================================
    // ADD USER MESSAGE
    // ==========================================

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: userQuestion,
        sources: [],
      },
    ]);

    // Clear input
    setQuestion("");

    // Start loading
    setLoading(true);

    try {
      console.log("================================");
      console.log("Sending question:", userQuestion);
      console.log("Document:", document.filename);
      console.log("================================");

      // ==========================================
      // SEND QUESTION + PDF SOURCE
      // ==========================================

      const result = await askQuestion(
        userQuestion,
        document.filename
      );

      console.log("Received result:", result);

      // ==========================================
      // PROCESS ANSWER
      // ==========================================

      let answer = result?.answer;

      if (
        answer === null ||
        answer === undefined ||
        answer === ""
      ) {
        answer =
          "No answer was returned from the server.";
      }

      // ReactMarkdown requires string
      if (typeof answer !== "string") {
        answer = JSON.stringify(
          answer,
          null,
          2
        );
      }

      // ==========================================
      // PROCESS SOURCES
      // ==========================================

      const sources = Array.isArray(
        result?.sources
      )
        ? result.sources
        : [];

      // ==========================================
      // ADD ASSISTANT MESSAGE
      // ==========================================

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: answer,
          sources: sources,
        },
      ]);

    } catch (error) {
      console.error(
        "================================"
      );

      console.error(
        "Chat API Error:",
        error
      );

      console.error(
        "================================"
      );

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content:
            error?.message ||
            "Failed to process the question.",
          sources: [],
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // QUICK QUESTION
  // ==========================================

  useEffect(() => {
    if (!quickQuestion) {
      return;
    }

    // Send quick question
    handleAsk(quickQuestion);

    // Tell App that quick question
    // has been handled
    if (onQuickQuestionHandled) {
      onQuickQuestionHandled();
    }
  }, [quickQuestion]);

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (event) => {
    // Enter = Send
    // Shift + Enter = New line

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (!loading) {
        handleAsk();
      }
    }
  };

  // ==========================================
  // CLEAR CHAT
  // ==========================================

  const handleClearChat = () => {
    setMessages([]);
    setQuestion("");
  };

  // ==========================================
  // UNIQUE SOURCES
  // ==========================================

  const getUniqueSources = (sources) => {
    if (!Array.isArray(sources)) {
      return [];
    }

    const uniqueSources = new Map();

    sources.forEach((source) => {
      const page = source?.page;

      if (
        page !== undefined &&
        page !== null
      ) {
        if (!uniqueSources.has(page)) {
          uniqueSources.set(page, source);
        }
      }
    });

    return Array.from(
      uniqueSources.values()
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="chat-window">

      {/* ======================================
          MESSAGES
      ======================================= */}

      <div className="messages">

        {/* ====================================
            EMPTY STATE
        ===================================== */}

        {messages.length === 0 && (
          <div className="empty-chat">

            <div className="ai-icon">
              AI
            </div>

            <h3>
              Ask questions about your document
            </h3>

            <p>
              {document
                ? `Ask anything about ${document.filename}`
                : "Upload a PDF and start chatting with your document."}
            </p>

          </div>
        )}

        {/* ====================================
            CHAT MESSAGES
        ===================================== */}

        {messages.map(
          (message, index) => (
            <div
              key={index}
              className={`message ${message.role}`}
            >

              {/* ==================================
                  MESSAGE CONTENT
              =================================== */}

              <div className="message-content">

                {message.role ===
                "assistant" ? (
                  <ReactMarkdown>
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p>
                    {message.content}
                  </p>
                )}

              </div>

              {/* ==================================
                  SOURCES
              =================================== */}

              {message.role ===
                "assistant" &&
                message.sources?.length >
                  0 && (

                  <div className="sources">

                    <strong>
                      Sources
                    </strong>

                    {getUniqueSources(
                      message.sources
                    ).map(
                      (
                        source,
                        sourceIndex
                      ) => (
                        <span
                          key={
                            sourceIndex
                          }
                          className="source-badge"
                        >
                          📄 Page{" "}
                          {source.page}
                        </span>
                      )
                    )}

                  </div>
                )}

            </div>
          )
        )}

        {/* ====================================
            TYPING INDICATOR
        ===================================== */}

        {loading && (
          <div className="message assistant">

            <div className="message-content typing">

              <span></span>
              <span></span>
              <span></span>

            </div>

          </div>
        )}

        {/* ====================================
            AUTO SCROLL TARGET
        ===================================== */}

        <div
          ref={messagesEndRef}
        />

      </div>

      {/* ======================================
          CHAT INPUT
      ======================================= */}

      <div className="chat-input">

        <textarea
          value={question}
          onChange={(event) =>
            setQuestion(
              event.target.value
            )
          }
          onKeyDown={handleKeyDown}
          placeholder={
            document
              ? "Ask something about your PDF..."
              : "Upload a PDF first..."
          }
          rows={2}
          disabled={
            !document || loading
          }
        />

        <button
          onClick={() => handleAsk()}
          disabled={
            !document ||
            loading ||
            !question.trim()
          }
        >
          {loading
            ? "..."
            : "Send"}
        </button>

      </div>

      {/* ======================================
          CLEAR CHAT
      ======================================= */}

      {messages.length > 0 && (
        <button
          className="clear-chat"
          onClick={
            handleClearChat
          }
        >
          Clear Chat
        </button>
      )}

    </div>
  );
}

export default ChatWindow;