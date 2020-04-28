import React from 'react'

import getReadableDate from "./utils";


export default function Comment({ data, idx }) {
    return (
      <div className="comment-view-container">
        <div className="comment-name">{idx + 1}. {data.comment}</div>
        <div className="comment-range">
          {getReadableDate(data.range[0])} - {getReadableDate(data.range[1])}
        </div>
      </div>
    );
  }
