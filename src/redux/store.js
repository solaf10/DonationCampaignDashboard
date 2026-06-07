import { configureStore } from '@reduxjs/toolkit';
import modalControllerReducer from './slices/ModalContollerSlice';
import authReducer from './slices/Auth';

const store = configureStore({
  reducer: {
    modalController: modalControllerReducer,
    auth: authReducer,
  },
});

export default store;
