import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Divider,
  Grid2,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteEmployee, getAllEmployees, searchEmployee } from "../api/employeeApi";
import { toast } from "react-toastify";

const EmployeeManagement = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [employees, setEmployees] = useState([]);
  const [searchAttempted, setSearchAttempted] = useState(false);

  useEffect(() => {
    setEmployees([]);
  }, []);

  const handleAddNewEmployee = () => {
    navigate("/addEmployee");
  };

  const handleEditEmployee = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await deleteEmployee(employeeId);
      toast.success(response.data, {autoClose: 1000});
      handleGetAllEmployees(); 
    } catch (error) {
      console.log(error);
      toast.error(error.response.data, {autoClose: 1000});
    }
  };

  const handleSearchEmployee = async () => {
    try {
      const response = await searchEmployee(searchValue);
      setEmployees(response ? [response] : []);
      setSearchAttempted(true);
    } catch (error) {
      setSearchAttempted(true);
      console.error("Error fetching employee data:", error);
      setEmployees([]);
    }
  };

  const handleGetAllEmployees = async () => {
    try {
      const response = await getAllEmployees();
      if (response.data && response.data.length > 0) {
        setEmployees(response.data);
      } else {
        toast.error("No employees found", { autoClose: 1000 });
        setEmployees([]);
      }
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col space-y-6">
        <Typography variant="h4" className="text-3xl font-bold mb-4">
          Employee Dashboard
        </Typography>
        <Divider sx={{ height: 4, bgcolor: "gray" }} />
      </div>

      <Grid2
        container
        spacing={2}
        alignItems="flex-start"
        sx={{ marginTop: 2 }}
      >
        <Grid2 item xs={10}>
          <TextField
            required
            label="Enter Employee ID"
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchEmployee}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Grid2>

        <Grid2 item xs={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleAddNewEmployee}
          >
            Add New Employee
          </Button>
        </Grid2>

        <Grid2 item xs={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleGetAllEmployees}
          >
            Get All Employees
          </Button>
        </Grid2>
      </Grid2>

      {searchAttempted && employees.length === 0 && (
        <Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
          Employee not found
        </Typography>
      )}

      {employees.length > 0 && (
        <Box
          sx={{
            overflowX: "auto",
            boxShadow: 2,
            borderColor: "1px solid",
            borderRadius: 1,
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ marginTop: 2, width: "100%", maxWidth: "100%" }}
          >
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Employee ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Designation
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Department
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Base Salary
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Net Salary
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Joining Date
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Update
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontSize: "0.875rem" }}
                    >
                      Delete
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {employees.map((emp) => (
                  <TableRow key={emp.employeeId}>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {emp.employeeId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {emp.firstName} {emp.lastName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {emp.designation}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {emp.department.deptName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {emp.email}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        ₹ {emp.baseSalary}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        ₹ {emp.netSalary}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: "0.875rem" }}>
                        {new Date(emp.joiningDate).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleEditEmployee(emp.employeeId)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteEmployee(emp.employeeId)}
                      >
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

export default EmployeeManagement;
