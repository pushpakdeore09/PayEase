import React from "react";
import { Button, Divider, MenuItem, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { generatePayslipPDF } from "../../utils/pdfGenerator";
import { getPaySlipData } from "../api/payrollReportApi";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PaySlip = () => {
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

  // Handle "Back" button functionality
  const handleBack = () => {
    navigate(-1);
  };

  // Handle "Get PaySlip" functionality
  const handlePaySlip = async (values) => {
    try {
      const response = await getPaySlipData(values);
      
      generatePayslipPDF(response.data);
    } catch (error) {
      
      toast.error(error, { autoClose: 1000 });
    }
  };

  // Yup validation schema
  const validationSchema = Yup.object({
    employeeId: Yup.string()
      .required("Employee ID is required")
      .matches(/^\d+$/, "Employee ID must be a valid number"), // Ensures it's a valid number
    firstName: Yup.string()
      .required("First Name is required")
      .matches(/^(?!\s).*$/, "No leading whitespace allowed"), // Ensures no leading spaces
    lastName: Yup.string()
      .required("Last Name is required")
      .matches(/^(?!\s).*$/, "No leading whitespace allowed"), // Ensures no leading spaces
    monthName: Yup.string()
      .required("Month Name is required")
      .matches(/^[a-zA-Z]+$/, "Month Name must only contain letters"), // Ensures it contains only letters
    year: Yup.number()
      .required("Year is required")
      .positive("Year must be a positive number")
      .integer("Year must be an integer")
      .min(1900, "Year must be at least 1900")
      .max(new Date().getFullYear(), "Year cannot be in the future"), // Ensures it's not in the future
  });

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Pay Slip
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      <Formik
        initialValues={{
          employeeId: "",
          firstName: "",
          lastName: "",
          monthName: "",
          year: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handlePaySlip}
      >
        {({ setFieldValue, values, touched, errors }) => (
          <Form>
            {/* Employee ID */}
            <div>
              <Field
                name="employeeId"
                as={TextField}
                fullWidth
                required
                label="Employee Id"
                size="small"
                variant="outlined"
                error={touched.employeeId && Boolean(errors.employeeId)}
                helperText={touched.employeeId && errors.employeeId}
              />
            </div>

            {/* First Name */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <Field
                name="firstName"
                as={TextField}
                fullWidth
                required
                label="First Name"
                size="small"
                type="text"
                variant="outlined"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              
              {/* Last Name */}
              <Field
                name="lastName"
                as={TextField}
                fullWidth
                required
                label="Last Name"
                size="small"
                type="text"
                variant="outlined"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </div>

            {/* Payroll Month */}
            <div className="grid grid-cols-2 gap-6 mt-4">
              <Field
                name="monthName"
                as={TextField}
                fullWidth
                required
                label="Payroll Month"
                size="small"
                select
                variant="outlined"
                value={values.monthName}
                onChange={(e) => setFieldValue("monthName", e.target.value)}
                error={touched.monthName && Boolean(errors.monthName)}
                helperText={touched.monthName && errors.monthName}
              >
                <MenuItem value="">Select Month</MenuItem>
                {months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    {month}
                  </MenuItem>
                ))}
              </Field>

              {/* Year */}
              <Field
                name="year"
                as={TextField}
                fullWidth
                required
                label="Year"
                size="small"
                type="number"
                variant="outlined"
                error={touched.year && Boolean(errors.year)}
                helperText={touched.year && errors.year}
              />
            </div>

            {/* Buttons */}
            <div className="col-span-3 flex justify-center space-x-4 mt-6">
              <Button variant="contained" color="secondary" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Get PaySlip
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default PaySlip;
