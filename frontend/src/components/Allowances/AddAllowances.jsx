import {
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { addAllowance } from "../api/allowanceApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 

const AddAllowances = () => {
  const navigate = useNavigate();

  const allowanceTypes = ["Recurring Allowance", "One-Time Allowance"];
  const initialValues = {
    allowanceName: "",
    employeeId: "",
    allowanceType: "",
    allowancePercentage: "",
  };

  const validationSchema = Yup.object().shape({
    allowanceName: Yup.string()
      .required("Allowance name is required")
      .min(3, "Allowance name must be at least 3 characters"),
    employeeId: Yup.string()
      .required("Employee ID is required")
      .matches(/^[0-9]+$/, "Employee ID must be a number"),
    allowanceType: Yup.string().required("Allowance Type is required"),
    allowancePercentage: Yup.number()
      .required("Allowance Percentage is required")
      .min(0, "Allowance percentage cannot be negative")
      .max(100, "Allowance percentage cannot exceed 100"),
  });

  const handleSave = async (values, { resetForm }) => {
    try {
        const response = await addAllowance(values);
        toast.success(response.data, { autoClose: 2000 });
        resetForm();
    } catch (error) {
       toast.error(error.response.data, { autoClose: 1500 });
         
    }
};


  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Add Allowances
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
                label="Allowance Name"
                name="allowanceName"
                variant="outlined"
                error={touched.allowanceName && !!errors.allowanceName}
                helperText={touched.allowanceName && errors.allowanceName}
              />
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Employee ID"
                name="employeeId"
                variant="outlined"
                error={touched.employeeId && !!errors.employeeId}
                helperText={touched.employeeId && errors.employeeId}
              />
            </div>

            <div>
              <Field
                as={TextField}
                fullWidth
                select
                label="Allowance Type"
                name="allowanceType"
                variant="outlined"
                error={touched.allowanceType && !!errors.allowanceType}
                helperText={touched.allowanceType && errors.allowanceType}
              >
                <MenuItem value="">Select Allowance Type</MenuItem>
                {allowanceTypes.map((allowanceType, index) => (
                  <MenuItem key={index} value={allowanceType}>
                    {allowanceType}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Allowance Percentage"
                name="allowancePercentage"
                type="number"
                variant="outlined"
                error={touched.allowancePercentage && !!errors.allowancePercentage}
                helperText={touched.allowancePercentage && errors.allowancePercentage}
              />
            </div>

            <div className="col-span-2 flex justify-center space-x-4">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Allowance
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddAllowances;
