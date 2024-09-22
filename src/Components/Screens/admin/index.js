import React, { useState } from "react";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../Common/Table";
import Modal from "../../Common/Modal";
import { Button, Grid, TextField } from "@mui/material";
import { createStage, deleteStage, updateStage } from "../../Redux/api/stageAPI";
import { getAllDemoDayList, getAllFunctions, getAllStages, getAllVerticals } from "../../Redux/api/commonAPI";
import { demoDayColumns, stageColumns, teamColumns, userColumns, verticalColumns } from "../../Helpers/Constants";
import { convertToBase64 } from "../../utils/utils";
import { createVertical, deleteVertical, updateVertical } from "../../Redux/api/verticalAPI";
import { createTeam, deleteTeam, updateTeam } from "../../Redux/api/teamAPI";
import { createDemoDay, deleteDemoDay, updateDemoDay } from "../../Redux/api/demoDayAPI";

const Admin = () => {
    const dispatch = useDispatch();

    const { stages, allUsers, verticals, functions, demoDays } = useSelector((state) => state.common);
    const [activeTab, setActiveTab] = useState("stages");
    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState("");
    const [fileNames, setFileNames] = useState({});
    const [files, setFiles] = useState({});
    const [formData, setFormData] = useState({
        stageName: "",
        verticalName: "",
        functionName: "",
        number: "",
        year: "",
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);

    const transformUsersData = (users) => {
        return users.map((user, index) => ({
            index: index + 1,
            name: user.name,
            preferredUsername: user.preferredUsername,
            role: user.role.roleName === "ROLE_ADMIN" ? "Admin" : "User",
        }));
    };
    const transformedUsers = transformUsersData(allUsers);

    const handleFileChange = (type, event) => {
        const file = event.target.files[0];
        if (file) {
            setFileNames((prev) => ({
                ...prev,
                [type]: file.name,
            }));
            setFiles((prev) => ({
                ...prev,
                [type]: file,
            }));
        } else {
            setFileNames((prev) => ({
                ...prev,
                [type]: "",
            }));
            setFiles((prev) => ({
                ...prev,
                [type]: null,
            }));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddButtonClick = (type) => {
        setFormType(type);
        setShowModal(true);
        setFormData({
            stageName: "",
            verticalName: "",
            functionName: "",
            number: "",
            year: "",
        });
    };

    const closeModal = () => {
        setShowModal(false);
        setFormType("");
        setFileNames({});
        setFiles({});
        setFormData({
            stageName: "",
            verticalName: "",
            functionName: "",
            number: "",
            year: "",
        });
        setEditItemId(null);
    };

    const handleEdit = (id) => {
        const itemMaps = {
            stages: { data: stages, formType: "stage", fields: ["stageName"] },
            verticals: { data: verticals, formType: "vertical", fields: ["verticalName"] },
            team: { data: functions, formType: "team", fields: ["functionName"] },
            demoDay: { data: demoDays, formType: "demoDay", fields: ["number", "year"] },
        };

        const { data, formType, fields } = itemMaps[activeTab] || {};

        if (!data) {
            console.error(`No data found for active tab: ${activeTab}`);
            return;
        }

        const itemToEdit = data.find((item) => item._id === id);
        if (!itemToEdit) {
            console.error(`${formType.charAt(0).toUpperCase() + formType.slice(1)} with id ${id} not found.`);
            return;
        }

        setEditItemId(id);
        setFormData(
            fields.reduce((acc, field) => {
                acc[field] = itemToEdit[field] || "";
                return acc;
            }, {})
        );

        setShowModal(true);
        setFormType(formType);
    };

    const handleSubmit = async () => {
        const dataToSubmit = {};
        try {
            const typeMapping = {
                stage: {
                    name: "stageName",
                    action: editItemId ? updateStage : createStage,
                    afterDispatch: getAllStages,
                },
                vertical: {
                    name: "verticalName",
                    action: editItemId ? updateVertical : createVertical,
                    afterDispatch: getAllVerticals,
                },
                team: {
                    name: "functionName",
                    action: editItemId ? updateTeam : createTeam,
                    afterDispatch: getAllFunctions,
                },
                demoDay: {
                    name: "number",
                    action: editItemId ? updateDemoDay : createDemoDay,
                    afterDispatch: getAllDemoDayList,
                },
            };

            const { name, action, afterDispatch } = typeMapping[formType] || {};

            if (!name) {
                throw new Error(`Unknown form type: ${formType}`);
            }

            dataToSubmit[name] = formData[name];

            if (formType === "stage" || formType === "vertical") {
                if (files[formType]) {
                    dataToSubmit.image = await convertToBase64(files[formType]);
                }
            } else if (formType === "demoDay") {
                dataToSubmit.number = +formData.number;
                dataToSubmit.year = +formData.year;
            }

            if (editItemId) {
                dataToSubmit.id = editItemId;
            }

            await dispatch(action(dataToSubmit));
            await dispatch(afterDispatch());

            setEditItemId(null);
            closeModal();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const handleDelete = (id) => {
        setDeleteItemId(id);
        setShowDeleteConfirm(true);
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setDeleteItemId(null);
    };

    const confirmDelete = async () => {
        switch (activeTab) {
            case "stages":
                await dispatch(deleteStage(deleteItemId));
                await dispatch(getAllStages());
                break;
            case "verticals":
                await dispatch(deleteVertical(deleteItemId));
                await dispatch(getAllVerticals());
                break;
            case "team":
                await dispatch(deleteTeam(deleteItemId));
                await dispatch(getAllFunctions());
                break;
            case "demoDay":
                await dispatch(deleteDemoDay(deleteItemId));
                await dispatch(getAllDemoDayList());
                break;
            default:
                break;
        }
        setShowDeleteConfirm(false);
        setDeleteItemId(null);
    };

    const renderModalContent = () => {
        switch (formType) {
            case "stage":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className="modal-text-field"
                                label="Stage Name"
                                variant="outlined"
                                fullWidth
                                required
                                name="stageName"
                                value={formData.stageName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label className="custom-file-upload">
                                <input type="file" required onChange={(e) => handleFileChange(formType, e)} />
                                Upload Image
                            </label>
                            {fileNames[formType] && <span className="file-name">{fileNames[formType]}</span>}
                        </Grid>
                    </Grid>
                );
            case "vertical":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className="modal-text-field"
                                label="Vertical Name"
                                variant="outlined"
                                fullWidth
                                required
                                name="verticalName"
                                value={formData.verticalName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <label className="custom-file-upload">
                                <input type="file" required onChange={(e) => handleFileChange(formType, e)} />
                                Upload Image
                            </label>
                            {fileNames[formType] && <span className="file-name">{fileNames[formType]}</span>}
                        </Grid>
                    </Grid>
                );
            case "team":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className="modal-text-field"
                                label="Team Name"
                                variant="outlined"
                                fullWidth
                                required
                                name="functionName"
                                value={formData.functionName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                );
            case "demoDay":
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className="modal-text-field"
                                label="Demo Day Number"
                                type="number"
                                variant="outlined"
                                fullWidth
                                required
                                name="number"
                                value={formData.number}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className="modal-text-field"
                                label="Year"
                                type="number"
                                variant="outlined"
                                fullWidth
                                required
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };

    const getFormTitle = (type) => {
        const titles = {
            stage: editItemId ? "Update Stage" : "Add Stage",
            vertical: editItemId ? "Update Vertical" : "Add Vertical",
            team: editItemId ? "Update Team" : "Add Team",
            demoDay: editItemId ? "Update Demo Day" : "Add Demo Day",
        };
        return titles[type] || "";
    };

    return (
        <div className="admin-page">
            <div className="sidebar">
                <h2>Administration</h2>
                <ul>
                    <li className={activeTab === "stages" ? "active" : ""} onClick={() => setActiveTab("stages")}>
                        Stage Management
                    </li>
                    <li className={activeTab === "verticals" ? "active" : ""} onClick={() => setActiveTab("verticals")}>
                        Verticals Management
                    </li>
                    <li className={activeTab === "team" ? "active" : ""} onClick={() => setActiveTab("team")}>
                        Team Management
                    </li>
                    <li className={activeTab === "demoDay" ? "active" : ""} onClick={() => setActiveTab("demoDay")}>
                        Demo Day Management
                    </li>
                    <li className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>
                        User Management
                    </li>
                </ul>
            </div>
            <div className="content-area">
                <h2>
                    {activeTab === "team"
                        ? "Team"
                        : activeTab === "demoDay"
                        ? "Demo Day"
                        : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, " ")}{" "}
                    Management
                </h2>
                <div className="action-buttons">
                    {activeTab !== "users" && (
                        <button
                            className="add-button"
                            onClick={() =>
                                handleAddButtonClick(
                                    activeTab === "team"
                                        ? "team"
                                        : activeTab === "demoDay"
                                        ? "demoDay"
                                        : activeTab.slice(0, -1)
                                )
                            }
                        >
                            Add{" "}
                            {activeTab === "team"
                                ? "Team"
                                : activeTab === "demoDay"
                                ? "Demo Day"
                                : activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                        </button>
                    )}
                    {(activeTab === "stages" || activeTab === "verticals") && (
                        <div className="icon-download-link">
                            <a href="https://www.flaticon.com/" target="_blank" rel="noopener noreferrer">
                                Download Icons (512x512 px)
                            </a>
                        </div>
                    )}
                </div>

                {activeTab === "stages" && (
                    <Table
                        columns={stageColumns}
                        data={stages}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        className="stages-table"
                        showActions={true}
                    />
                )}
                {activeTab === "verticals" && (
                    <Table
                        columns={verticalColumns}
                        data={verticals}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        className="vertical-table"
                        showActions={true}
                    />
                )}
                {activeTab === "team" && (
                    <Table
                        columns={teamColumns}
                        data={functions}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        className="team-table"
                        showActions={true}
                    />
                )}
                {activeTab === "demoDay" && (
                    <Table
                        columns={demoDayColumns}
                        data={demoDays}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        className="demo-day-table"
                        showActions={true}
                    />
                )}
                {activeTab === "users" && (
                    <Table
                        columns={userColumns}
                        data={transformedUsers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        className="user-table"
                        showActions={false}
                    />
                )}
            </div>
            {showModal && (
                <Modal onClose={closeModal}>
                    <h2>{getFormTitle(formType)}</h2>
                    {renderModalContent()}
                    <Button variant="contained" className="submit-button" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal>
            )}
            {showDeleteConfirm && (
                <Modal onClose={cancelDelete}>
                    <h2>Confirm Delete</h2>
                    <p>Are you sure you want to delete this item?</p>
                    <Button variant="contained" className="yes-confirm-button" onClick={confirmDelete}>
                        Yes
                    </Button>
                    <Button variant="outlined" className="no-confirm-button" onClick={cancelDelete}>
                        No
                    </Button>
                </Modal>
            )}
        </div>
    );
};

export default Admin;
