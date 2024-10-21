import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
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

import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const [openGeneralSetup, setOpenGeneralSetup] = useState(false);
  const [openEmployeeMgmt, setOpenEmployeeMgmt] = useState(false);
  const [openPayroll, setOpenPayroll] = useState(false);
  const [openAllowDed, setOpenAllowDed] = useState(false); 
  const [openReports, setOpenReports] = useState(false);

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
      navigate("/allowances")
  };

  const handleDeductions = () => {
    navigate("/deductions")
  };

  const handleTax = () => {
      navigate("/tax")
  };

  const handleHomePage = () => {
    navigate("/home");
  }

  const handleReport = () => {
    navigate("/payrollReport");
  }

  const handlePaySlip = () => {
    navigate("/paySlip");
  }

  return (
    <div className="w-80 bg-blue-700 min-h-screen text-white font-bold">
      <h2 className="text-2xl font-bold text-center py-6 cursor-pointer" onClick={handleHomePage}>
        Payroll Management System
      </h2>
      <div>
        <h2 className="text-3xl font-semibold text-gray-100 px-8 py-4">
          Dashboard
        </h2>
      </div>
      <List>
        <ListItem
          button
          onClick={toggleGeneralSetup}
          className="hover:bg-blue-600"
        >
          <ListItemIcon>
            <ApartmentIcon className="text-white" />
          </ListItemIcon>
          <ListItemText
            primary="General Setup"
            className="text-2xl cursor-pointer"
          />
          {openGeneralSetup ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openGeneralSetup} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <ApartmentIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Department"
                className="text-2xl cursor-pointer"
                onClick={handleDepartment}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem
          button
          onClick={toggleEmployeeMgmt}
          className="hover:bg-blue-600"
        >
          <ListItemIcon>
            <PeopleIcon className="text-white" />
          </ListItemIcon>
          <ListItemText
            primary="Employee Management"
            className="text-2xl cursor-pointer"
          />
          {openEmployeeMgmt ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openEmployeeMgmt} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <PeopleIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Employees"
                className="text-2xl cursor-pointer"
                onClick={handleEmployees}
              />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <PeopleIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Add Employee"
                className="text-2xl cursor-pointer"
                onClick={handleAddEmployee}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={togglePayroll} className="hover:bg-blue-600">
          <ListItemIcon>
            <MonetizationOnIcon className="text-white" />
          </ListItemIcon>
          <ListItemText
            primary="Payroll Setup"
            className="text-2xl cursor-pointer"
          />
          {openPayroll ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openPayroll} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <AttachMoneyIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Payroll Month"
                className="text-2xl cursor-pointer"
                onClick={handlePayrollMonth}
              />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <CalendarTodayIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Payroll"
                className="text-2xl cursor-pointer"
                onClick={handlePayroll}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={toggleAllowDed} className="hover:bg-blue-600"> 
          <ListItemIcon>
            <MonetizationOnIcon className="text-white" />
          </ListItemIcon>
          <ListItemText
            primary="Allowances & Deductions"
            className="text-2xl cursor-pointer"
          />
          {openAllowDed ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAllowDed} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <AttachMoneyIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Allowances"
                className="text-2xl cursor-pointer"
                onClick={handleAllowances}
              />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <RemoveCircleOutlineIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Deductions"
                className="text-2xl cursor-pointer"
                onClick={handleDeductions}
              />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <AttachMoneyIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Tax"
                className="text-2xl cursor-pointer"
                onClick={handleTax}
              />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={toggleReports} className="hover:bg-blue-600"> {/* Toggle Reports */}
          <ListItemIcon>
            <DescriptionIcon className="text-white" />
          </ListItemIcon>
          <ListItemText primary="Reports" className="text-2xl cursor-pointer" />
          {openReports ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openReports} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <DescriptionIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Payroll Report"
                className="text-2xl cursor-pointer"
                onClick={handleReport}
              />
            </ListItem>
            <ListItem button className="ml-6 hover:bg-blue-600">
              <ListItemIcon>
                <DescriptionIcon className="text-white" />
              </ListItemIcon>
              <ListItemText
                primary="Pay Slip"
                className="text-2xl cursor-pointer"
                onClick={handlePaySlip}
              />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default Sidebar;
