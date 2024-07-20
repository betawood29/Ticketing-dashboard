// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from './ticketSlice';

export default configureStore({
  reducer: {
    tickets: ticketReducer,
  },
});
