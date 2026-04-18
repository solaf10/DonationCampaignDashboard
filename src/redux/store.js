import { configureStore } from '@reduxjs/toolkit';
import modalControllerReducer from './slices/ModalContollerSlice';
import menuAnchorElReducer from './slices/MenuAnchorElSlice';

const store = configureStore({
  reducer: {
    modalController: modalControllerReducer,
    menuAnchorEl: menuAnchorElReducer,
  },
});

export default store;
