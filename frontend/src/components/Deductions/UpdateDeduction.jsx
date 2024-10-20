import { Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from "yup";
import { getDeduction, updateDeduction } from '../api/deductionApi';
import { toast } from 'react-toastify';

const UpdateDeduction = () => {
  const navigate = useNavigate();
  const { deductionId } = useParams();
  const deductionTypes = ["Statutory Deduction", "Voluntary Deduction"];
  const [deduction, setDeduction] = useState(null);
  const validationSchema = Yup.object().shape({
    deductionName: Yup.string()
      .required("Deduction name is required")
      .min(3, "Deduction name must be at least 3 characters"),
    employeeId: Yup.string()
      .required("Employee ID is required")
      .matches(/^[0-9]+$/, "Employee ID must be a number"),
    deductionType: Yup.string().required("Deduction Type is required"),
    deductionPercentage: Yup.number()
      .required("Deduction Percentage is required")
      .min(0, "Deduction percentage cannot be negative")
      .max(100, "Deduction percentage cannot exceed 100"),
  });

  useEffect(() => {
    const fetchDeduction = async () => {
      try {
        const response = await getDeduction(deductionId);
        setDeduction(response.data);
      } catch (error) {
        if (error.code === "ERR_NETWORK") {
          toast.error("Service Unavailable", { autoClose: 2000 });
        } else {
          toast.error(error.response.body, { autoClose: 1500 });
        }
      }
    };
    fetchDeduction();
  }, [deductionId])
  const handleUpdate = async (values) => {
    const updatedValues = {
      ...values,
      deductionId: deductionId,
    }
    try {
      const response = await updateDeduction(updatedValues);
      toast.success(response.data, {autoClose: 2000});
    } catch (error) {
      toast.error(error.response.data, {autoClose: 2000});
    }
  }
  const handleBack = () => {
    navigate(-1);
  }
  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Update deduction Details
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      {deduction && (
        <Formik
          initialValues={{
            deductionName: deduction.deductionName || "",
            employeeId: deduction.employee?.employeeId || "",
            deductionType: deduction.deductionType || "",
            deductionPercentage: deduction.deductionPercentage || "",
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
                  label="Deduction Name"
                  name="deductionName"
                  variant="outlined"
                  error={touched.deductionName && !!errors.deductionName}
                  helperText={touched.deductionName && errors.deductionName}
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
                  label="Deduction Type"
                  name="deductionType"
                  variant="outlined"
                  error={touched.deductionType && !!errors.deductionType}
                  helperText={touched.deductionType && errors.deductionType}
                >
                  <MenuItem value="">Select deduction Type</MenuItem>
                  {deductionTypes.map((deductionType, index) => (
                    <MenuItem key={index} value={deductionType}>
                      {deductionType}
                    </MenuItem>
                  ))}
                </Field>
              </div>
              <div>
                <Field
                  as={TextField}
                  fullWidth
                  label="Deduction Percentage"
                  name="deductionPercentage"
                  type="number"
                  variant="outlined"
                  error={touched.deductionPercentage && !!errors.deductionPercentage}
                  helperText={touched.deductionPercentage && errors.deductionPercentage}
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
  )
}

export default UpdateDeduction
