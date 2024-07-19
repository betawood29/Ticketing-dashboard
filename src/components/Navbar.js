import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
  ListItemIcon,
  Button,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  AssignmentInd,
  ConfirmationNumber,
  ConfirmationNumberOutlined,
  FactCheck,
  HourglassFull,
  Logout,
  NotificationsActive,
  PhoneInTalk,
  SubtitlesOff,
} from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';
import CreateTicket from "./CreateTicket";
import { useDispatch } from "react-redux";
import { saveFormData } from "../redux/formSlice";
import TicketTable from "./TicketTable";
const Layout = (props) => {
    const dispatch=useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All Tickets");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit=(values,props)=>{
    const ticketWithId = { ...values, id: uuidv4() };
    dispatch(saveFormData(ticketWithId));
    setTimeout(()=>{
        props.resetForm();
        props.setSubmitting(false);
        handleClose();
      },1000)
  }
  const handleFilterChange = (filter) => {
    setFilter(filter);
    setSidebarOpen(false);
  };
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="Inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Tickets
          </Typography>
          <IconButton color="inherit">
            <PhoneInTalk />
          </IconButton>
          <IconButton color="inherit">
            <NotificationsActive />
          </IconButton>
          <Typography>{props.username}</Typography>
          <IconButton color="inherit">
            <Logout onClick={props.handleLogout}/>
          </IconButton>

        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        <Toolbar>
          <Typography variant="h6" paddingRight={5}>
            Views
          </Typography>
          <Button onClick={handleOpen}> <AddCircleIcon style={{color:'#000000'}} /></Button>
      <CreateTicket open={open} onClose={handleClose} onSubmit={handleSubmit} />
          
        </Toolbar>
        <Divider />
        <List>
          {[
            { label: "All Tickets", icon: <ConfirmationNumber /> },
            { label: "Pending", icon: <HourglassFull /> },
            { label: "Open", icon: <ConfirmationNumberOutlined /> },
            { label: "Closed", icon: <SubtitlesOff /> },
            { label: "Assigned to me", icon: <AssignmentInd /> },
            { label: "Completed by me", icon: <FactCheck /> },
          ].map((item, index) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton onClick={() => handleFilterChange(item.label)}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <TicketTable filter={filter} />

     
    </div>
  );
};

export default Layout;
