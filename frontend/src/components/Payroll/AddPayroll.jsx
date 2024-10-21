import {
  Divider,
  TextField,
  Typography,
  Button,
  MenuItem,
} from "@mui/material";
import { Field, Formik, Form } from "formik";
import React from "react";
import * as Yup from "yup";
import { addPayroll } from "../api/payrollApi";
import { toast } from "react-toastify";

const AddPayroll = () => {
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
  const initialValues = {
    payrollName: "",
    employeeId: "",
    monthName: "",
    year: "",
  };

  const validationSchema = Yup.object().shape({
    payrollName: Yup.string().required("Payroll name is required"),
    employeeId: Yup.string().required("Employee ID is required"),
    monthName: Yup.string().required("Month is required"),
    year: Yup.number().required("Year is required"),
  });
  const handleSave = async (values) => {
    try {
      const response = await addPayroll(values);
      toast.success(response, { autoClose: 2000 });
    } catch (error) {
      toast.error(error, { autoClose: 1500 });
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Add Payroll
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ handleSubmit, touched, errors }) => (
          <Form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Payroll Name"
                name="payrollName"
                variant="outlined"
                error={touched.payrollName && Boolean(errors.payrollName)}
                helperText={touched.payrollName && errors.payrollName}
              />
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Employee ID"
                name="employeeId"
                variant="outlined"
                error={touched.employeeId && Boolean(errors.employeeId)}
                helperText={touched.employeeId && errors.employeeId}
              />
            </div>

            <div>
              <Field
                as={TextField}
                fullWidth
                select
                label="Month Name"
                name="monthName"
                variant="outlined"
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
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Year"
                name="year"
                type="number"
                variant="outlined"
                error={touched.year && Boolean(errors.year)}
                helperText={touched.year && errors.year}
              />
            </div>

            <div className="col-span-2 flex justify-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save Payroll
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddPayroll;
