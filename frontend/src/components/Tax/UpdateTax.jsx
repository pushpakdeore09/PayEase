import {
  Button,
  Divider,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTaxById, updateTax } from "../api/taxApi";
import { toast } from "react-toastify";

const UpdateTax = () => {
    const { taxId } = useParams();
  const navigate = useNavigate();
  const taxTypes = ["Direct Tax"];
  const [tax, setTax] = useState(null);
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

  useEffect(() => {
    const fetchTax = async () => {
        try {
            const response = await getTaxById(taxId);
            setTax(response.data);
        } catch (error) {
          if (error.code === "ERR_NETWORK") {
            toast.error("Service Unavailable", { autoClose: 2000 });
          } else {
            toast.error(error.response.body, { autoClose: 1500 });
          }
        }
    };
    fetchTax();
  },[taxId])
  const handleUpdate = async (values) => {
    const updatedValues = {
        ...values,
        taxId: taxId,
    };
    try {
        const response = await updateTax(updatedValues);
        toast.success(response.data, {autoClose: 2000});
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 2000 });
      } else {
        toast.error(error.response.body, { autoClose: 1500 });
      }
    }
  }

  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Update Tax Details
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      {tax && (
        <Formik
          initialValues={{
            taxName: tax.taxName || "",
            employeeId: tax.employee?.employeeId || "",
            taxType: tax.taxType || "",
            taxPercentage: tax.taxPercentage || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
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
                  <MenuItem value="">Select tax Type</MenuItem>
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
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default UpdateTax;
