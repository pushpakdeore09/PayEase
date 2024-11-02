import {
  Box,
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAllowance, getAllowanceByEmployeeId } from "../api/allowanceApi";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Allowances = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [allowances, setAllowances] = useState([]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchAllowance = async () => {
    setSearchAttempted(true);
    try {
      const response = await getAllowanceByEmployeeId(searchInput);
      const allowanceData = response.data;
      console.log(allowanceData);
      
      setAllowances(allowanceData);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 1000 });
    }
  };

  const handleAddAllowance = () => {
    navigate("/addAllowance");
  };

  const handleUpdate = (allowanceId, employeeId) => {
    navigate(`/allowance/${allowanceId}/${employeeId}`);
  };

  const handleDelete = async (allowanceId) => {
    try {
      const response = await deleteAllowance(allowanceId);
      toast.success(response.data, { autoClose: 1000 });
      setAllowances((prevAllowances) =>
        prevAllowances.filter(
          (allowance) => allowance.allowanceId !== allowanceId
        )
      );
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 1000 });
      } else {
        toast.error(error.response.body, { autoClose: 1000 });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Typography variant="h4" className="text-3xl font-bold mb-2 p-4">
          Allowances Dashboard
        </Typography>
        <Divider sx={{ height: 4, bgcolor: "gray" }} />
      </div>
      <div style={{ padding: "20px" }}>
        <Grid2 container spacing={2} alignItems="flex-end">
          <Grid2 item xs={10} size={8}>
            <TextField
              label="Employee ID"
              required
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              value={searchInput}
              onChange={handleSearchChange}
            />
          </Grid2>
          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSearchAllowance}
            >
              Search
            </Button>
          </Grid2>
          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleAddAllowance}
            >
              Add New
            </Button>
          </Grid2>
        </Grid2>

        {searchAttempted && !allowances && (
          <Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
            No allowances found
          </Typography>
        )}

        {allowances.length > 0 && (
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
                      Employee ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Allowance Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Allowance Percent
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Allowance Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Allowance Amount
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Update
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
                {allowances.map((allowance, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">
                        {allowance.employee.employeeId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {allowance.allowanceName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {allowance.allowancePercentage}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {allowance.allowanceType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {allowance.allowanceAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        color="primary"
                        onClick={() =>
                          handleUpdate(
                            allowance.allowanceId,
                            allowance.employee.employeeId
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="secondary"
                        onClick={() => handleDelete(allowance.allowanceId)}
                        style={{ cursor: "pointer" }}
                      />
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

export default Allowances;
