import "./myIdeaList.css";

import React, { useEffect, useState } from "react";
import { MenuItem, Select, TextField, Button, FormControl, IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";

import { getAllFilteredIdeas, updateIdeaStage } from "../../Redux/api/ideaAPI";
import { setIdeaSearchText, setIsTopCommented, setIsTopRate, setSelectedIdeaId } from "../../Redux/slice/idea-slice";
import { getIdeaSelector } from "../../Redux/selector/ideaSelector";

const MyIdeaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { stages, verticals, functions, currentUser } = useSelector((state) => state.common);
  const { isFetchingIdeas, ideaSearchText } = useSelector((state) => state.idea);
  const getIdeasFromSelector = useSelector(getIdeaSelector);

  const [filters, setIdeaFilters] = useState({
    stageId: "",
    verticalId: "",
    authorId: currentUser?._id,
    functionId: "",
    month: "",
    year: "",
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIdea, setSelectedIdea] = useState(null);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setIdeaFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleQuickFilterChange = (filterType) => {
    setIdeaFilters((prevFilters) => ({
      ...prevFilters,
      quickFilter: filterType,
    }));
  };

  const resetFilters = () => {
    setIdeaFilters({
      stageId: "",
      verticalId: "",
      authorId: currentUser?._id,
      functionId: "",
      month: "",
      year: "",
    });
    dispatch(setIdeaSearchText(""));
    dispatch(setIsTopRate(false));
    dispatch(setIsTopCommented(false));
  };

  const handleSearch = (event) => {
    dispatch(setIdeaSearchText(event.target.value));
  };

  const handleCardClick = (idea) => {
    const titleSlug = idea.title.toLowerCase().replace(/\s+/g, "-");
    dispatch(setSelectedIdeaId(idea._id));
    navigate(`/idea-details/${titleSlug}`);
  };

  const handleMenuOpen = (event, idea) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedIdea(idea);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedIdea(null);
  };

  const handleStageChange = async (newStageId) => {
    if (selectedIdea) {
      await dispatch(updateIdeaStage({ id: selectedIdea._id, ideaStageId: newStageId }));
      fetchIdeaList();
    }
    handleMenuClose();
  };

  const fetchIdeaList = async () => {
    await dispatch(getAllFilteredIdeas(filters));
  };

  useEffect(() => {
    if (!isFetchingIdeas) fetchIdeaList();
  }, [filters]);

  return (
    <div className="ideas-page">
      <h1 className="page-title">My Ideas</h1>
      <div className="background-card">
        <div className="search-bar">
          <TextField variant="outlined" label="Search Ideas" onChange={handleSearch} value={ideaSearchText} fullWidth />
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
            name="functionId"
            value={filters.functionId}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "All Teams" }}
          >
            <MenuItem value="">
              <em>{"All Teams"}</em>
            </MenuItem>
            {functions.map((func) => (
              <MenuItem key={func._id} value={func._id}>
                {func.functionName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="quick-filters">
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(setIsTopCommented(false));
            dispatch(setIsTopRate(true));
          }}
          className={filters.quickFilter === "Top Voted" ? "active" : ""}
        >
          Top Voted
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(setIsTopRate(false));
            dispatch(setIsTopCommented(true));
          }}
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
        {getIdeasFromSelector.map((idea) => (
          <div className="idea-card" key={idea._id} onClick={() => handleCardClick(idea)}>
            <div className="card-header">
              <span>{idea?.ideaStageId.stageName}</span>
              <span>{moment(idea?.createdAt).format("DD-MM-YYYY")}</span>
              <IconButton className="three-dot-menu" onClick={(e) => handleMenuOpen(e, idea)} size="small">
                <MoreVertIcon />
              </IconButton>
            </div>
            <div className="card-body">
              <p>{idea.title.length > 100 ? `${idea.title.substring(0, 100)}...` : idea.title}</p>
              <p>
                <strong>Author:</strong> {idea?.createdBy?.name}
              </p>
            </div>
            <div className="card-footer">
              <span>{idea?.likeCount + ` ${idea?.likeCount > 1 ? "Likes" : "Like"}`}</span>
              <span>{idea?.commentCount} Comments</span>
            </div>
          </div>
        ))}
      </div>
      {stages.length > 0 && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {stages
            .filter((stage) => selectedIdea && stage._id !== selectedIdea.ideaStageId._id)
            .map((stage) => (
              <MenuItem key={stage._id} onClick={() => handleStageChange(stage._id)}>
                {stage.stageName}
              </MenuItem>
            ))}
        </Menu>
      )}
    </div>
  );
};

export default MyIdeaPage;
