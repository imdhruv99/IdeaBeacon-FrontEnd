import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Checkbox, FormControlLabel, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './PostIdeaPage.css';

// Example options
const categories = ['Tech', 'Science', 'Art'];
const functions = ['Function 1', 'Function 2'];
const subdivisions = ['Sub 1', 'Sub 2'];
const coAuthorsOptions = ['Author 1', 'Author 2', 'Author 3'];
const tagsOptions = ['Tag 1', 'Tag 2', 'Tag 3'];

const PostIdeaPage = () => {
  const { control, handleSubmit, watch, setValue } = useForm();
  const selectedFunction = watch('function');

  const onSubmit = (data) => {
    console.log(data);
  };

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['code-block'],
    ],
  };

  return (
    <div className="post-idea-page">
      <h1>Post Your Idea</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Idea Category</InputLabel>
          <Controller
            name="ideaCategory"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Idea Category">
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Controller
          name="synopsis"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField {...field} label="Synopsis" fullWidth margin="normal" multiline rows={1} />
          )}
        />

        {['description', 'advantages', 'proposedSolution', 'existingSolution'].map((field) => (
          <div className="quill-wrapper" key={field}>
            <InputLabel>{field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}</InputLabel>
            <Controller
              name={field}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <ReactQuill {...field} modules={modules} theme="snow" className="quill-editor" />
              )}
            />
          </div>
        ))}

        <br/>

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
            />
          )}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Function</InputLabel>
          <Controller
            name="function"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select {...field} label="Function">
                {functions.map((func) => (
                  <MenuItem key={func} value={func}>
                    {func}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {selectedFunction && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Sub Division</InputLabel>
            <Controller
              name="subDivision"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select {...field} label="Sub Division">
                  {subdivisions.map((sub) => (
                    <MenuItem key={sub} value={sub}>
                      {sub}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        )}

        <Controller
          name="isPrivate"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <FormControlLabel control={<Checkbox {...field} />} label="Private" />
          )}
        />

        <Controller
          name="coAuthors"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel>Co-Authors</InputLabel>
              <Select
                multiple
                value={field.value}
                onChange={(e) => setValue(field.name, e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {coAuthorsOptions.map((author) => (
                  <MenuItem key={author} value={author}>
                    {author}
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Tags</InputLabel>
              <Select
                multiple
                value={field.value}
                onChange={(e) => setValue(field.name, e.target.value)}
                renderValue={(selected) => selected.join(', ')}
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