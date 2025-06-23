import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import "./App.css";

const App = () => {
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetAdvice = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      if (!response.ok) {
        setError("something went wrong");
        return;
      }
      const data = await response.json();
      setResult(data.slip.advice);
    } catch (error) {
      setError("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-body">
      <div className="CTA">
        <h1>Click the button to get random advice</h1>
        <button onClick={handleGetAdvice} disabled={loading}>
          {loading ? (
            <BeatLoader color="#a9def9ff" loading={loading} />
          ) : (
            "Get advice"
          )}
        </button>
      </div>
      <div className="result">
        {error ? <p>Something went wrong</p> : <p>{result}</p>}
      </div>
    </div>
  );
};

export default App;
// https://api.adviceslip.com/advice
