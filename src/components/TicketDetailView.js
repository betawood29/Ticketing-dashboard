import React from 'react';
import { Drawer, Box, Typography, IconButton, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';

const TicketDetailView = ({ open, onClose, ticket }) => {
  if (!ticket) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box p={3} width="400px" sx={{ bgcolor: '#f4f6f8' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
            Ticket Details
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            ID:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {ticket.id}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Title:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {ticket.title}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Status:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {ticket.status}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Source:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {ticket.source}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Remarks:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {ticket.remarks}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Priority:
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {ticket.priority}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>
            Due Date:
          </Typography>
          <Typography variant="body2">
            {ticket.dueDate}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default TicketDetailView;
