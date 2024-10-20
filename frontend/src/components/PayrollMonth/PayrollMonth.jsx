import React, { useState } from "react";
import {
  Typography,
  Divider,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { getPayrollMonth } from "../api/payrollMonthApi";

const PayrollMonth = () => {
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

  const navigate = useNavigate();

  const [searchValues, setSearchValues] = useState({
    monthName: "",
    year: "",
  });

  const [searchResults, setSearchResults] = useState([]);

  const validationSchema = Yup.object({
    searchYear: Yup.number()
      .required("Required")
      .min(1900, "Year must be after 1900")
      .max(new Date().getFullYear(), `Year can't be in the future`),
  });

  const handleAddPayrollMonth = () => {
    navigate("/addPayrollMonth");
  };

  const handleSearch = async () => {
    try {
      console.log("validation passed");
      
      const response = await getPayrollMonth(searchValues);
      setSearchResults(response.data);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 2000 });
      } else {
        toast.error(error.response.body, { autoClose: 1500 });
      }
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Payroll Month
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      <div className="flex justify-between mt-4">
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddPayrollMonth}
        >
          Add Payroll Month
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-6 mt-4">
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
        <Button
          sx={{ width: 100 }}
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {searchResults.length > 0 && (
        <Box
          sx={{ mt: 4, p: 2, border: "1px solid #ccc", borderRadius: "8px" }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Month
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Year
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Start Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      End Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {searchResults.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">{row.monthName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{row.year}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {new Date(row.startDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {new Date(row.endDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default PayrollMonth;
