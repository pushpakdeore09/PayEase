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
import { addPayrollMonth } from "../api/payrollMonthApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPayrollMonth = () => {
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

  const monthDateRange = {
    January: { start: 1, end: 31 },
    February: { start: 1, end: 28 },
    March: { start: 1, end: 31 },
    April: { start: 1, end: 30 },
    May: { start: 1, end: 31 },
    June: { start: 1, end: 30 },
    July: { start: 1, end: 31 },
    August: { start: 1, end: 31 },
    September: { start: 1, end: 30 },
    October: { start: 1, end: 31 },
    November: { start: 1, end: 30 },
    December: { start: 1, end: 31 },
  };

  const initialValues = {
    monthName: "",
    year: "",
    startDate: "",
    endDate: "",
  };

  const validationSchema = Yup.object({
    monthName: Yup.string().required("Required"),
    year: Yup.number()
      .required("Required")
      .min(1900, "Year must be after 1900")
      .max(new Date().getFullYear(), "Year can't be in the future"),
    startDate: Yup.date()
      .required("Required")
      .nullable()
      .test(
        "is-valid-startDate",
        "Start date must be within the selected month or year",
        function (value) {
          const { monthName, year } = this.parent;
          if (!monthName || !value || !year) return true;
          const selectedMonthRange = monthDateRange[monthName];
          const startDateMonth = new Date(value).getMonth() + 1;
          const selectedMonthIndex = months.indexOf(monthName) + 1;

          return (
            startDateMonth === selectedMonthIndex &&
            new Date(value).getDate() >= selectedMonthRange.start &&
            new Date(value).getFullYear() === year
          );
        }
      ),
    endDate: Yup.date()
      .required("Required")
      .nullable()
      .min(Yup.ref("startDate"), "End date must be after start date")
      .test(
        "is-different-endDate",
        "End date must be after start date",
        function (value) {
          const { startDate } = this.parent;
          return startDate && value && new Date(value) > new Date(startDate);
        }
      )
      .test(
        "is-valid-endDate",
        "End date must be within the selected month or year",
        function (value) {
          const { monthName, year } = this.parent;
          if (!monthName || !value || !year) return true;
          const selectedMonthRange = monthDateRange[monthName];
          const endDateMonth = new Date(value).getMonth() + 1;
          const selectedMonthIndex = months.indexOf(monthName) + 1;

          return (
            endDateMonth === selectedMonthIndex &&
            new Date(value).getDate() <= selectedMonthRange.end &&
            new Date(value).getFullYear() === year
          );
        }
      ),
  });
  const handleBack = () => {
    navigate(-1);
  }
  const handleSubmit = async (values) => {
    try {
      const response = await addPayrollMonth(values);
      toast.success(response.data, { autoClose: 2000 });
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data, { autoClose: 1500 });
    }
  };

  return (
    <>
      <div className="flex flex-col p-4 space-y-6">
        <Typography variant="h4" className="text-3xl font-bold mb-4">
          Add Payroll Month
        </Typography>
        <Divider sx={{ height: 4, bgcolor: "gray" }} />
      </div>
      <div className="flex flex-col p-4 space-y-6">
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, errors, touched }) => (
            <Form className="grid grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-6 col-span-2">
                <Field
                  as={TextField}
                  fullWidth
                  label="Select Month"
                  size="small"
                  select
                  name="monthName"
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
                <Field
                  as={TextField}
                  fullWidth
                  name="year"
                  label="Year"
                  size="small"
                  type="number"
                  onChange={(e) => setFieldValue("year", e.target.value)}
                  error={touched.year && Boolean(errors.year)}
                  helperText={touched.year && errors.year}
                />
              </div>

              <div>
                <Field
                  as={TextField}
                  name="startDate"
                  fullWidth
                  type="date"
                  label="Start Date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  onChange={(e) => setFieldValue("startDate", e.target.value)}
                  error={touched.startDate && Boolean(errors.startDate)}
                  helperText={touched.startDate && errors.startDate}
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  name="endDate"
                  fullWidth
                  type="date"
                  label="End Date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  onChange={(e) => setFieldValue("endDate", e.target.value)}
                  error={touched.endDate && Boolean(errors.endDate)}
                  helperText={touched.endDate && errors.endDate}
                />
              </div>

              <div className="flex justify-center col-span-2 gap-5">
              <Button type="submit" variant="contained" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddPayrollMonth;
