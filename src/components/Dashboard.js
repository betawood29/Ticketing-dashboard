import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/formSlice';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const username = useSelector((state) => state.form.loggedInUser?.username);
  const handleLogout = () => {
    dispatch(logoutUser(null));
    navigate('/');

  };

  return (
    <>
    <Navbar username={username} handleLogout={handleLogout}/>
    {/* <TicketTable/> */}
    </>
  );
};

export default Dashboard;
