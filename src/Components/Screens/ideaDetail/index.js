import "./IdeaDetailsPage.css";

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment-timezone";

import { deleteIdea, getIdeaDetail } from "../../Redux/api/ideaAPI";

const IdeaDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);

  const { idea, ideaAuditLogData, selectedIdeaId } = useSelector((state) => state.idea);
  const { currentUser } = useSelector((state) => state.common);

  const [authorizedUsers, setAuthorizedUsers] = useState([]);

  useEffect(() => {
    let userOIDs = [];
    if (idea) {
      userOIDs = idea.coauthors.map(user => { return user.oid });
      userOIDs.push(idea.createdBy.oid);
      setAuthorizedUsers(userOIDs);
    }
  }, []);

  const fetchIdeaDetails = async () => {
    await dispatch(getIdeaDetail(selectedIdeaId));
  };

  const handleLikeClick = async () => {
    setLiked(!liked);
    // await dispatch(likeIdea(id)); // Trigger the like API call
  };

  const handleDeleteClick = async () => {
    await dispatch(deleteIdea(selectedIdeaId));
    navigate(`/ideas`);
  }

  const handleEditClick = () => {
    navigate("/update-idea");
  };

  useEffect(() => {
    fetchIdeaDetails();
  }, [selectedIdeaId]);

  return (
    <div className="idea-details-page">
      <div className="idea-header">
        <div className="icon-container">
          <ThumbUpIcon className={`icon-like ${liked ? "liked" : ""}`} onClick={handleLikeClick} />
          <ShareIcon className="icon-share" />
          {authorizedUsers.includes(currentUser.oid) && <EditIcon className="icon-edit" onClick={handleEditClick} />}
          {authorizedUsers.includes(currentUser.oid) && <DeleteIcon className="icon-delete" onClick={handleDeleteClick} />}
        </div>
      </div>
      <div className="idea-content">
        <div className="idea-synopsis">{idea?.title}</div>
        <div className="idea-details-grid">
          <div className="grid-item">
            <div>
              <strong>Author:</strong> {idea?.createdBy?.name}
            </div>
            <div>
              <strong>Stage:</strong> {idea?.ideaStageId.stageName}
            </div>
            <div>
              <strong>Vertical:</strong> {idea?.ideaVerticalId.verticalName}
            </div>
          </div>
          <div className="grid-item">
            <div>
              <strong>Date Created:</strong> {moment(idea?.createdAt).format("DD-MM-YYYY")}
            </div>
            <div>
              <strong>Teams:</strong> {idea?.functionId.functionName}
            </div>
          </div>
          <div className="grid-item">
            <div>
              <strong>Tags:</strong> {idea?.tags.map((tag) => tag.name).join(", ")}
            </div>
            <div>
              <strong>Co-Authors:</strong> {idea?.coauthors.map((coauthor) => coauthor.name).join(", ")}
            </div>
          </div>
        </div>
        <div className="details-section">
          <div className="details-box">
            <strong>Problem Statement:</strong>
            <div dangerouslySetInnerHTML={{ __html: idea?.problemStatement }} />
          </div>
          <div className="details-box">
            <strong>Advantages:</strong>
            <div dangerouslySetInnerHTML={{ __html: idea?.advantage }} />
          </div>
          <div className="details-box">
            <strong>Proposed Solution:</strong>
            <div dangerouslySetInnerHTML={{ __html: idea?.proposedSolution }} />
          </div>
          <div className="details-box">
            <strong>Existing Solution:</strong>
            <div dangerouslySetInnerHTML={{ __html: idea?.existingSolution }} />
          </div>
        </div>
        <div className="track-status-section">
          <h3 className="track-status-title">Idea Tracking Progress</h3>
          <div className="track-status-container">
            <div className="track-status-header">
              <div className="track-status-cell">Event</div>
              <div className="track-status-cell">Details</div>
              <div className="track-status-cell">Timestamps</div>
            </div>
            <div className="track-status-body">
              {ideaAuditLogData?.map((event, index) => (
                <div className="track-status-row" key={index}>
                  <div className="track-status-cell">{event.eventName}</div>
                  <div className="track-status-cell">{event.details}</div>
                  <div className="track-status-cell">{moment(event.createdAt).format("DD-MM-YYYY hh:mm:ss A")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="comments-separator"></div> {/* Horizontal line */}
        <div className="grid-item">
          <h3>Comments</h3>
          <div className="comments-section">
            {idea?.comments?.map((comment, index) => (
              <div key={index} className="comment">
                <div className="comment-text">
                  <strong>{comment.author}:</strong> {comment.text}
                </div>
                <div className="comment-date">
                  <em>{comment.date}</em>
                </div>
              </div>
            ))}
            <div className="comment-input">
              <TextField className="comment-textfield" label="Add a Comment" variant="outlined" multiline rows={2} />
              <Button variant="contained" color="primary">
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
