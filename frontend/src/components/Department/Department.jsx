import {
  Divider,
  Grid2,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import AddDepartmentModal from "./AddDepartmentModal";
import { deleteDepartment, getAllDept, getDeptByName } from "../api/deptApi";
import { toast } from "react-toastify";

const Department = () => {
  const [openAddDepartmentModal, setOpenAddDepartmentModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleOpenDepartmentAddModal = () => {
    setOpenAddDepartmentModal(true);
  };

  const handleCloseAddDepartmentModal = () => {
    setOpenAddDepartmentModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async () => {
    setSearchAttempted(true);
    try {
      const response = await getDeptByName(searchInput);
      const departmentData = response.data; 
      if (departmentData && departmentData.deptId) {
        setDepartments([departmentData]);
      } else {
        toast.error("No department found", { autoClose: 1000 });
        setDepartments([]); 
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 1000 });
      } else {
        toast.error(error.response.body, { autoClose: 1000 });
      }
      setDepartments([]);
    }
  };
  

  const handleDeleteDept = async (deptId) => {
    try {
      const response = await deleteDepartment(deptId);
      toast.success(response, { autoClose: 1000 });
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.deptId !== deptId)
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleShowDept = async () => {
    try {
      const response = await getAllDept();
      if (response.data && response.data.length > 0) {
        setDepartments(response.data); 
      } else {
        toast.error("No departments found", { autoClose: 1000 });
        setDepartments([]); 
      }
    } catch (error) {
      console.error("Error loading departments:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Typography variant="h4" className="text-3xl font-bold mb-2 p-4">
          Department Dashboard
        </Typography>
        <Divider />
      </div>
      <div style={{ padding: "20px" }}>
        <Grid2 container spacing={2} alignItems="flex-end">
          <Grid2 item xs={10}>
            <TextField
              required
              label="Department Name"
              variant="outlined"
              size="small"
              fullWidth
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
              color="secondary"
              fullWidth
              onClick={handleOpenDepartmentAddModal}
            >
              Add New
            </Button>
          </Grid2>
          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleShowDept}
            >
              Get All Departments
            </Button>
          </Grid2>
        </Grid2>

        {searchAttempted && departments.length === 0 && (
          <Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
            No department found
          </Typography>
        )}

        {departments.length > 0 && (
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
                      Dept ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      No. of Employees
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
                {departments.map((department) => (
                  <TableRow key={department.deptId}>
                    <TableCell>
                      <Typography variant="h6">{department.deptId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{department.deptName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {department.employeeCount || 0}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDeleteDept(department.deptId)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </div>
      <div>
        <AddDepartmentModal
          handleClose={handleCloseAddDepartmentModal}
          open={openAddDepartmentModal}
        />
      </div>
    </>
  );
};

export default Department;
