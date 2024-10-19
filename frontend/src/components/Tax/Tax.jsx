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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTax, getTaxByEmployeeId } from "../api/taxApi";
import { toast } from "react-toastify";

const Tax = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [taxes, setTaxes] = useState([]);

  const handleAddTax = () => {
    navigate("/addTax");
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };
  const handleSearchTax = async () => {
    try {
      const response = await getTaxByEmployeeId(searchInput);
      setTaxes(response.data);
      console.log(response);
    } catch (error) {
      toast.error(error.response.data, {autoClose: 2000});
    }
  };
  const handleUpdate = () => {};
  const handleDelete = async (taxId) => {
    try {
      const response = await deleteTax(taxId);
      console.log(response);
      toast.success(response.data, { autoClose: 2000 });
      setTaxes((prevTaxes) => prevTaxes.filter((tax) => tax.taxId !== taxId));
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2000 });
    }
  };
  return (
    <>
      <div className="flex flex-col">
        <Typography variant="h4" className="text-3xl font-bold mb-2 p-4">
          Tax Dashboard
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
              onClick={handleSearchTax}
            >
              Search
            </Button>
          </Grid2>
          <Grid2 item xs={2}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleAddTax}
            >
              Add New
            </Button>
          </Grid2>
        </Grid2>

        {searchAttempted && !taxes && (
          <Typography variant="h6" color="error" style={{ marginTop: "20px" }}>
            No taxess found
          </Typography>
        )}

        {taxes.length > 0 && (
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
                      Tax Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Tax Percent
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Tax Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontWeight="bold">
                      Tax Amount
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
                {taxes.map((taxes, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography variant="h6">
                        {taxes.employee.employeeId}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{taxes.taxName}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">
                        {taxes.taxPercentage}%
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{taxes.taxType}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">{taxes.taxAmount}</Typography>
                    </TableCell>
                    <TableCell>
                      <EditIcon
                        color="primary"
                        onClick={() => handleUpdate(taxes.taxId)}
                        style={{ cursor: "pointer" }}
                      />
                    </TableCell>
                    <TableCell>
                      <DeleteIcon
                        color="secondary"
                        onClick={() => handleDelete(taxes.taxId)}
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

export default Tax;
