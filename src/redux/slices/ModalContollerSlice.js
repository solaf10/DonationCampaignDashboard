import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddBySelectionModalOpen: false,
  isControlLocationModalOpen: false,
  isMoreInfoMenuShown: false,
};

const modalControllerSlice = createSlice({
  name: 'modalController',
  initialState,
  reducers: {
    controlAddBySelectionModal: (state) => {
      state.isAddBySelectionModalOpen = !state.isAddBySelectionModalOpen;
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
  controlAddBySelectionModal,
  controlControlLocationModal,
  controlMoreInfoMenu,
} = modalControllerSlice.actions;
export default modalControllerSlice.reducer;
