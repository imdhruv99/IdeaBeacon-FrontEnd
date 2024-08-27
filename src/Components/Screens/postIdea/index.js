import "./PostIdeaPage.css";
import "react-quill/dist/quill.snow.css";

import { useForm, Controller } from "react-hook-form";
import {
  Autocomplete,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormHelperText
} from "@mui/material";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { createIdea } from "../../Redux/api/ideaAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostIdeaPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verticals, functions, users, tags } = useSelector((state) => state.common);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      ideaVerticalId: "",
      title: "",
      problemStatement: "",
      advantage: "",
      proposedSolution: "",
      existingSolution: "",
      functionId: "",
      coauthors: [],
      tags: []
    },
    mode: "onBlur"
  });

  const onSubmit = async (data) => {
    data["isActive"] = true;

    if (data.coauthors.length > 0) {
      const selectedUserIds = users.filter((user) => data.coauthors.includes(user.name)).map((user) => user._id);
      data.coauthors = selectedUserIds;
    }

    await dispatch(createIdea(data));
    navigate(`/ideas`);
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

  return (
    <div className="post-idea-page">
      <h1>Post Your Idea</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-row">
          <div className="card" style={{ width: "30%" }}>
            <FormControl fullWidth margin="normal" className="flex-item" error={!!errors.ideaVerticalId}>
              <InputLabel>Idea Vertical</InputLabel>
              <Controller
                name="ideaVerticalId"
                control={control}
                rules={{ required: "Idea Vertical is required" }}
                render={({ field }) => (
                  <Select {...field} label="Idea Vertical" inputProps={{ id: "ideaVerticalId" }}>
                    {verticals.map((vertical) => (
                      <MenuItem key={vertical._id} value={vertical._id}>
                        {vertical.verticalName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.ideaVerticalId && <FormHelperText>{errors.ideaVerticalId.message}</FormHelperText>}
            </FormControl>
          </div>

          <div className="card">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Synopsis is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Synopsis"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={1}
                  className="flex-item flex-grow"
                  error={!!errors.title}
                  helperText={errors.title?.message}
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
              rules={{ required: `${field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())} is required` }}
              render={({ field }) => <ReactQuill {...field} modules={modules} theme="snow" className="quill-editor" />}
            />
            {errors[field] && <FormHelperText error>{errors[field].message}</FormHelperText>}
          </div>
        ))}

        <div className="flex-row">
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item" error={!!errors.functionId}>
              <InputLabel>Team</InputLabel>
              <Controller
                name="functionId"
                control={control}
                rules={{ required: "Team selection is required" }}
                render={({ field }) => (
                  <Select {...field} label="Team">
                    {functions.map((func) => (
                      <MenuItem key={func._id} value={func._id}>
                        {func.functionName}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.functionId && <FormHelperText>{errors.functionId.message}</FormHelperText>}
            </FormControl>
          </div>
        </div>

        <div className="flex-row">
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item" error={!!errors.coauthors}>
              <InputLabel id="demo-multiple-name-label">Co-Authors/SME</InputLabel>
              <Controller
                name="coauthors"
                control={control}
                rules={{ required: "Co-Authors/SME selection is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Co-Authors/SME"
                    multiple
                    onChange={(e) => setValue(field.name, e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {users.map((author) => (
                      <MenuItem key={author._id} value={author.name}>
                        {author.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.coauthors && <FormHelperText>{errors.coauthors.message}</FormHelperText>}
            </FormControl>
          </div>
          <div className="card">
            <FormControl fullWidth margin="normal" className="flex-item" error={!!errors.tags}>
              <Controller
                name="tags"
                control={control}
                rules={{ required: "At least one tag is required" }}
                render={({ field }) => (
                  <Autocomplete
                    multiple
                    freeSolo
                    options={tags.map(tag => tag.name)}
                    value={field.value}
                    onChange={(event, newValue) => setValue(field.name, newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tags"
                        variant="outlined"
                        error={!!errors.tags}
                        helperText={errors.tags?.message}
                      />
                    )}
                  />
                )}
              />
            </FormControl>
          </div>
        </div>

        <div className="form-actions card">
          <Button type="submit" variant="contained" color="primary">
            Publish
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostIdeaPage;
