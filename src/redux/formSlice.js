import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createTicket, deleteTicket, fetchTickets, updateTicket } from '../api/tickets';


export const fetchTicketsThunk=createAsyncThunk('form/fetchTickets',async()=>{
  const response=await fetchTickets();
  return response;
});

export const createTicketThunk=createAsyncThunk('form/createTicket',async(ticket)=>{
  const response=createTicket(ticket);
  return response;
});

export const updateTicketThunk=createAsyncThunk('form/updateTicket/id',async(id,ticket)=>{
  const response=updateTicket(id,ticket);
  return response;
  
});
export const deleteTicketThunk = createAsyncThunk('form/deleteTicket', async (id) => {
  await deleteTicket(id);
  return id;
});



const formSlice = createSlice({
  name: 'form',
  initialState:{
    tickets: [],
    loggedInUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoggedInUser:(state,action)=>{
        state.loggedInUser=action.payload;
        saveStateToLocalStorage(state.tickets,state.loggedInUser);
    },
    logoutUser:(state)=>{
        state.loggedInUser=null;
        saveStateToLocalStorage(state.tickets,state.loggedInUser);
    },
},

extraReducers: (builder) => {
  builder
    .addCase(fetchTicketsThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchTicketsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    })
    .addCase(fetchTicketsThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(createTicketThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createTicketThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets.push(action.payload);
      saveStateToLocalStorage(state.tickets, state.loggedInUser);
    })
    .addCase(createTicketThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(updateTicketThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateTicketThunk.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
        saveStateToLocalStorage(state.tickets, state.loggedInUser);
      }
    })
    .addCase(updateTicketThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })
    .addCase(deleteTicketThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteTicketThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
      saveStateToLocalStorage(state.tickets, state.loggedInUser);
    })
    .addCase(deleteTicketThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
},
});


const saveStateToLocalStorage=(tickets,loggedInUser)=>{
    try{
        const ticketState=JSON.stringify(tickets);
        localStorage.setItem('tickets',ticketState);
        if (loggedInUser !== null) {
            const userState = JSON.stringify(loggedInUser);
            localStorage.setItem('loggedInUser', userState);
          } else {
            localStorage.removeItem('loggedInUser');
          }
    }catch(err){
        console.log('Failed to save ticket to local storage',err);
    }
};


export const { setLoggedInUser,loggedInUser,logoutUser } = formSlice.actions;
export default formSlice.reducer;
