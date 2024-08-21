import "./Dashboard.css";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, InputLabel, FormControl, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { initialStages, initialVerticals } from "../../Helpers/Constants.js";
import useInitialFeatch from "../../hooks/useInitialFeatch";
import { getAllSubDivByFunId } from "../../Redux/api/commonAPI";

// importing images
import ideaIcon from "../../../Assets/icons/idea-icon.png";
import brainstormIcon from "../../../Assets/icons/brainstorm-icon.png";
import selectedIcon from "../../../Assets/icons/selected-icon.png";
import implementedIcon from "../../../Assets/icons/implement-icon.png";
import toolsAndTechnologyIcon from "../../../Assets/icons/tech-tool.png";
import processIcon from "../../../Assets/icons/process.png";
import workLifeIcon from "../../../Assets/icons/work-life.png";
import otherIcon from "../../../Assets/icons/other.png";
import jnprImage from "../../../Assets/images/jnpr.png";

const months = ["January", "February", "March"];
const years = ["2022", "2023", "2024"];

const Dashboard = () => {
  // fetching initial data
  useInitialFeatch();

  const dispatch = useDispatch();

  const { functions, subdivisions, stages, verticals } = useSelector((state) => state.common);

  useEffect(() => {
    if (!stages) {
      return null;
    }
    let updatedStages = stages.filter((stage) => stage.stageName !== "Archived");
    let filteredStages = updatedStages.map((stage) => {
      return {
        name: stage.stageName,
        count: 0,
        icon:
          stage.stageName === "Idea"
            ? ideaIcon
            : stage.stageName === "Brainstorm"
              ? brainstormIcon
              : stage.stageName === "Selected"
                ? selectedIcon
                : implementedIcon,
      };
    });

    setStages(filteredStages);

    if (!verticals) {
      return null;
    }

    let filteredVerticals = verticals.map((vertical) => {
      return {
        name: vertical.verticalName,
        count: 0,
        icon:
          vertical.verticalName === "Routing"
            ? toolsAndTechnologyIcon
            : vertical.verticalName === "Switching"
              ? processIcon
              : vertical.verticalName === "Security"
                ? workLifeIcon
                : otherIcon,
      };
    });
    setVerticals(filteredVerticals);
  }, [stages, verticals]);

  const { control, watch } = useForm();
  const [ideaStages, setStages] = useState(initialStages);
  const [ideaVerticals, setVerticals] = useState(initialVerticals);

  const selectedFunction = watch("function");
  const selectedSubDivision = watch("subDivision");
  const selectedMonth = watch("month");
  const selectedYear = watch("year");

  useEffect(() => {
    // Example: Update counts based on filters
    // You would replace this with actual API calls
    if (selectedFunction) {
      dispatch(getAllSubDivByFunId(selectedFunction));
    }
  }, [selectedFunction]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-logo">{<img src={jnprImage} alt="Juniper Networks" />}</div>

      <div className="dashboard-cards">
        <Typography variant="h5" className="section-header">
          Idea Stages
        </Typography>
        <Grid container spacing={2}>
          {ideaStages.map((stage) => (
            <Grid item xs={12} sm={6} md={3} key={stage.name}>
              <div className="cards">
                <div className="card-icon">
                  <img src={stage.icon} alt={`${stage.name} icon`} />
                </div>
                <div className="card-content">
                  <h3>{stage.name}</h3>
                  <p>{stage.count}</p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <Typography variant="h5" className="section-header">
          Idea Verticals
        </Typography>
        <Grid container spacing={2} className="vertical-cards">
          {ideaVerticals.map((vertical) => (
            <Grid item xs={12} sm={6} md={3} key={vertical.name}>
              <div className="cards">
                <div className="card-icon">
                  <img src={vertical.icon} alt={`${vertical.name} icon`} />
                </div>
                <div className="card-content">
                  <h3>{vertical.name}</h3>
                  <p>{vertical.count}</p>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
