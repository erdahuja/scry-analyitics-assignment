import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

import "./commentListing.css";
import Comment from "./comment";

const ENDPOINT = "http://localhost:3001";

function useSocketWrapper() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.emit("comments");
    socket.on("comments", (data) => {
      setResponse(data);
    });
    socket.on("new-comment", (data) => {
      setResponse(prevState => [...prevState, ...data]);
    });
  }, []);

  return [response];
}

export default function CommentWrapper() {
  const [comments] = useSocketWrapper();
  return (
    <div className="commentListContainer">
      <span className="heading">Comments</span>
      {comments.length > 0 ? (
        comments.map((comment, idx) => (
          <Comment key={comment.range[0] + comment.range[1]} data={comment} idx={idx} />
        ))
      ) : (
        <span className="sub-heading">No Comments</span>
      )}
    </div>
  );
}
