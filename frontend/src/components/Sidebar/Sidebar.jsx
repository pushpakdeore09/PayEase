import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Drawer,
  IconButton,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DescriptionIcon from "@mui/icons-material/Description";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import MenuIcon from "@mui/icons-material/Menu"; // Added for mobile menu toggle

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [openGeneralSetup, setOpenGeneralSetup] = useState(false);
  const [openEmployeeMgmt, setOpenEmployeeMgmt] = useState(false);
  const [openPayroll, setOpenPayroll] = useState(false);
  const [openAllowDed, setOpenAllowDed] = useState(false);
  const [openReports, setOpenReports] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer open state

  const toggleGeneralSetup = () => setOpenGeneralSetup(!openGeneralSetup);
  const toggleEmployeeMgmt = () => setOpenEmployeeMgmt(!openEmployeeMgmt);
  const togglePayroll = () => setOpenPayroll(!openPayroll);
  const toggleAllowDed = () => setOpenAllowDed(!openAllowDed);
  const toggleReports = () => setOpenReports(!openReports);

  const handleDepartment = () => {
    navigate("/department");
  };

  const handleEmployees = () => {
    navigate("/employee");
  };

  const handleAddEmployee = () => {
    navigate("/addEmployee");
  };

  const handlePayrollMonth = () => {
    navigate("/payrollMonth");
  };

  const handlePayroll = () => {
    navigate("/payroll");
  };

  const handleAllowances = () => {
    navigate("/allowances");
  };

  const handleDeductions = () => {
    navigate("/deductions");
  };

  const handleTax = () => {
    navigate("/tax");
  };

  const handleHomePage = () => {
    navigate("/home");
  };

  const handleReport = () => {
    navigate("/payrollReport");
  };

  const handlePaySlip = () => {
    navigate("/paySlip");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div>
      <h2 className="text-2xl font-bold text-center py-6 cursor-pointer" onClick={handleHomePage}>
        Payroll Management System
      </h2>
      <div>
        <h2 className="text-3xl font-semibold text-gray-100 px-8 py-4">
          Dashboard
        </h2>
      </div>
      <List>
        {/* General Setup Section */}
        <ListItem button onClick={toggleGeneralSetup} className="hover:bg-blue-600">
          <ListItemIcon>
            <ApartmentIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="General Setup" className="text-2xl cursor-pointer" />
          {openGeneralSetup ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGeneralSetup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleDepartment}>
              <ListItemIcon>
                <ApartmentIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Department" className="text-2xl cursor-pointer" />
            </ListItem>
          </List>
        </Collapse>
  
        {/* Employee Management Section */}
        <ListItem button onClick={toggleEmployeeMgmt} className="hover:bg-blue-600">
          <ListItemIcon>
            <PeopleIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Employee Management" className="text-2xl cursor-pointer" />
          {openEmployeeMgmt ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openEmployeeMgmt} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleEmployees}>
              <ListItemIcon>
                <PeopleIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Employees" className="text-2xl cursor-pointer" />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleAddEmployee}>
              <ListItemIcon>
                <PeopleIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Add Employee" className="text-2xl cursor-pointer" />
            </ListItem>
          </List>
        </Collapse>
  
        {/* Payroll Setup Section */}
        <ListItem button onClick={togglePayroll} className="hover:bg-blue-600">
          <ListItemIcon>
            <MonetizationOnIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Payroll Setup" className="text-2xl cursor-pointer" />
          {openPayroll ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPayroll} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handlePayrollMonth}>
              <ListItemIcon>
                <AttachMoneyIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Payroll Month" className="text-2xl cursor-pointer" />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handlePayroll}>
              <ListItemIcon>
                <CalendarTodayIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Payroll" className="text-2xl cursor-pointer" />
            </ListItem>
          </List>
        </Collapse>
  
        {/* Allowances & Deductions Section */}
        <ListItem button onClick={toggleAllowDed} className="hover:bg-blue-600">
          <ListItemIcon>
            <MonetizationOnIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Allowances & Deductions" className="text-2xl cursor-pointer" />
          {openAllowDed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAllowDed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleAllowances}>
              <ListItemIcon>
                <AttachMoneyIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Allowances" className="text-2xl cursor-pointer" />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleDeductions}>
              <ListItemIcon>
                <RemoveCircleOutlineIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Deductions" className="text-2xl cursor-pointer" />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleTax}>
              <ListItemIcon>
                <AttachMoneyIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Tax" className="text-2xl cursor-pointer" />
            </ListItem>
          </List>
        </Collapse>
  
        {/* Reports Section */}
        <ListItem button onClick={toggleReports} className="hover:bg-blue-600">
          <ListItemIcon>
            <DescriptionIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Reports" className="text-2xl cursor-pointer" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handleReport}>
              <ListItemIcon>
                <DescriptionIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Payroll Report" className="text-2xl cursor-pointer" />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600" onClick={handlePaySlip}>
              <ListItemIcon>
                <DescriptionIcon className="text-white" />
              </ListItemIcon>
              <ListItemText primary="Pay Slip" className="text-2xl cursor-pointer" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
  

  return (
    <div className="w-full">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className="md:hidden"
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            backgroundColor: "#1E40AF", 
            color: "white",
          },
        }}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, 
        }}
      >
        {drawerContent}
      </Drawer>

      <div className="hidden md:block w-80 bg-blue-700 min-h-screen text-white font-bold">
        {drawerContent}
      </div>
    </div>
  );
};

export default Sidebar;
