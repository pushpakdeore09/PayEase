import React, { useState } from "react";
import {
  Typography,
  Divider,
  TextField,
  Button,
  MenuItem,
  Box,
  Grid2,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getPayrollReportData } from "../api/payrollReportApi";

const PayrollReport = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

const [employeeId, setEmployeeId] = useState("");
const [searchValues, setSearchValues] = useState({
  monthName: "",
  year: "",
});

  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await getPayrollReportData(employeeId, searchValues);
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handlePaySlip = () => {
    navigate("/paySlip");
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Payroll Report
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />
      <div>
        <TextField
          fullWidth
          label="Employee Id"
          size="small"
          onChange={(e) => {
            setEmployeeId(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <TextField
          fullWidth
          label="Payroll Month"
          size="small"
          select
          value={searchValues.monthName}
          onChange={(e) =>
            setSearchValues({ ...searchValues, monthName: e.target.value })
          }
          variant="outlined"
        >
          <MenuItem value="">Select Month</MenuItem>
          {months.map((month, index) => (
            <MenuItem key={index} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          label="Year"
          size="small"
          value={searchValues.year}
          onChange={(e) =>
            setSearchValues({ ...searchValues, year: e.target.value })
          }
          type="number"
          variant="outlined"
        />
      </div>
      <div className="col-span-3 flex justify-center space-x-4">
        <Button variant="contained" color="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Get Payroll
        </Button>
        <Button variant="contained" color="success" onClick={handlePaySlip}>
          Get Pay Slip
        </Button>
      </div>
    </div>
  );
};

export default PayrollReport;
