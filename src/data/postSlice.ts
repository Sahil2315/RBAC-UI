import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tempPosts from "./temp/tempposts.json";

let localPosts = localStorage.getItem("posts-local");
let localPostsJSON = JSON.parse(localPosts as string);
const initialState = localPostsJSON ? localPostsJSON : tempPosts;

type newComment = {
  index: number;
  content: string;
};
type dualIndex = {
  outer: number;
  inner: number;
};

const postSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<newComment>) => {
      state[action.payload.index].comments = [
        {
          writer: "User101",
          content: action.payload.content,
        },
        ...state[action.payload.index].comments,
      ];
    },
    deleteComment: (state, action: PayloadAction<dualIndex>) => {
      state[action.payload.outer].comments.splice(action.payload.inner, 1);
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
  },
});

export const { addComment, deleteComment, deletePost } = postSlice.actions;
export default postSlice.reducer;
