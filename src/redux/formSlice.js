import { createSlice } from '@reduxjs/toolkit';

const loadStateFromLocalStorage = () => {
    try {
        const ticketState = localStorage.getItem('tickets');
        const userState = localStorage.getItem('loggedInUser');
        return {
          tickets: ticketState ? JSON.parse(ticketState) : [],
          loggedInUser: userState ? JSON.parse(userState) : null,
        };
    } catch (err) {
      console.error('Failed to load state from localStorage', err);
      return { tickets: [] ,loggedInUser: null}; 
    }
  };
const formSlice = createSlice({
  name: 'form',
  initialState:loadStateFromLocalStorage(),
  reducers: {
    saveFormData: (state, action) => {
      state.tickets.push(action.payload);
      saveStateToLocalStorage(state.tickets,state.loggedInUser);
    },
    setLoggedInUser:(state,action)=>{
        state.loggedInUser=action.payload;
        saveStateToLocalStorage(state.tickets,state.loggedInUser);
    },
    logoutUser:(state)=>{
        state.loggedInUser=null;
        saveStateToLocalStorage(state.tickets,state.loggedInUser);
    },
    deleteTicket:(state,action)=>{
        state.tickets=state.tickets.filter(ticket=>ticket.id!==action.payload);
        saveStateToLocalStorage(state.tickets,state.loggedInUser);
    },
    updateTicket: (state, action) => {
        const index = state.tickets.findIndex(ticket => ticket.id === action.payload.id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
          saveStateToLocalStorage(state.tickets,state.loggedInUser);
        }
      },
}});
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


export const { saveFormData,setLoggedInUser,loggedInUser,logoutUser,deleteTicket,updateTicket } = formSlice.actions;
export default formSlice.reducer;
