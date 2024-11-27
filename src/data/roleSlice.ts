import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import tempRoles from "./temp/temproles.json";

let tempLocal = localStorage.getItem('roles-local')
let localJSON = JSON.parse(tempLocal as string)
const initialState = localJSON ? localJSON : tempRoles;

type doubleIndex = {
  outer: number;
  inner: number;
};

type doubleString = {
  permit: string;
  type: string;
  index: number;
};

const roleSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    deleteMembPerm: (state, action: PayloadAction<doubleIndex>) => {
      state[action.payload.outer].member_permissions.splice(
        action.payload.inner,
        1
      );
    },
    deletePostPerm: (state, action: PayloadAction<doubleIndex>) => {
      state[action.payload.outer].post_permissions.splice(
        action.payload.inner,
        1
      );
    },
    addPermission: (state, action: PayloadAction<doubleString>) => {
      if (action.payload.type == "member") {
        state[action.payload.index].member_permissions = [
          ...state[action.payload.index].member_permissions,
          action.payload.permit,
        ];
      } else {
        state[action.payload.index].post_permissions = [
          ...state[action.payload.index].post_permissions,
          action.payload.permit,
        ];
      }
    },
  },
});

export const { deleteMembPerm, deletePostPerm, addPermission } = roleSlice.actions;
export default roleSlice.reducer;
