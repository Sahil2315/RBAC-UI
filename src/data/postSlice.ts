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
  outer: number,
  inner: number
}

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
      
    }
  },
});

export const { addComment } = postSlice.actions;
export default postSlice.reducer;
