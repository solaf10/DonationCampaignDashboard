import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddBySelectionModalOpen: false,
  isControlLocationModalOpen: false,
  isMoreInfoMenuShown: false,
  isSuccessDialogOpen: false,
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
    controlSuccessDialog: (state) => {
      state.isSuccessDialogOpen = !state.isSuccessDialogOpen;
    },
  },
});

export const {
  controlAddBySelectionModal,
  controlControlLocationModal,
  controlMoreInfoMenu,
  controlSuccessDialog,
} = modalControllerSlice.actions;
export default modalControllerSlice.reducer;
