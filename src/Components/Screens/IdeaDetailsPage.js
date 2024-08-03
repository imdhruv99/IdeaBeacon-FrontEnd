import React, { useState, useEffect } from 'react';
import './IdeaDetailsPage.css';
import { Button, TextField } from '@mui/material';

const IdeaDetailsPage = ({ match }) => {
  const [idea, setIdea] = useState(null);
  const ideaId = match.params.id;

  useEffect(() => {
    const fetchIdeaDetails = async () => {
      // Replace with actual API call
      const response = await fetch(`/api/ideas/${ideaId}`);
      const data = await response.json();
      setIdea(data);
    };

    fetchIdeaDetails();
  }, [ideaId]);

  if (!idea) return <div>Loading...</div>;

  return (
    <div className="idea-details-page">
      <div className="idea-header">
        <Button variant="contained" color="primary">Share Idea</Button>
        <Button variant="contained" color="secondary">Update Idea</Button>
      </div>
      <div className="idea-content">
        <h2>Idea Synopsis</h2>
        <p><strong>Author:</strong> {idea.author}</p>
        <p><strong>Date Created:</strong> {idea.createdDate}</p>
        <p><strong>Stage:</strong> {idea.stage}</p>
        <p><strong>Category:</strong> {idea.category}</p>
        <p><strong>Presentable Date:</strong> {idea.presentableDate}</p>
        <p><strong>Private Idea:</strong> {idea.isPrivate ? 'Yes' : 'No'}</p>
        <p><strong>Published:</strong> {idea.published ? 'Yes' : 'No'}</p>
        <h3>Details</h3>
        <p><strong>Problem Statement:</strong> {idea.problemStatement}</p>
        <p><strong>Advantages:</strong> {idea.advantages}</p>
        <p><strong>Proposed Solution:</strong> {idea.proposedSolution}</p>
        <p><strong>Existing Solution:</strong> {idea.existingSolution}</p>
        <p><strong>Tags:</strong> {idea.tags.join(', ')}</p>
        <p><strong>Co-Authors:</strong> {idea.coAuthors.join(', ')}</p>
        <p><strong>Functions:</strong> {idea.functions.join(', ')}</p>
        <p><strong>Sub Divisions:</strong> {idea.subDivisions.join(', ')}</p>
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
            {idea.trackStatus.map((event, index) => (
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
          {idea.comments.map((comment, index) => (
            <div key={index} className="comment">
              <p><strong>{comment.author}:</strong> {comment.text}</p>
              <p><em>{comment.date}</em></p>
            </div>
          ))}
          <div className="comment-input">
            <TextField
              label="Add a Comment"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
            />
            <Button variant="contained" color="primary">Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDetailsPage;
