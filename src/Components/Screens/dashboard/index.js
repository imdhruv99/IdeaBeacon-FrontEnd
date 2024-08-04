import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { MenuItem, Select, InputLabel, FormControl, Grid, Typography } from "@mui/material";
import "./Dashboard.css";

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
import useInitialFeatch from "../../hooks/useInitialFeatch";

const functions = ["Function 1", "Function 2"];
const subdivisions = ["Sub 1", "Sub 2"];
const months = ["January", "February", "March"];
const years = ["2022", "2023", "2024"];

const initialStages = [
  { name: "Idea", count: 10, icon: ideaIcon },
  { name: "Brainstorm", count: 5, icon: brainstormIcon },
  { name: "Selected", count: 3, icon: selectedIcon },
  { name: "Implemented", count: 1, icon: implementedIcon },
];

const initialCategories = [
  { name: "Tools & Technologies", count: 7, icon: toolsAndTechnologyIcon },
  { name: "Process & Documentation", count: 4, icon: processIcon },
  { name: "Work Life Integration", count: 6, icon: workLifeIcon },
  { name: "Others", count: 2, icon: otherIcon },
];

const Dashboard = () => {
  // fetching initial data
  useInitialFeatch();

  const { control, watch } = useForm();
  const [stages, setStages] = useState(initialStages);
  const [categories, setCategories] = useState(initialCategories);

  const selectedFunction = watch("function");
  const selectedSubDivision = watch("subDivision");
  const selectedMonth = watch("month");
  const selectedYear = watch("year");

  useEffect(() => {
    // Example: Update counts based on filters
    // You would replace this with actual API calls
    if (selectedFunction || selectedSubDivision || selectedMonth || selectedYear) {
      // Update counts based on selected filters
      setStages(stages.map((stage) => ({ ...stage, count: stage.count + 1 })));
      setCategories(categories.map((category) => ({ ...category, count: category.count + 1 })));
    }
  }, [selectedFunction, selectedSubDivision, selectedMonth, selectedYear]);

  return (
    <div className="dashboard-page">
      <div className="dashboard-logo">
        <img src={jnprImage} alt="Juniper Networks" />
      </div>

      <div className="dashboard-filters">
        <FormControl margin="normal">
          <InputLabel>All Functions</InputLabel>
          <Controller
            name="function"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="All Functions">
                {functions.map((func) => (
                  <MenuItem key={func} value={func}>
                    {func}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl margin="normal" disabled={!selectedFunction}>
          <InputLabel>All Sub Divisions</InputLabel>
          <Controller
            name="subDivision"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="All Sub Divisions">
                {subdivisions.map((sub) => (
                  <MenuItem key={sub} value={sub}>
                    {sub}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl margin="normal">
          <InputLabel>All Months</InputLabel>
          <Controller
            name="month"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="All Months">
                {months.map((month) => (
                  <MenuItem key={month} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <FormControl margin="normal">
          <InputLabel>All Years</InputLabel>
          <Controller
            name="year"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="All Years">
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </div>

      <div className="dashboard-cards">
        <Typography variant="h5" className="section-header">
          Idea Stages
        </Typography>
        <Grid container spacing={2}>
          {stages.map((stage) => (
            <Grid item xs={12} sm={6} md={3} key={stage.name}>
              <div className="card">
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
          Idea Categories
        </Typography>
        <Grid container spacing={2} className="category-cards">
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <div className="card">
                <div className="card-icon">
                  <img src={category.icon} alt={`${category.name} icon`} />
                </div>
                <div className="card-content">
                  <h3>{category.name}</h3>
                  <p>{category.count}</p>
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
