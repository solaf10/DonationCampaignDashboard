import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddBySelectionModalOpen: false,
  isControlLocationModalOpen: false,
  isMoreInfoMenuShown: false,
  isSuccessDialogOpen: false,
  controlLocationModalType: 'add',
  selectedLocationID: null,
};

const modalControllerSlice = createSlice({
  name: 'modalController',
  initialState,
  reducers: {
    controlAddBySelectionModal: (state) => {
      state.isAddBySelectionModalOpen = !state.isAddBySelectionModalOpen;
    },
    controlControlLocationModal: (state, action) => {
      state.isControlLocationModalOpen = !state.isControlLocationModalOpen;
      state.controlLocationModalType = action.payload.type;
      state.selectedLocationID = action.payload.id;
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
