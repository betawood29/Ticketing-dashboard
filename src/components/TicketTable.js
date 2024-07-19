import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Box, InputAdornment, TextField, Pagination, DialogActions, Button, DialogContentText, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { Delete, Edit, Sms, Email, Phone, Search, WhatsApp } from '@mui/icons-material';
import { deleteTicket, updateTicket } from '../redux/formSlice';
import CreateTicket from './CreateTicket';
import TicketDetailView from './TicketDetailView';

const TicketTable = ({filter}) => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.form.tickets);
  const loggedInUsername=useSelector((state)=>state.form.loggedInUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [editTicket, setEditTicket] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDetailViewOpen, setDetailViewOpen] = useState(false);
  const ticketsPerPage = 5;

  const handleDelete = (id) => {
    setTicketToDelete(id);
    setDeleteConfirmOpen(true);
  };
  const confirmDelete = () => {
    dispatch(deleteTicket(ticketToDelete));
    setDeleteConfirmOpen(false);
    setTicketToDelete(null);
  };
  const handleEdit = (ticket) => {
    setEditTicket(ticket);
    setOpenEditDialog(true);
  };
  const handleEditSubmit = (values) => {
    dispatch(updateTicket(values));
    setOpenEditDialog(false);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setDetailViewOpen(true);
  };

  const handleDetailClose = () => {
    setDetailViewOpen(false);
    setSelectedTicket(null);
  };

  // Map icons to source
  const sourceIcons = {
    sms: <Sms />,
    gmail: <Email />,
    mobile: <Phone />,
    whatsapp:  <WhatsApp />,
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low':
        return 'bg-green-300';
      case 'medium':
        return 'bg-yellow-300';
      case 'high':
        return 'bg-red-300';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-red-300';
      case 'open':
        return 'bg-blue-300';
      case 'closed':
        return 'bg-green-300';
      default:
        return '';
    }
  };

 
  const filteredTickets = tickets.filter(ticket => {
    if (filter === "All Tickets") {
      return true;
    } else if (filter === "Assigned to me") {
        return ticket.username === loggedInUsername.username;
      }else {
      return ticket.status.toLowerCase() === filter.toLowerCase();
    }
  }).filter(ticket =>
    ticket.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.remarks.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.dueDate.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div className="flex justify-center py-8">
      <TableContainer component={Paper} className=" max-w-5xl border border-gray-300 rounded-lg shadow-md">
        <Typography variant="h6" gutterBottom component="div" className="p-4 bg-gray-100 border-b border-gray-300">
        <TextField
        variant="outlined"
        placeholder="Search Tickets"
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        className="mb-4 w-full max-w-lg"
      />
   </Typography>
          
        <Table aria-label="tickets table">
          <TableHead>
            <TableRow className="bg-gray-300">
              <TableCell className='text-black'>Ticket Id</TableCell>
              <TableCell className='text-black'>Username</TableCell>
              <TableCell className="font-black">Title</TableCell>
              <TableCell className="font-black">Status</TableCell>
              <TableCell className="font-black">Source</TableCell>
              <TableCell className="font-black">Remarks</TableCell>
              <TableCell className="font-black">Priority</TableCell>
              <TableCell className="font-black">Due Date</TableCell>
              <TableCell className="font-black">Edit</TableCell>
              <TableCell className="font-black">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTickets.map((ticket, index) => (
              <TableRow key={index} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleRowClick(ticket)}>
                <TableCell className='text-wrap'>{index+1}</TableCell>
                <TableCell>{ticket.username}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell  ><Box className={getStatusColor(ticket.status)} >{ticket.status}</Box></TableCell>
                <TableCell>
                  {sourceIcons[ticket.source] || 'Unknown'}
                </TableCell>
                <TableCell>{ticket.remarks}</TableCell>
                <TableCell><Box className={getPriorityColor(ticket.priority)}>{ticket.priority}</Box></TableCell>
                <TableCell>{ticket.dueDate}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => {event.stopPropagation();handleEdit(ticket)}} color="primary">
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton onClick={(event) => {event.stopPropagation();handleDelete(ticket.id)}} color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination
        count={Math.ceil(filteredTickets.length / ticketsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        className="mt-4"
      />
      </TableContainer>
      
      <CreateTicket
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
        onSubmit={handleEditSubmit}
        initialValues={editTicket}
      />
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete Ticket</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ticket?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
      <TicketDetailView open={isDetailViewOpen} onClose={handleDetailClose} ticket={selectedTicket}/>

    </div>
  );
};

export default TicketTable;
