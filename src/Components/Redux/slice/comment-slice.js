import { createSlice } from "@reduxjs/toolkit";
import { createComment, getIdeaCommentsList } from "../api/commentAPI";

const initialState = {
    commentList: [],
};

export const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // create comment slice
        builder.addCase(createComment.fulfilled, (state, action) => {
            const data = action.payload.comments;

            state.commentList = data;
        });
        builder.addCase(createComment.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ createComment:", action);
        });

        // get comment slice
        builder.addCase(getIdeaCommentsList.fulfilled, (state, action) => {
            const data = action.payload.comments;
            state.commentList = data;
        });
        builder.addCase(getIdeaCommentsList.rejected, (state, action) => {
            console.log("🚀 ~ rejected ~ getComment:", action);
        });
    }
});

export default commentSlice.reducer;
