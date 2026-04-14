import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddProjectModalOpen: false,
  isControlLocationModalOpen: false,
};

const modalControllerSlice = createSlice({
  name: 'modalController',
  initialState,
  reducers: {
    controlAddProjectModal: (state) => {
      state.isAddProjectModalOpen = !state.isAddProjectModalOpen;
    },
    controlControlLocationModal: (state) => {
      state.isAddProjectModalOpen = !state.isAddProjectModalOpen;
    },
  },
});

export const { controlAddProjectModal, controlControlLocationModal } =
  modalControllerSlice.actions;
export default modalControllerSlice.reducer;
