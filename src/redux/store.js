import { configureStore } from '@reduxjs/toolkit';
import modalControllerReducer from './slices/ModalContollerSlice';
import menuActionReducer from './slices/MenuActionSlice';

const store = configureStore({
  reducer: {
    modalController: modalControllerReducer,
    menuAction: menuActionReducer,
  },
});

export default store;
