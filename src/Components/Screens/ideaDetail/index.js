import "./IdeaDetailsPage.css";

import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getIdeaDetail } from "../../Redux/api/ideaAPI";
import moment from "moment-timezone";

const IdeaDetailsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { isFetchingIdeaDetail, idea } = useSelector((state) => state.idea);
  console.log(idea);

  const fetchIdeaDetails = async () => {
    await dispatch(getIdeaDetail(id));
  };

  useEffect(() => {
    fetchIdeaDetails();
  }, [id]);

  return isFetchingIdeaDetail ? (
    <div className="idea-details-page">Loading...</div>
  ) : (
    <div className="idea-details-page">
      <div className="idea-header">
        <Button variant="contained" color="primary">
          Share Idea
        </Button>
        <Button variant="contained" color="secondary">
          Update Idea
        </Button>
      </div>
      <div className="idea-content">
        <h2>Idea Synopsis</h2>
        <p>
          <strong>Author:</strong> {idea?.createdBy.name}
        </p>
        <p>
          <strong>Date Created:</strong> {moment(idea?.createdAt).format("YYYY-MM-DD")}
        </p>
        <p>
          <strong>Stage:</strong> {idea?.ideaStageId.stageName}
        </p>
        <p>
          <strong>Category:</strong> {idea?.ideaCategoryId.categoryName}
        </p>
        <p>
          <strong>Presentable Date:</strong> {moment(idea?.presentableDate).format("YYYY-MM-DD")}
        </p>
        <p>
          <strong>Private Idea:</strong> {idea?.isPrivate ? "Yes" : "No"}
        </p>
        <p>
          <strong>Published:</strong> {idea?.published ? "Yes" : "No"}
        </p>
        <h3>Details</h3>
        <p>
          <strong>Problem Statement:</strong> <div dangerouslySetInnerHTML={{ __html: idea?.problemStatement }} />
        </p>
        <p>
          <strong>Advantages:</strong> <div dangerouslySetInnerHTML={{ __html: idea?.advantage }} />
        </p>
        <p>
          <strong>Proposed Solution:</strong>
          <div dangerouslySetInnerHTML={{ __html: idea?.proposedSolution }} />
        </p>
        <p>
          <strong>Existing Solution:</strong> <div dangerouslySetInnerHTML={{ __html: idea?.existingSolution }} />
        </p>
        <p>
          <strong>Tags:</strong> {idea?.tags.join(", ")}
        </p>
        <p>
          <strong>Co-Authors:</strong> {idea?.coauthors.map((coauthor) => coauthor.name).join(", ")}
        </p>
        <p>
          <strong>Functions:</strong> {idea?.functionId.functionName}
        </p>
        <p>
          <strong>Sub Divisions:</strong> {idea?.subdivisionId.subdivisionName}
        </p>
        <h3>Idea Track Status</h3>
        <table className="track-status-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Details</th>
              <th>Timestamps</th>
            </tr>
          </thead>
          <tbody>
            {idea?.trackStatus?.map((event, index) => (
              <tr key={index}>
                <td>{event.event}</td>
                <td>{event.details}</td>
                <td>{event.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Comments</h3>
        <div className="comments-section">
          {idea?.comments?.map((comment, index) => (
            <div key={index} className="comment">
              <p>
                <strong>{comment.author}:</strong> {comment.text}
              </p>
              <p>
                <em>{comment.date}</em>
              </p>
            </div>
          ))}
          <div className="comment-input">
            <TextField label="Add a Comment" variant="outlined" multiline rows={4} fullWidth />
            <Button variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
