import { createSlice } from '@reduxjs/toolkit';
import tempRoles from "./temp/temproles.json"

const initialState = tempRoles

const roleSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state[0].name = action.payload
    },
  },
});

export const { login } = roleSlice.actions;
export default roleSlice.reducer;