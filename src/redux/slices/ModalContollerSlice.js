import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModalOpen: false,
};

const modalControllerSlice = createSlice({
  name: "modalController",
  initialState,
  reducers: {
    controlAddModal: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
  },
});

export const { controlAddModal } = modalControllerSlice.actions;
export default modalControllerSlice.reducer;
