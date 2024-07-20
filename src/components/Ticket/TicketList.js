// src/components/TicketList.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTicket } from '../../redux/ticketSlice';

const TicketList = () => {
  const tickets = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTicket(id));
  };

  return (
    <div>
      <h2>Ticket List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.status}</td>
              <td>
                <button onClick={() => handleDelete(ticket.id)}>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TicketList;
