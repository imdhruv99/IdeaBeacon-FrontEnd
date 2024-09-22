import "./Dashboard.css";
import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useInitialFetch from "../../hooks/useInitialFeatch.js";
import { setIdeaFilters } from "../../Redux/slice/idea-slice.js";

import jnprImage from "../../../Assets/images/jnpr.png";

const Dashboard = () => {
    useInitialFetch();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { stages, verticals } = useSelector((state) => state.common);
    const { siteVisitCount } = useSelector((state) => state.siteStatistics);

    const [ideaStages, setStages] = useState([]);
    const [ideaVerticals, setVerticals] = useState([]);

    useEffect(() => {
        if (stages) {
            const updatedStages = stages.filter((stage) => stage.stageName !== "Archived");
            const filteredStages = updatedStages.map((stage) => ({
                id: stage._id,
                name: stage.stageName,
                count: stage.count,
                icon: stage.image || "",
            }));

            setStages(filteredStages);
        }

        if (verticals) {
            const filteredVerticals = verticals.map((vertical) => ({
                id: vertical._id,
                name: vertical.verticalName,
                count: vertical.count,
                icon: vertical.image || "",
            }));
            setVerticals(filteredVerticals);
        }
    }, [stages, verticals]);

    const handleCardClick = (type, id) => {
        const filters = {
            filterName: `${type}Id`,
            filterId: id,
        };
        dispatch(setIdeaFilters(filters));
        navigate(`/ideas`);
    };

    return (
        <div className="dashboard-page">
            <div className="idea-beacon">
                <h1>IdeaBeacon</h1>
            </div>
            <div className="dashboard-logo">{<img src={jnprImage} alt="Juniper Networks" />}</div>
            <div className="dashboard-cards">
                <Typography variant="h5" className="section-header">
                    Idea Stages
                </Typography>
                <Grid container spacing={2}>
                    {ideaStages.map((stage) => (
                        <Grid item xs={12} sm={6} md={3} key={stage.name}>
                            <div className="cards" onClick={() => handleCardClick("stage", stage.id)}>
                                <div className="card-icon">
                                    <img src={`data:image/png;base64,${stage.icon}`} alt={`${stage.name} icon`} />
                                </div>
                                <div className="card-content">
                                    <h3>{stage.name}</h3>
                                    <p>{stage.count}</p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>

                <Typography variant="h5" className="section-header">
                    Idea Verticals
                </Typography>
                <Grid container spacing={2} className="vertical-cards">
                    {ideaVerticals.map((vertical) => (
                        <Grid item xs={12} sm={6} md={3} key={vertical.name}>
                            <div className="cards" onClick={() => handleCardClick("vertical", vertical.id)}>
                                <div className="card-icon">
                                    <img src={`data:image/png;base64,${vertical.icon}`} alt={`${vertical.name} icon`} />
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

            <div className="site-visit-counter-container">
                <p>Site Visit Count: {siteVisitCount}</p>
            </div>
        </div>
    );
};

export default Dashboard;
