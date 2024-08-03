import React, { useState } from "react";
import { MenuItem, Select, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./IdeasPage.css";

// Dummy data for ideas
const dummyIdeas = [
  {
    id: 1,
    stage: "Idea",
    createdDate: "2024-07-01",
    synopsis: "This is a brief synopsis of the first idea that provides an overview of the concept and its objectives.",
    author: "Alice Johnson",
    likes: 120,
    comments: 30,
  },
  {
    id: 2,
    stage: "Brainstorm",
    createdDate: "2024-07-05",
    synopsis: "A synopsis of the second idea with some insights into the brainstorming process and initial thoughts.",
    author: "Bob Smith",
    likes: 75,
    comments: 15,
  },
  {
    id: 3,
    stage: "Selected",
    createdDate: "2024-07-10",
    synopsis: "Details about the third idea that has been selected for further development and evaluation.",
    author: "Carol Lee",
    likes: 200,
    comments: 45,
  },
  {
    id: 4,
    stage: "Implemented",
    createdDate: "2024-07-15",
    synopsis: "Synopsis of the fourth idea which has been implemented and is now being reviewed for feedback.",
    author: "David Brown",
    likes: 90,
    comments: 25,
  },
  {
    id: 5,
    stage: "Idea",
    createdDate: "2024-07-20",
    synopsis: "Another example synopsis for an idea that demonstrates how it is handled in the system.",
    author: "Emma White",
    likes: 50,
    comments: 10,
  },
  {
    id: 6,
    stage: "Selected",
    createdDate: "2024-07-25",
    synopsis: "This synopsis shows the information for an idea that has been selected for implementation.",
    author: "Frank Green",
    likes: 65,
    comments: 20,
  },
];

const IdeasPage = () => {
  const [filters, setFilters] = useState({
    stage: "",
    category: "",
    author: "",
    function: "",
    subDivision: "",
    month: "",
    year: "",
    quickFilter: "",
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    // Fetch and update ideas based on filters here
  };

  const handleQuickFilterChange = (filterType) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      quickFilter: filterType,
    }));
    // Fetch and update ideas based on quick filter here
  };

  const resetFilters = () => {
    setFilters({
      stage: "",
      category: "",
      author: "",
      function: "",
      subDivision: "",
      month: "",
      year: "",
      quickFilter: "",
    });
    // Fetch and update ideas to show all
  };

  const handleCardClick = (id) => {
    navigate(`/idea-details/${id}`); // Use navigate instead of history.push
  };

  return (
    <div className="ideas-page">
      <h1 className="page-title">Ideas</h1>
      <div className="search-bar">
        <TextField variant="outlined" label="Search Ideas" fullWidth />
      </div>
      <div className="filters">
        <div className="filter-dropdown">
          <Select
            name="stage"
            value={filters.stage}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Stages" }}
          >
            <MenuItem value="">All Stages</MenuItem>
            <MenuItem value="Idea">Idea</MenuItem>
            <MenuItem value="Brainstorm">Brainstorm</MenuItem>
            <MenuItem value="Selected">Selected</MenuItem>
            <MenuItem value="Implemented">Implemented</MenuItem>
          </Select>
        </div>
        <div className="filter-dropdown">
          <Select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Categories" }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Tools & Technologies">Tools & Technologies</MenuItem>
            <MenuItem value="Process & Documentation">Process & Documentation</MenuItem>
            <MenuItem value="Work Life Integration">Work Life Integration</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </Select>
        </div>
        <div className="filter-dropdown">
          <Select
            name="author"
            value={filters.author}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Authors" }}
          >
            <MenuItem value="">All Authors</MenuItem>
            <MenuItem value="Alice Johnson">Alice Johnson</MenuItem>
            <MenuItem value="Bob Smith">Bob Smith</MenuItem>
            <MenuItem value="Carol Lee">Carol Lee</MenuItem>
            <MenuItem value="David Brown">David Brown</MenuItem>
          </Select>
        </div>
        <div className="filter-dropdown">
          <Select
            name="function"
            value={filters.function}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Functions" }}
          >
            <MenuItem value="">All Functions</MenuItem>
            {/* Add options here */}
          </Select>
        </div>
        <div className="filter-dropdown">
          <Select
            name="subDivision"
            value={filters.subDivision}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Sub Divisions" }}
          >
            <MenuItem value="">All Sub Divisions</MenuItem>
            {/* Add options here */}
          </Select>
        </div>
        <div className="filter-dropdown">
          <Select
            name="month"
            value={filters.month}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Months" }}
          >
            <MenuItem value="">All Months</MenuItem>
            {/* Add options here */}
          </Select>
        </div>
        <div className="filter-dropdown">
          <Select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Years" }}
          >
            <MenuItem value="">All Years</MenuItem>
            {/* Add options here */}
          </Select>
        </div>
      </div>
      <div className="quick-filters">
        <Button
          variant="outlined"
          onClick={() => handleQuickFilterChange("Recent")}
          className={filters.quickFilter === "Recent" ? "active" : ""}
        >
          Recent
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleQuickFilterChange("Top Voted")}
          className={filters.quickFilter === "Top Voted" ? "active" : ""}
        >
          Top Voted
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleQuickFilterChange("Most Commented")}
          className={filters.quickFilter === "Most Commented" ? "active" : ""}
        >
          Most Commented
        </Button>
      </div>

      <div className="quick-filters">
        <Button variant="outlined" color="secondary" onClick={resetFilters} className="reset-filters">
          Reset Filters
        </Button>
      </div>

      <div className="idea-cards">
        {dummyIdeas.map((idea) => (
          <div className="idea-card" key={idea.id} onClick={() => handleCardClick(idea.id)}>
            <div className="card-header">
              <span>{idea.stage}</span>
              <span>{idea.createdDate}</span>
            </div>
            <div className="card-body">
              <p>{idea.synopsis.length > 100 ? `${idea.synopsis.substring(0, 100)}...` : idea.synopsis}</p>
              <p>
                <strong>Author:</strong> {idea.author}
              </p>
            </div>
            <div className="card-footer">
              <span>{idea.likes} Likes</span>
              <span>{idea.comments} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;
