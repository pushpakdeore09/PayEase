import {
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generatePayslipPDF } from "../../utils/pdfGenerator";
import { getPaySlipData } from "../api/payrollReportApi";
import { toast } from "react-toastify";

const PaySlip = () => {
  const [searchValues, setSearchValues] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    monthName: "",
    year: "",
  });
  const navigate = useNavigate();
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
  const handleBack = () => {
    navigate(-1);
  };
  const handlePaySlip = async () => {
    try {
      const response = await getPaySlipData(searchValues);
      
      generatePayslipPDF(response.data);
    } catch (error) {
      toast.error(error, { autoClose: 2000 });
    }
  };
  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Pay Slip
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />
      <div>
        <TextField
          fullWidth
          required
          label="Employee Id"
          size="small"
          onChange={(e) =>
            setSearchValues({ ...searchValues, employeeId: e.target.value })
          }
        />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-4">
        <TextField
          fullWidth
          required
          label="First Name"
          size="small"
          type="text"
          variant="outlined"
          onChange={(e) => {
            setSearchValues({ ...searchValues, firstName: e.target.value });
          }}
        ></TextField>
        <TextField
          fullWidth
          required
          label="Last Name"
          size="small"
          type="text"
          variant="outlined"
          onChange={(e) => {
            setSearchValues({ ...searchValues, lastName: e.target.value });
          }}
        />
        <TextField
          fullWidth
          required
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
          required
          label="Year"
          size="small"
          type="number"
          variant="outlined"
          onChange={(e) => {
            setSearchValues({ ...searchValues, year: e.target.value });
          }}
        />
      </div>
      <div className="col-span-3 flex justify-center space-x-4">
        <Button variant="contained" color="secondary" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handlePaySlip}>
          Get PaySlip
        </Button>
      </div>
    </div>
  );
};

export default PaySlip;
