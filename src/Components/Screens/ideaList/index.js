import "./IdeasPage.css";

import React, { useEffect, useState } from "react";
import { MenuItem, Select, TextField, Button, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

import { getAllFilteredIdeas } from "../../Redux/api/ideaAPI";
import { getAllSubDivByFunId } from "../../Redux/api/commonAPI";
import { setSelectedIdeaId } from "../../Redux/slice/idea-slice";

const IdeasPage = () => {
  const dispatch = useDispatch();

  const { stages, verticals, functions, subdivisions, users } = useSelector((state) => state.common);
  const { isFetchingIdeas, allFilteredIdeas } = useSelector((state) => state.idea);

  const [filters, setFilters] = useState({
    stageId: "",
    verticalId: "",
    authorId: "",
    functionId: "",
    subdivisionId: "",
    month: "",
    year: "",
  });
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleOnFunctionClick = (functionId) => {
    dispatch(getAllSubDivByFunId(functionId));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));

    // Fetch and update ideas based on filters here
    if (name === "functionId") handleOnFunctionClick(value);
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
      stageId: "",
      verticalId: "",
      authorId: "",
      functionId: "",
      subdivisionId: "",
      month: "",
      year: "",
    });
    // Fetch and update ideas to show all
  };

  const handleCardClick = (idea) => {
    const titleSlug = idea.title.toLowerCase().replace(/\s+/g, '-')
    dispatch(setSelectedIdeaId(idea._id));
    navigate(`/idea-details/${titleSlug}`);
  };

  const fetchIdeaList = async () => {
    filters.isPrivate = false;
    await dispatch(getAllFilteredIdeas(filters));
  };

  useEffect(() => {
    if (!isFetchingIdeas) fetchIdeaList();
  }, [filters]);

  return (
    <div className="ideas-page">
      <h1 className="page-title">Ideas</h1>
      <div className="background-card">
        <div className="search-bar">
          <TextField variant="outlined" label="Search Ideas" fullWidth />
        </div>
      </div>
      <div className="filters">
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            name="stageId"
            value={filters.stageId}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Stages" }}
          >
            <MenuItem value="">
              <em>{"All Stages"}</em>
            </MenuItem>
            {stages.map((func) => (
              <MenuItem key={func._id} value={func._id}>
                {func.stageName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            name="verticalId"
            value={filters.verticalId}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Verticals" }}
          >
            <MenuItem value="">
              <em>{"All Verticals"}</em>
            </MenuItem>
            {verticals.map((func) => (
              <MenuItem key={func._id} value={func._id}>
                {func.verticalName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            name="authorId"
            value={filters.authorId}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Authors" }}
          >
            <MenuItem value="">
              <em>{"All Authors"}</em>
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <Select
            name="functionId"
            value={filters.functionId}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Functions" }}
          >
            <MenuItem value="">
              <em>{"All Functions"}</em>
            </MenuItem>
            {functions.map((func) => (
              <MenuItem key={func._id} value={func._id}>
                {func.functionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }} disabled={!filters.functionId}>
          <Select
            name="subdivisionId"
            value={filters.subdivisionId}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Sub Divisions" }}
          >
            <MenuItem value="">
              <em>{"All Sub Divisions"}</em>
            </MenuItem>
            {subdivisions.map((sub) => (
              <MenuItem key={sub._id} value={sub._id}>
                {sub.subdivisionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 120 }}>
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
        </FormControl>
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
        {allFilteredIdeas.map((idea) => (
          <div className="idea-card" key={idea._id} onClick={() => handleCardClick(idea)}>
            <div className="card-header">
              <span>{idea?.ideaStageId.stageName}</span>
              <span>{moment(idea?.createdAt).format("YYYY-MM-DD")}</span>
            </div>
            <div className="card-body">
              <p>{idea.title.length > 100 ? `${idea.title.substring(0, 100)}...` : idea.title}</p>
              <p>
                <strong>Author:</strong> {idea?.createdBy?.name}
              </p>
            </div>
            <div className="card-footer">
              <span>{idea?.likes} Likes</span>
              <span>{idea?.comments} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;
