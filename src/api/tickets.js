// src/api/tickets.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tickets';

export const fetchTickets = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTicket = async (ticket) => {
  const response = await axios.post(`${API_URL}/create`, ticket);
  return response.data;
};

export const updateTicket = async (ticket) => {
  const response = await axios.put(`${API_URL}/update/${ticket.id}`, ticket);
  return response.data;
};

export const deleteTicket = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
