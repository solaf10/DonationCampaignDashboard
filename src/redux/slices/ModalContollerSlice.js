import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddProjectModalOpen: false,
  isControlLocationModalOpen: false,
};

const modalControllerSlice = createSlice({
  name: "modalController",
  initialState,
  reducers: {
    controlAddModal: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    controlControlLocationModal: (state) => {
      state.isAddProjectModalOpen = !state.isAddProjectModalOpen;
    },
  },
});

export const { controlAddProjectModal, controlControlLocationModal } =
  modalControllerSlice.actions;
export default modalControllerSlice.reducer;
