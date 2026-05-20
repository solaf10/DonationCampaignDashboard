import { createSlice } from '@reduxjs/toolkit';

const initialState = { anchorEl: null };

const MenuAnchorElSlice = createSlice({
  name: 'menuAnchorEl',
  initialState,
  reducers: {
    setAnchorEl: (state, action) => {
      state.anchorEl = action.payload;
    },
  },
});

export const { setAnchorEl } = MenuAnchorElSlice.actions;
export default MenuAnchorElSlice.reducer;
