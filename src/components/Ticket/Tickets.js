// Example of using React.memo
import React, { memo } from 'react';

const TicketItem = ({ ticket, onDelete }) => {
  return (
    <div>
      <h3>{ticket.title}</h3>
      <button onClick={() => onDelete(ticket.id)}>Delete</button>
    </div>
  );
};

export default memo(TicketItem);
