import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateInterviewQuestions, generateSummary, getKeyTopics, getSections } from "../services/api";

const actions = { summary: generateSummary, topics: getKeyTopics, sections: getSections, interview: generateInterviewQuestions };
const labels = { summary: "Summary", topics: "Key Topics", sections: "Sections", interview: "Interview Questions" };

function DocumentIntelligence({ document }) {
  const [activeTab, setActiveTab] = useState("summary");
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openAnswers, setOpenAnswers] = useState({});

  const load = async (tab, force = false) => {
    setActiveTab(tab); setError("");
    if (results[tab] && !force) return;
    setLoading(true);
    try {
      const response = await actions[tab](document.filename);
      setResults((current) => ({ ...current, [tab]: response }));
    }
    catch (err) { setError(err.message || "Unable to analyze this document."); }
    finally { setLoading(false); }
  };
  const result = results[activeTab];

  return <section className="document-intelligence">
    <div className="document-intelligence-header"><div><h2>Document Intelligence</h2><p>Grounded analysis for {document.filename}</p></div></div>
    <div className="analysis-tabs">{Object.keys(labels).map((tab) => <button key={tab} className={`analysis-tab ${activeTab === tab ? "active" : ""}`} onClick={() => load(tab)} disabled={loading}>{labels[tab]}</button>)}</div>
    <div className="analysis-content">
      {error && <div className="analysis-error"><strong>Unable to analyze document</strong><p>{error}</p><button className="generate-analysis-btn" onClick={() => load(activeTab, true)}>Try again</button></div>}
      {loading && <div className="analysis-loading"><div className="analysis-spinner"/><h3>Analyzing your document…</h3><p>This can take a moment for longer PDFs.</p></div>}
      {!loading && !error && !result && <div className="analysis-empty"><div className="analysis-empty-icon">✨</div><h3>{labels[activeTab]}</h3><p>Generate grounded {labels[activeTab].toLowerCase()} from this PDF.</p><button className="generate-analysis-btn" onClick={() => load(activeTab)}>Generate {labels[activeTab]}</button></div>}
      {!loading && result?.summary && <div className="analysis-result analysis-markdown"><ReactMarkdown>{result.summary}</ReactMarkdown></div>}
      {!loading && result?.topics && <div className="intelligence-grid">{result.topics.map((topic, index) => <article className="intelligence-card" key={index}><h3>{topic.title}</h3><p>{topic.description}</p><small>Pages: {topic.pages?.join(", ") || "Not available"}</small></article>)}</div>}
      {!loading && result?.sections && <div className="intelligence-grid">{result.sections.map((section, index) => <article className="intelligence-card" key={index}><h3>{section.title}</h3>{section.description && <p>{section.description}</p>}<small>Pages: {section.pages?.join(", ") || "Not available"}</small></article>)}</div>}
      {!loading && result?.questions && <div className="question-list">{result.questions.map((item, index) => <article className="question-card" key={index}><div><span className={`difficulty ${item.difficulty.toLowerCase()}`}>{item.difficulty}</span><h3>{item.question}</h3></div><button onClick={() => setOpenAnswers((state) => ({ ...state, [index]: !state[index] }))}>{openAnswers[index] ? "Hide answer" : "Show answer"}</button>{openAnswers[index] && <p className="question-answer">{item.answer}</p>}<small>Pages: {item.pages?.join(", ") || "Not available"}</small></article>)}</div>}
    </div>
  </section>;
}
export default DocumentIntelligence;
