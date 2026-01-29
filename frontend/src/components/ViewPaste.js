import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewPaste.css";
import BASEURL from "../constant/Baseurl"


const ViewPaste = () => {
  const { id } = useParams();

  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expiresIn, setExpiresIn] = useState(null);
//   const [viewsLeft, setViewsLeft] = useState(null);

  useEffect(() => {
    const fetchPaste = async () => {
      try {
        const res = await fetch(
          `${BASEURL}/api/pastes/${id}`
        );

        if (!res.ok) {
          setError("Paste not found or expired");
          return;
        }

        const data = await res.json();

        setContent(data.content);

        // views left
        // setViewsLeft(data.remaining_views);

        // expiry time
        if (data.expires_at) {
          const diffSeconds = Math.max(
            0,
            Math.floor(
              (new Date(data.expires_at) - new Date()) / 1000
            )
          );
          setExpiresIn(diffSeconds);
        }
      } catch (err) {
        setError("⚠️ Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchPaste();
  }, [id]);

  // countdown timer
  useEffect(() => {
    if (expiresIn === null) return;

    if (expiresIn <= 0) {
      setError("⏱ Paste expired");
      return;
    }

    const timer = setInterval(() => {
      setExpiresIn((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresIn]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="view-container">
      <h2 className="title">View Paste</h2>

     

      <pre className="paste-box">{content}</pre>
    </div>
  );
};

export default ViewPaste;
