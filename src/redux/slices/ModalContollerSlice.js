import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddProjectModalOpen: false,
};

const modalControllerSlice = createSlice({
  name: 'modalController',
  initialState,
  reducers: {
    controlAddProjectModal: (state) => {
      state.isAddProjectModalOpen = !state.isAddProjectModalOpen;
    },
  },
});

export const { controlAddProjectModal } = modalControllerSlice.actions;
export default modalControllerSlice.reducer;
