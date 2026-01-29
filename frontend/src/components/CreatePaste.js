import { useState } from "react";
import "./CreatePaste.css";
import BASEURL from "../constant/Baseurl"

const CreatePaste = () => {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResultUrl("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${BASEURL}/api/pastes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          ttl_seconds: ttl ? Number(ttl) : undefined,
          max_views: maxViews ? Number(maxViews) : undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      setResultUrl(`${window.location.origin}/p${data.url}`);
      setSuccess("✅ Paste created successfully!");
      setContent("");
      setTtl("");
      setMaxViews("");
    } catch {
      setError(" Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !content.trim() || loading;

  return (
    <div className="page">
      <h1 className="title">Pastebin Lite</h1>

      <form className="card" onSubmit={handleSubmit}>
        <textarea
          className="textarea"
          placeholder="Write your paste here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="inputs">
          <input
            className="input"
            type="number"
            placeholder="TTL (seconds)"
            value={ttl}
            onChange={(e) => setTtl(e.target.value)}
          />
          <input
            className="input"
            type="number"
            placeholder="Max views"
            value={maxViews}
            onChange={(e) => setMaxViews(e.target.value)}
          />
        </div>

        {(ttl || maxViews) && (
          <div className="meta">
            {ttl && <span>⏱ Expires in {ttl}s</span>}
            {maxViews && <span>👁 {maxViews} views allowed</span>}
          </div>
        )}

        <button
          className={`btn ${isDisabled ? "btn-disabled" : ""}`}
          type="submit"
          disabled={isDisabled}
        >
          {loading ? "Creating..." : "Create Paste"}
        </button>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        {resultUrl && (
          <div className="result">
            <input readOnly value={resultUrl} />
            <button
              type="button"
              onClick={async () => {
                await navigator.clipboard.writeText(resultUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
            >
              {copied ? "Copied ✅" : "Copy"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePaste;
