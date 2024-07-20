// src/redux/ticketSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
  name: 'tickets',
  initialState: [],
  reducers: {
    addTicket: (state, action) => {
      const newTicket = {
        id: Date.now(),
        ...action.payload,
        status: 'open',
      };
      state.push(newTicket);
    },
    deleteTicket: (state, action) => {
      return state.filter((ticket) => ticket.id !== action.payload);
    },
    updateTicket: (state, action) => {
      const index = state.findIndex((ticket) => ticket.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTicket, deleteTicket, updateTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
