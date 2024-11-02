import {
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { Form } from "formik";
import { useNavigate } from "react-router-dom";
import { addTax } from "../api/taxApi";
import { toast } from "react-toastify";

const AddTax = () => {
  const navigate = useNavigate();
  const taxTypes = ["Direct Tax"];
  const initialValues = {
    taxName: "",
    employeeId: "",
    taxType: "",
    taxPercentage: "",
  };
  const validationSchema = Yup.object().shape({
    taxName: Yup.string()
      .required("Tax name is required")
      .min(3, "Tax name must be at least 3 characters"),
    employeeId: Yup.string()
      .required("Employee ID is required")
      .matches(/^[0-9]+$/, "Employee ID must be a number"),
    taxType: Yup.string().required("Tax Type is required"),
    taxPercentage: Yup.number()
      .required("Tax Percentage is required")
      .min(0, "Tax percentage cannot be negative")
      .max(100, "Tax percentage cannot exceed 100"),
  });

  const handleSave = async (values) => {
    try {
      const response = await addTax(values);
      toast.success(response, { autoClose: 1000 });
    } catch (error) {
      toast.error(error, { autoClose: 1000 });
    }
  };

  const handleBack = () => {
    navigate("/tax");
  };
  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Add Tax
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
                label="Tax Name"
                name="taxName"
                variant="outlined"
                error={touched.taxName && !!errors.taxName}
                helperText={touched.taxName && errors.taxName}
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
                label="Tax Type"
                name="taxType"
                variant="outlined"
                error={touched.taxType && !!errors.taxType}
                helperText={touched.taxType && errors.taxType}
              >
                <MenuItem value="">Select Tax Type</MenuItem>
                {taxTypes.map((taxType, index) => (
                  <MenuItem key={index} value={taxType}>
                    {taxType}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div>
              <Field
                as={TextField}
                fullWidth
                label="Tax Percentage"
                name="taxPercentage"
                type="number"
                variant="outlined"
                error={touched.taxPercentage && !!errors.taxPercentage}
                helperText={touched.taxPercentage && errors.taxPercentage}
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save Tax
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddTax;
