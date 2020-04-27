import React, { useState } from "react";

import Loader from "../loader";

import "./comment.css";

export default function Comment({ range, setRange }) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const postData = async (comment) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ range, comment }),
    };
    try {
      const response = await fetch(
        "http://localhost:3001/comment",
        requestOptions
      );
      await response.json();
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false);
      setRange([]);
    }
  };
  const onSave = (comment) => {
    if (range.length === 0 || comment === "") {
      return;
    }
    postData(comment);
  };
  return (
    <div className="overlay">
      <div className="popover_inner">
        {loading ? (
          <Loader />
        ) : (
          <>
            <span className="heading">Range</span>
            <span className="sub-heading">{range[0].toLocaleDateString()} - {range[1].toLocaleDateString()}</span>
            <input
              type="text"
              placeholder="Comment"
              className="comment-field"
              onChange={(e) => setComment(e.target.value)}
            />
           
              <button className="btn" onClick={(e) => onSave(comment)}>
                Save
              </button>
              <span className="close-link" onClick={(e) => setRange([])}>Close</span>
          </>
        )}
      </div>
    </div>
  );
}
