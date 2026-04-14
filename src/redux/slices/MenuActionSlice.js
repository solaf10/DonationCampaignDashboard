import { createSlice } from '@reduxjs/toolkit';

const initialState = { actions: [] };

const MenuActionSlice = createSlice({
  name: 'menuAction',
  initialState,
  reducers: {
    setActions: (state, payload) => {
      state.actions = payload.payload;
    },
  },
});

export const { setActions } = MenuActionSlice.actions;
export default MenuActionSlice.reducer;
