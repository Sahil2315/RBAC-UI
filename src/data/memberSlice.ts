import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tempMembers from "./temp/tempmembers.json";

let localMembers = localStorage.getItem("members-local");
let localMembersJSON = JSON.parse(localMembers as string);
const initialState = localMembersJSON ? localMembersJSON : tempMembers;

const memberSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addContributor: (state, action: PayloadAction<number>) => {
      state[action.payload].role = "Contributor";
    },
    addModerator: (state, action: PayloadAction<number>) => {
      state[action.payload].role = "Moderator";
    },
    deleteContributor: (state, action: PayloadAction<number>) => {
      state[action.payload].role = "Member";
    },
    deleteMember: (state, action: PayloadAction<number>) => {
      state[action.payload].role = "User";
    },
  },
});

export const { addContributor, deleteContributor, deleteMember, addModerator } =
  memberSlice.actions;
export default memberSlice.reducer;
