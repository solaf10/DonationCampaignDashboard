import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddProjectModalOpen: false,
  isControlLocationModalOpen: false,
  isMoreInfoMenuShown: false,
};

const modalControllerSlice = createSlice({
  name: 'modalController',
  initialState,
  reducers: {
    controlAddModal: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    controlControlLocationModal: (state) => {
      state.isAddProjectModalOpen = !state.isAddProjectModalOpen;
    },
    controlMoreInfoMenu: (state) => {
      state.isMoreInfoMenuShown = !state.isMoreInfoMenuShown;
    },
  },
});

export const {
  controlAddProjectModal,
  controlControlLocationModal,
  controlMoreInfoMenu,
} = modalControllerSlice.actions;
export default modalControllerSlice.reducer;
