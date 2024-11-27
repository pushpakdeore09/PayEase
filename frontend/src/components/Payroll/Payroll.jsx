import {
  Box,
  Button,
  Divider,
  Grid2,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { getAllPayrolls, getPayroll } from "../api/payrollApi";
import { toast } from "react-toastify";

const Payroll = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [payrolls, setPayrolls] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleAddPayroll = () => {
    navigate("/addPayroll");
  };
  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleGetPayrolls = async () => {
    try {
      const response = await getAllPayrolls();
      setPayrolls(response.data);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 1000 });
    }
  };

  const handleSearch = async () => {
    setSearchAttempted(true);
    try {
      const response = await getPayroll(searchInput);

      setPayrolls(response);
      
    } catch (error) {
      toast.error(error, { autoClose: 1000 });
      setPayrolls([]);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Typography variant="h4" className="text-3xl font-bold mb-2 p-4">
          Payroll Dashboard
        </Typography>
        <Divider sx={{ height: 4, bgcolor: "gray" }} />
      </div>
      <div style={{ padding: "20px" }}>
        <Grid2 container spacing={2} alignItems="flex-end">
          <Grid2 item xs={10} size={8}>
            <TextField
              label="Employee Id"
              variant="outlined"
              size="small"
              fullWidth
              type="number"
              value={searchInput}
              onChange={handleSearchChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid2>

          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleAddPayroll}
            >
              Add New
            </Button>
          </Grid2>
          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleGetPayrolls}
            >
              Get All Payrolls
            </Button>
          </Grid2>
        </Grid2>

        {searchAttempted && !payrolls && (
          <Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
            No payrolls found
          </Typography>
        )}

        {payrolls.length > 0 && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              boxShadow: 2,
            }}
          >
            <Table sx={{ fontSize: "1.2rem" }} style={{ marginTop: "20px" }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Payroll Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Employee ID
                    </Typography>
                  </TableCell>
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
                </TableRow>
              </TableHead>
              <TableBody>
                {payrolls.map((payroll, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">
                        {payroll.payrollName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{payroll.employeeId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{payroll.monthName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{payroll.year}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </div>
    </>
  );
};

export default Payroll;
