import "./IdeaDetailsPage.css";

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import moment from "moment-timezone";

import { deleteIdea, getIdeaDetail, likeIdea } from "../../Redux/api/ideaAPI";
import { createComment, getIdeaCommentsList } from "../../Redux/api/commentAPI";

const IdeaDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { idea, ideaAuditLogData, selectedIdeaId } = useSelector((state) => state.idea);
  const { currentUser } = useSelector((state) => state.common);
  const { commentList } = useSelector((state) => state.comment);

  const [authorizedUsers, setAuthorizedUsers] = useState([]);
  const [liked, setLiked] = useState(false);
  const [commentText, setCommentText] = useState();
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const fetchIdeaDetails = async () => {
    const params = {
      ideaId: selectedIdeaId,
      userId: currentUser?._id,
    };
    await dispatch(getIdeaDetail(params));
  };

  const fetchCommentList = async () => {
    await dispatch(getIdeaCommentsList(selectedIdeaId));
  }

  const handleLikeClick = async () => {
    const params = {
      ideaId: selectedIdeaId,
      userId: currentUser?._id,
    };
    await dispatch(likeIdea(params));
    setLiked(!liked);
  };

  const handleDeleteClick = async () => {
    await dispatch(deleteIdea(selectedIdeaId));
    navigate(`/ideas`);
  };

  const handleEditClick = () => {
    navigate("/update-idea");
  };

  const handleCreateCommentClick = async () => {
    if (!commentText.trim()) return;
    const commentPayload = {
      "ideaId": selectedIdeaId,
      "comment": commentText,
      "userId": currentUser?._id,
      "isReply": false,
      "replyComment": "",
      "commentId": "",
      "userName": currentUser?.name,
    };
    await dispatch(createComment(commentPayload)).then(() => {
      setCommentText("");
    });
  };

  const handleReplyCommentClick = (commentId) => {
    setReplyToCommentId(commentId);
  };

  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;

    const replyPayload = {
      ideaId: selectedIdeaId,
      comment: "",
      userId: currentUser?._id,
      isReply: true,
      replyComment: replyText,
      commentId: replyToCommentId,
      userName: currentUser?.name,
    };

    await dispatch(createComment(replyPayload));
    setReplyText("");
    setReplyToCommentId(null);
  };


  useEffect(() => {
    fetchIdeaDetails();
    fetchCommentList();
  }, [selectedIdeaId]);

  useEffect(() => {
    let userOIDs = [];
    if (idea) {
      userOIDs = idea.coauthors.map((user) => {
        return user.oid;
      });
      userOIDs.push(idea.createdBy.oid);
      setAuthorizedUsers(userOIDs);
    }
    setLiked(idea?.isLiked);
  }, [idea]);

  return (

    <div className="idea-details-page">
      <div className="idea-header">
        <div className="icon-container">
          <ThumbUpIcon className={`icon-like ${liked ? "liked" : ""}`} onClick={handleLikeClick} />
          {authorizedUsers.includes(currentUser?.oid) && <EditIcon className="icon-edit" onClick={handleEditClick} />}
          {authorizedUsers.includes(currentUser?.oid) && (
            <DeleteIcon className="icon-delete" onClick={handleDeleteClick} />
          )}
        </div>
      </div>
      <div className="idea-content">
        <div className="idea-synopsis">{idea?.title}</div>
        <div className="idea-details-grid">
          <div className="grid-item-details">
            <div>
              <strong>Author:</strong> {idea?.createdBy?.name}
            </div>
            <div>
              <strong>Stage:</strong> {idea?.ideaStageId?.stageName}
            </div>
            <div>
              <strong>Vertical:</strong> {idea?.ideaVerticalId?.verticalName}
            </div>
          </div>
          <div className="grid-item-details">
            <div>
              <strong>Date Created:</strong> {moment(idea?.createdAt).format("DD-MM-YYYY")}
            </div>
            <div>
              <strong>Teams:</strong> {idea?.functionId?.functionName}
            </div>
            <div>
              <strong>Demo Day:</strong> {idea?.demoDayId?.number}
            </div>
          </div>
          <div className="grid-item-details">
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
          <div className="details-box">
            <strong>Source Code Links:</strong>
            <div className="links-container">
              {idea?.links.length > 0 ? (
                idea.links.map((link, index) => (
                  <a href={link} target="_blank" rel="noopener noreferrer" className="link-source" key={index}>
                    {link}
                  </a>
                ))
              ) : (
                <p>No links are provided.</p>
              )}
            </div>
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
        <div className="comments-separator"></div>
        <div className="grid-item">
          <h3>Comments</h3>
          <div className="comments-section">
            {commentList?.length > 0 ? (
              commentList.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="header-container">
                    <strong>{comment.userId.name}:</strong>
                    <em>{moment(comment?.createdAt).format("DD MMM, YYYY hh:mm a")}</em>
                  </div>
                  <div className="comment-body">
                    <div className="comment-text-container">
                      <p>{comment.comment}</p>
                    </div>
                    {comment.replies.length > 0 && (
                      <div className="replies">
                        {comment.replies.map((reply, replyIndex) => (
                          <div key={replyIndex} className="reply">
                            <div className="header-container">
                              <strong>{reply.userId.name}</strong>
                              <em>{moment(reply?.createdAt).format("DD MMM, YYYY hh:mm a")}</em>
                            </div>
                            <div className="comment-text-container">
                              <p>{reply.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="comment-actions">
                    {replyToCommentId === comment._id ? (
                      <div className="reply-input">
                        <TextField
                          className="reply-textfield"
                          label="Reply"
                          variant="outlined"
                          multiline
                          rows={2}
                          value={replyText}
                          onChange={(event) => setReplyText(event.target.value)}
                        />
                        <div className="reply-icon-button margin-top">
                          <Button
                            className="reply-button"
                            variant="contained"
                            color="primary"
                            onClick={handleSubmitReply}
                          >
                            Reply
                          </Button>
                          <Button
                            className="margin-left"
                            variant="text"
                            size="small"
                            onClick={() => { handleReplyCommentClick(""); setReplyText("") }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : <div className="reply-icon-button">
                      <Button
                        variant="text"
                        size="small"
                        startIcon={<ReplyIcon />}
                        onClick={() => { handleReplyCommentClick(comment._id); setReplyText("") }}
                      >
                        Reply
                      </Button>
                    </div>}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comment">No comments have been made.</p>
            )}
            <div className="comment-input">
              <TextField
                className="comment-textfield"
                label="Comment"
                variant="outlined"
                multiline
                rows={2}
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                endIcon={<CommentIcon />}
                onClick={handleCreateCommentClick}
              >
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
