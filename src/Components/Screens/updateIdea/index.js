import "./UpdateIdeaPage.css";
import "react-quill/dist/quill.snow.css";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";

import { createIdea, updateIdea } from "../../Redux/api/ideaAPI";
import { getAllSubDivByFunId } from "../../Redux/api/commonAPI";
import { resetIdea, setIsUpdatingIdea } from "../../Redux/slice/idea-slice";

const tagsOptions = ["Tag 1", "Tag 2", "Tag 3"];

const UpdateIdea = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categories, functions, subdivisions, userList } = useSelector((state) => state.common);
  const { idea, isUpdatingIdea } = useSelector((state) => state.idea);

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      ideaCategoryId: idea?.ideaCategoryId._id || "",
      title: idea?.title || "",
      problemStatement: idea?.problemStatement || "",
      advantage: idea?.advantage || "",
      proposedSolution: idea?.proposedSolution || "",
      existingSolution: idea?.existingSolution || "",
      presentableDate: moment(idea?.presentableDate).format("YYYY-MM-DD") || "",
      functionId: idea?.functionId._id || "",
      subdivisionId: idea?.subdivisionId._id || "",
      coauthors: idea?.coauthors.map((author) => author.name) || [],
      tags: idea?.tags || [],
      isPrivate: idea?.isPrivate || false,
    },
  });

  const selectedFunction = watch("functionId");

  const handleOnFunctionClick = (functionId) => {
    dispatch(getAllSubDivByFunId(functionId));
  };

  const onSubmit = async (data) => {
    data["isActive"] = true;

    if (data.coauthors.length > 0) {
      const selectedUserIds = userList.filter((user) => data.coauthors.includes(user.name)).map((user) => user._id);

      data.coauthors = selectedUserIds;
    }

    data.id = idea._id;
    await dispatch(updateIdea(data));
    dispatch(setIsUpdatingIdea(false));
    dispatch(resetIdea());
    navigate(`/idea-details/${idea._id}`);

    reset();
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["code-block"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  useEffect(() => {
    if (selectedFunction || isUpdatingIdea) handleOnFunctionClick(selectedFunction);
  }, [selectedFunction, isUpdatingIdea]);

  return (
    <div className="post-idea-page">
      <h1>Update Your Idea</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-row">
          <div className="card" style={{ width: "30%" }}>
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel>Idea Category</InputLabel>
              <Controller
                name="ideaCategoryId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Idea Category" inputProps={{ id: "ideaCategoryId" }}>
                    {categories.map((category) => (
                      <MenuItem key={category._id} value={category._id}>
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          <div className="card">
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Synopsis"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={1}
                  className="flex-item flex-grow"
                />
              )}
            />
          </div>
        </div>

        {["problemStatement", "advantage", "proposedSolution", "existingSolution"].map((field) => (
          <div className="quill-wrapper card" key={field}>
            <div className="quill-custom-label">
              <InputLabel>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</InputLabel>
            </div>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <ReactQuill {...field} modules={modules} theme="snow" className="quill-editor" />}
            />
          </div>
        ))}

        <div className="flex-row">
          <div className="card">
            <Controller
              name="presentableDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Presentable Date"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  className="flex-item"
                />
              )}
            />
          </div>

          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel>Function</InputLabel>
              <Controller
                name="functionId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field} label="Function">
                    {functions.map((func) => (
                      <MenuItem key={func._id} value={func._id}>
                        {func.functionName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>

          {selectedFunction && (
            <div className="card">
              <FormControl fullWidth margin="normal" className="flex-item" disabled={!subdivisions.length > 0}>
                <InputLabel>Sub Division</InputLabel>
                <Controller
                  name="subdivisionId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select {...field} label="Sub Division">
                      {subdivisions.map((sub) => (
                        <MenuItem key={sub._id} value={sub._id}>
                          {sub.subdivisionName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </div>
          )}
        </div>

        <div className="flex-row">
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel id="demo-multiple-name-label">Co-Authors</InputLabel>
              <Controller
                name="coauthors"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    onChange={(e) => setValue(field.name, e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {userList.map((author) => (
                      <MenuItem key={author._id} value={author.name}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item">
              <InputLabel>Tags</InputLabel>
              <Controller
                name="tags"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <Select
                    multiple
                    value={field.value}
                    onChange={(e) => setValue(field.name, e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {tagsOptions.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="card">
          <Controller
            name="isPrivate"
            control={control}
            defaultValue={false}
            render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Private" />}
          />
        </div>

        <div className="form-actions card">
          <Button type="submit" variant="contained" color="primary">
            {"Publish"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateIdea;
