import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  Box,
  Card,
  CardContent,
  Grid2,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssignmentIcon from "@mui/icons-material/Assignment";
import DescriptionIcon from "@mui/icons-material/Description";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import PeopleIcon from "@mui/icons-material/People";

const fontLink = document.createElement("link");
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const Homepage = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(to right, #e3f2fd, #bbdefb)", 
        minHeight: "100vh", 
        padding: "20px", 
        fontFamily: "Roboto, sans-serif", 
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <div style={{ marginLeft: "10px" }}>
          <Typography
            variant="h1"
            style={{ fontSize: "2rem", fontWeight: 700 }}
          >
            Welcome to PayEase
          </Typography>
        </div>
        <div style={{ marginRight: "20px" }}>
          <IconButton onClick={handleClick}>
            <Avatar sx={{ width: 50, height: 50, cursor: "pointer" }}>
              <PersonIcon sx={{ fontSize: 30 }} />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
      <Divider sx={{ height: 5, bgcolor: "black", margin: "10px 0" }} />

      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Payroll Management System
        </Typography>
        <Typography variant="h6" align="center" gutterBottom>
          PayEase allows you to manage employee payroll efficiently, including
          features for:
        </Typography>

        <Grid2 container spacing={3} sx={{ marginTop: "20px" }}>
          {[
            {
              title: "Add Departments",
              description:
                "Easily set up and manage various departments within your organization.",
              icon: <ApartmentIcon sx={{ fontSize: 40, marginBottom: 1 }} />,
            },
            {
              title: "Maintain Employee Data",
              description:
                "Maintain employee information for quick setup.",
              icon: <PeopleIcon sx={{ fontSize: 40, marginBottom: 1 }} />,
            },
            {
              title: "Setup Payroll",
              description:
                "Configure payroll with tax limitations for accurate calculations.",
              icon: <AttachMoneyIcon sx={{ fontSize: 40, marginBottom: 1 }} />,
            },
            {
              title: "Manage Salaries",
              description: "Track and manage employee allowances & deductions effectively.",
              icon: <AssignmentIcon sx={{ fontSize: 40, marginBottom: 1 }} />,
            },
            {
              title: "Generate Reports",
              description:
                "Generate detailed payroll reports for better insights.",
              icon: <DescriptionIcon sx={{ fontSize: 40, marginBottom: 1 }} />,
            },
            {
              title: "PDF Pay Slips",
              description: "Generate and download PDF pay slips for employees.",
              icon: <PictureAsPdfIcon sx={{ fontSize: 40, marginBottom: 1 }} />,
            },
          ].map((item, index) => (
            <Grid2
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              display="flex"
              justifyContent="center"
            >
              <Card
                sx={{
                  backgroundColor: "#f7f7f7",
                  boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
                  textAlign: "center",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                  width: "100%",
                  maxWidth: 350,
                  height: "200px",
                }}
              >
                <CardContent>
                  {item.icon}
                  <Typography
                    variant="h5"
                    component="div"
                    sx={{ fontWeight: "500" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

export default Homepage;
