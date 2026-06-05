import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddProjectDetailModalOpen: false,
  isAddBySelectionModalOpen: false,
  isControlLocationModalOpen: false,

  // More Menu
  isMoreInfoMenuShown: false,
  selectedMoreInfoModal: null,

  // Success Dialog
  isSuccessDialogOpen: false,
  successDialogType: 'delete',

  controlLocationModalType: 'add',

  clickedDialogID: null,
  selectedLocationID: null,
  selectedAddSrcID: null,
};

const modalControllerSlice = createSlice({
  name: 'modalController',

  initialState,

  reducers: {
    /* ================= Add Project Detail Modal ================= */
    controlAddProjectDetailModalOpen: (state) => {
      state.isAddProjectDetailModalOpen = !state.isAddProjectDetailModalOpen;
    },

    /* ================= Add By Selection Modal ================= */
    controlAddBySelectionModal: (state, action) => {
      state.isAddBySelectionModalOpen = !state.isAddBySelectionModalOpen;

      state.selectedAddSrcID = action.payload;
    },

    /* ================= Location Modal ================= */
    controlControlLocationModal: (state, action) => {
      state.isControlLocationModalOpen = !state.isControlLocationModalOpen;

      state.controlLocationModalType = action.payload.type;
      state.selectedLocationID = action.payload.id;
    },

    /* ================= More Info Menu ================= */

    // فتح القائمة
    openMoreInfoMenu: (state, action) => {
      state.isMoreInfoMenuShown = true;
      state.selectedMoreInfoModal = action.payload;
    },

    // إغلاق القائمة
    closeMoreInfoMenu: (state) => {
      state.isMoreInfoMenuShown = false;
      state.selectedMoreInfoModal = null;
    },

    /* ================= Success Dialog ================= */
    controlSuccessDialog: (state, action) => {
      state.isSuccessDialogOpen = !state.isSuccessDialogOpen;

      state.successDialogType = action.payload.type;
      state.clickedDialogID = action.payload.id;
    },
  },
});

export const {
  controlAddProjectDetailModalOpen,
  controlAddBySelectionModal,
  controlControlLocationModal,

  // More Menu
  openMoreInfoMenu,
  closeMoreInfoMenu,

  controlSuccessDialog,
} = modalControllerSlice.actions;

export default modalControllerSlice.reducer;
