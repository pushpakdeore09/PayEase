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
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteDeduction, getDeduction } from "../api/deductionApi";

const Deductions = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [deductions, setDeductions] = useState([]);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchDeduction = async () => {
    setSearchAttempted(true);
    try {
      const response = await getDeduction(searchInput);
      const deductionData = response.data;
      setDeductions(deductionData);
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2000 });
    }
  };

  const handleAddDeduction = () => {
    navigate("/addDeductions");
  };

  const handleUpdate = (deductionId) => {
    console.log(`Update deduction with ID: ${deductionId}`);
  };

  const handleDelete = async (deductionId) => {
    try {
      const response = await deleteDeduction(deductionId);
      toast.success(response.data, { autoClose: 2000 });
      setDeductions((prevDeductions) =>
        prevDeductions.filter(
          (deduction) => deduction.deductionId !== deductionId
        )
      );
    } catch (error) {
      toast.error(error.response?.data, { autoClose: 2000 });
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <Typography variant="h4" className="text-3xl font-bold mb-2 p-4">
          Deductions Dashboard
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
              onClick={handleSearchDeduction}
            >
              Search
            </Button>
          </Grid2>
          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleAddDeduction}
            >
              Add New
            </Button>
          </Grid2>
        </Grid2>

        {searchAttempted && !deductions && (
          <Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
            No deductions found
          </Typography>
        )}

        {deductions.length > 0 && (
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
                      Deductions Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Deductions Percent
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Deductions Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Deductions Amount
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
                {deductions.map((deduction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">
                        {deduction.employee.employeeId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {deduction.deductionName}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {deduction.deductionPercentage}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {deduction.deductionType}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {deduction.deductionAmount}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        color="primary"
                        onClick={() => handleUpdate(deduction.deductionId)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="secondary"
                        onClick={() => handleDelete(deduction.deductionId)}
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

export default Deductions;
