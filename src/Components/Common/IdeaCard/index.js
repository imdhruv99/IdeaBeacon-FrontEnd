import "./IdeaCard.css";

import React from "react";
import { Link } from "react-router-dom";

const IdeaCard = ({ idea }) => {
  const { stage, createdDate, synopsis, author, likes, comments, id } = idea;
  const shortSynopsis = synopsis.length > 100 ? synopsis.slice(0, 100) + "..." : synopsis;

  return (
    <div className="idea-card">
      <div className="idea-card-header">
        <span className="idea-stage">{stage}</span>
        <span className="idea-date">{createdDate}</span>
      </div>
      <div className="idea-card-body">
        <p className="idea-synopsis">{shortSynopsis}</p>
        <p className="idea-author">By {author}</p>
      </div>
      <div className="idea-card-footer">
        <div className="like-button">
          <span>👍 {likes}</span>
        </div>
        <div className="comment-button">
          <span>💬 {comments}</span>
        </div>
      </div>
      <Link to={`/idea/${id}`} className="idea-card-link">
        View Details
      </Link>
    </div>
  );
};

export default IdeaCard;
