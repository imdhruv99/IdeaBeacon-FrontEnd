import "./UserGuide.css";
import React, { useEffect, useRef } from "react";

import dashboardImage from "../../../Assets/images/dashboard.png";
import createIdea from "../../../Assets/videos/create_idea.mp4";
import moveIdeaStage from "../../../Assets/videos/move_idea_stage.mp4";
import filters from "../../../Assets/videos/filters.mp4";
import updateIdea from "../../../Assets/videos/update_idea.mp4";

const UserGuide = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.0;
      videoRef.current.loop = true;
    }
  }, []);

  return (
    <div className="user-guide">
      <div className="heading">
        <h1>User Guide</h1>
      </div>
      <div className="content-wrapper">
        <div className="table-contents">
          <h2>Table of Contents</h2>
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#dashboard">Dashboard</a>
            </li>
            <li>
              <a href="#create-idea">How to create and view an Idea?</a>
            </li>
            <li>
              <a href="#update-idea">How to update an Idea?</a>
            </li>
            <li>
              <a href="#move-idea-stage">How to move an idea from one stage to another?</a>
            </li>
            <li>
              <a href="#ideas-and-my-ideas">Ideas & My Ideas Page</a>
            </li>
            <li>
              <a href="#report-bug">Report a bug</a>
            </li>
          </ul>
        </div>
        <div className="user-guide-details">
          <h2 id="introduction">Introduction</h2>
          <p>
            IdeaBeacon is a comprehensive platform dedicated to fostering innovation through the centralization of idea
            management. It enables users to submit their ideas, collaborate across various teams, and seek expert
            reviews to enhance the quality of submissions. The platform cultivates an active community where members can
            explore ideas, express their support through "likes," and provide valuable feedback via comments.
            Furthermore, IdeaBeacon includes an advanced workflow engine that supports the organization and management
            of contests, ensuring a streamlined process for evaluating and selecting the most promising ideas from the
            pool of submissions.
          </p>
          <h2 id="dashboard">Dashboard</h2>
          <p>
            The Dashboard displays the number of ideas categorized by their stages and verticals. Each tile is
            interactive; clicking on a tile directs you to a list of ideas filtered according to the selected category.
            Additionally, the Dashboard provides site visit statistics to offer insights into platform engagement.
          </p>
          <div className="browser-frame">
            <div className="browser-buttons">
              <div className="browser-button"></div>
              <div className="browser-button"></div>
              <div className="browser-button"></div>
            </div>
            <div className="browser-content">
              <img src={dashboardImage} alt="Dashboard" />
            </div>
          </div>
          <h2 id="create-idea">How to create and view an Idea?</h2>
          <p>
            The Post Idea page enables you to submit a new idea. All fields, except for the source code links, are
            mandatory. After completing the required details, click the Publish button to submit your idea, which will
            then redirect you to the "Ideas" page. You can format the idea details to suit your preferences. To view any
            idea, simply click on the interactive tile associated with it. This action will display detailed information
            about the idea, providing all the essential details and context.
            <ul>
              <li>You can comment on any idea to provide feedback, ask questions, or engage in discussions.</li>
              <li>
                You can reply to specific comments to engage in more detailed discussions or provide follow-up feedback.
              </li>
              <li>You can express your support for an idea by liking it.</li>
            </ul>
            Please refer to the video below for further details.
          </p>
          <div className="browser-frame">
            <div className="browser-buttons">
              <div className="browser-button"></div>
              <div className="browser-button"></div>
              <div className="browser-button"></div>
            </div>
            <div className="browser-content">
              <video ref={videoRef} autoPlay muted>
                <source src={createIdea} type="video/mp4" />
              </video>
            </div>
          </div>
          <h2 id="update-idea">How to update an Idea?</h2>
          <p>
            Authors and co-authors have the ability to update an idea, while other users can only view it. To update an
            idea, authors or co-authors should click on the pencil icon located at the top-right corner of the idea's
            detail page.
          </p>
          <div className="browser-frame">
            <div className="browser-buttons">
              <div className="browser-button"></div>
              <div className="browser-button"></div>
              <div className="browser-button"></div>
            </div>
            <div className="browser-content">
              <video ref={videoRef} autoPlay muted>
                <source src={updateIdea} type="video/mp4" />
              </video>
            </div>
          </div>
          <h2 id="move-idea-stage">How to move an idea from one stage to another?</h2>
          <p>
            You can move an idea to a different stage by clicking on the three-dot icon associated with the idea. This
            will display a dropdown menu with options to transition the idea to available stages, excluding the current
            stage. The change will be reflected in the Idea Details page, where the Idea Tracking Progress section will
            update to show the audit data for the transition.
          </p>
          <div className="browser-frame">
            <div className="browser-buttons">
              <div className="browser-button"></div>
              <div className="browser-button"></div>
              <div className="browser-button"></div>
            </div>
            <div className="browser-content">
              <video ref={videoRef} autoPlay muted>
                <source src={moveIdeaStage} type="video/mp4" />
              </video>
            </div>
          </div>
          <h2 id="ideas-and-my-ideas">Ideas & My Ideas Page</h2>
          <p>
            The Ideas page displays all ideas created by all users across the platform. In contrast, the My Ideas page
            is filtered to show only the ideas that you have created. You can search for ideas by entering the idea name
            or any relevant keywords associated with it.
          </p>
          <p>
            You can filter ideas based on your specific requirements using a variety of available filters. Some of the
            filters include:
            <ul>
              <li>
                <strong>Stage:</strong> Filter ideas by their current stage in the workflow.
              </li>
              <li>
                <strong>Vertical:</strong> Filter ideas according to their Vertical.
              </li>
              <li>
                <strong>Author:</strong> Filter ideas by their author name.
              </li>
              <li>
                <strong>Team:</strong> Filter ideas by team.
              </li>
            </ul>
          </p>
          <div className="browser-frame">
            <div className="browser-buttons">
              <div className="browser-button"></div>
              <div className="browser-button"></div>
              <div className="browser-button"></div>
            </div>
            <div className="browser-content">
              <video ref={videoRef} autoPlay muted>
                <source src={filters} type="video/mp4" />
              </video>
            </div>
          </div>
          <p>
            Quick filters are also available to streamline your search:
            <ul>
              <li>
                <strong>Top Voted:</strong> Displays ideas with the highest number of likes at the top.
              </li>
              <li>
                <strong>Most Commented:</strong> Shows ideas that have received the most comments, prominently listed.
              </li>
            </ul>
          </p>
          <h2 id="report-bug">Report a Bug</h2>
          <p>
            If you encounter any issues or bugs while using IdeaBeacon, we would appreciate your feedback to help us
            improve the platform. Please report any problems you come across by sending an email to{" "}
            <a href="mailto:dprajapati@juniper.net">dprajapati@juniper.net</a>. When reporting a bug, include as much
            detail as possible, such as:
            <ul>
              <li>A description of the issue you experienced</li>
              <li>Steps to reproduce the bug</li>
              <li>Your browser and operating system information</li>
              <li>Screenshots or error messages, if available</li>
            </ul>
            Our team will review your report and work to address the issue promptly. Thank you for helping us improve
            IdeaBeacon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;
