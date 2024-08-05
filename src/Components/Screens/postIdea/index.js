import "./PostIdeaPage.css";
import "react-quill/dist/quill.snow.css";

import React from "react";
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

import { createIdea } from "../../Redux/api/ideaAPI";
import { getAllSubDivByFunId } from "../../Redux/api/comonAPI";

const coAuthorsOptions = ["Author 1", "Author 2", "Author 3"];
const tagsOptions = ["Tag 1", "Tag 2", "Tag 3"];

const PostIdeaPage = () => {
  const dispatch = useDispatch();

  const { categories, functions, subdivisions, userList } = useSelector((state) => state.comon);

  const { control, handleSubmit, watch, setValue, reset } = useForm();
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

    await dispatch(createIdea(data));
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
  };

  return (
    <div className="post-idea-page">
      <h1>Post Your Idea</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-row">
          <FormControl fullWidth margin="normal" className="flex-item">
            <InputLabel>Idea Category</InputLabel>
            <Controller
              name="ideaCategoryId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Idea Category">
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

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

        {["problemStatement", "advantage", "proposedSolution", "existingSolution"].map((field) => (
          <div className="quill-wrapper" key={field}>
            <InputLabel>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</InputLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => <ReactQuill {...field} modules={modules} theme="snow" className="quill-editor" />}
            />
          </div>
        ))}

        <div className="flex-row">
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

          <FormControl fullWidth margin="normal" className="flex-item">
            <InputLabel>Function</InputLabel>
            <Controller
              name="functionId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Function" onClick={() => handleOnFunctionClick(field.value)}>
                  {functions.map((func) => (
                    <MenuItem key={func._id} value={func._id}>
                      {func.functionName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>

          {selectedFunction && (
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
          )}
        </div>

        <div className="flex-row">
          <Controller
            name="coauthors"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" className="flex-item">
                <InputLabel>Co-Authors</InputLabel>
                <Select
                  multiple
                  value={field.value}
                  onChange={(e) => setValue(field.name, e.target.value)}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {userList.map((author) => (
                    <MenuItem key={author._id} value={author.name}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />

          <Controller
            name="tags"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" className="flex-item">
                <InputLabel>Tags</InputLabel>
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
              </FormControl>
            )}
          />
        </div>

        <Controller
          name="isPrivate"
          control={control}
          defaultValue={false}
          render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Private" />}
        />

        <div className="form-actions">
          <Button type="submit" variant="contained" color="primary">
            Publish
          </Button>
          <Button type="button" variant="outlined" color="secondary">
            Save Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostIdeaPage;
