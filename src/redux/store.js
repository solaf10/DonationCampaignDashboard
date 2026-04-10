import { configureStore } from '@reduxjs/toolkit';
import modalControllerReducer from './slices/ModalContollerSlice';

const store = configureStore({
  reducer: {
    modalController: modalControllerReducer,
  },
});

export default store;
