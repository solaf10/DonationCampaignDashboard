import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAddProjectDetailModalOpen: false,
  isAddBySelectionModalOpen: false,
  isControlLocationModalOpen: false,
  isControlMediaModalOpen: false,

  // More Menu
  isMoreInfoMenuShown: false,
  selectedMoreInfoModal: null,

  // Success Dialog
  isSuccessDialogOpen: false,
  successDialogType: 'delete',

  controlLocationModalType: 'add',
  controlProjectDetailModalType: 'add',
  mediaType: 'image',

  clickedDialogID: null,
  selectedLocationID: null,
  selectedAddSrcID: null,
  selectedProjectDetailID: null,
  selectedMediaItemID: null,
};

const modalControllerSlice = createSlice({
  name: 'modalController',

  initialState,

  reducers: {
    /* ================= Add Project Detail Modal ================= */
    controlAddProjectDetailModalOpen: (state, action) => {
      state.isAddProjectDetailModalOpen = !state.isAddProjectDetailModalOpen;
      state.controlProjectDetailModalType = action.payload.type;
      state.selectedProjectDetailID = action.payload.id || null;
    },

    /* ================= Add By Selection Modal ================= */
    controlAddBySelectionModal: (state, action) => {
      state.isAddBySelectionModalOpen = !state.isAddBySelectionModalOpen;

      state.selectedAddSrcID = action.payload;
    },
    /* ================= ControlMedia Modal ================= */
    controlControlMediaModal: (state, action) => {
      state.isControlMediaModalOpen = !state.isControlMediaModalOpen;

      state.selectedMediaItemID = action.payload.id;
      state.mediaType = action.payload.type;
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
  controlControlMediaModal,
} = modalControllerSlice.actions;

export default modalControllerSlice.reducer;
