import React, { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { fetchAllDept } from "../api/deptApi";
import { addEmployee } from "../api/employeeApi";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    address: "",
    email: "",
    designation: "",
    joiningDate: "",
    employeeType: "",
    baseSalary: "",
    department: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    dob: Yup.date().required("Required").nullable(),
    address: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    designation: Yup.string().required("Required"),
    joiningDate: Yup.date().required("Required").nullable(),
    employeeType: Yup.string().required("Required"),
    baseSalary: Yup.number()
      .typeError("Base salary must be a number")
      .required("Required"),
    department: Yup.string().required("Required"),
  });

  const employeeTypes = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "contract", label: "Contract" },
    { value: "intern", label: "Intern" },
  ];

  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const getAllDepartments = async () => {
      try {
        const response = await fetchAllDept();
        setDepartments(response.data);
      } catch (error) {
        toast.error(error.response.data, { autoClose: 1500 });
      }
    };

    getAllDepartments();
  }, []);

  const handleBack = () => {
    navigate(-1);
  }
  const handleSave = async (values, { resetForm }) => {
    const { dob, joiningDate } = values;
    const dobDate = new Date(dob);
    const joiningDateObj = new Date(joiningDate);

    if (dobDate >= joiningDateObj) {
      toast.error("Date of Birth must be less than the Joining Date.", {
        autoClose: 2000,
      });
      return;
    }
    const employeeData = {
      ...values,
      department: selectedDepartment,
    };

    try {
      const response = await addEmployee(employeeData);
      const employeeId = response.data.employeeId;
      const message = response.data.message;
      toast.success(`${message} with Employee ID: ${employeeId}`, {
        autoClose: 2000,
      });
      resetForm();
      setSelectedDepartment("");
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 2000 });
      } else {
        toast.error(error.response.data, { autoClose: 1500 });
      }
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Add Employee
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
      >
        {({ setFieldValue, touched, errors }) => (
          <Form className="grid grid-cols-2 gap-6">
            <div className="col-span-2">
              <Field
                as={TextField}
                fullWidth
                label="Select Department"
                select
                value={selectedDepartment}
                onChange={(e) => {
                  const departmentName = e.target.value;
                  setSelectedDepartment(departmentName);
                  setFieldValue("department", departmentName);
                }}
                error={touched.department && Boolean(errors.department)}
                helperText={touched.department && errors.department}
              >
                <MenuItem value="">Select Department</MenuItem>
                {departments.map((department, index) => (
                  <MenuItem key={index} value={department.deptId}>
                    {department.deptName}
                  </MenuItem>
                ))}
              </Field>
            </div>

            <div>
              <Field
                as={TextField}
                name="firstName"
                fullWidth
                label="First Name"
                variant="outlined"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
            </div>
            <div>
              <Field
                as={TextField}
                name="lastName"
                fullWidth
                label="Last Name"
                variant="outlined"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </div>

            <div>
              <Typography variant="body1" gutterBottom>
                Gender
              </Typography>
              <Field
                as={RadioGroup}
                row
                name="gender"
                onChange={(e) => {
                  const value = e.target.value;
                  setFieldValue("gender", value);
                }}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                />
              </Field>
              <ErrorMessage
                name="gender"
                component="div"
                className="text-red-600"
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="dob"
                fullWidth
                type="date"
                label="Date of Birth"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                error={touched.dob && Boolean(errors.dob)}
                helperText={touched.dob && errors.dob}
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="address"
                fullWidth
                label="Address"
                variant="outlined"
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="email"
                fullWidth
                label="Email"
                variant="outlined"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="designation"
                fullWidth
                label="Designation"
                variant="outlined"
                error={touched.designation && Boolean(errors.designation)}
                helperText={touched.designation && errors.designation}
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="joiningDate"
                fullWidth
                type="date"
                label="Joining Date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                error={touched.joiningDate && Boolean(errors.joiningDate)}
                helperText={touched.joiningDate && errors.joiningDate}
              />
            </div>

            <div>
              <Field
                as={TextField}
                name="employeeType"
                fullWidth
                label="Employee Type"
                select
                error={touched.employeeType && Boolean(errors.employeeType)}
                helperText={touched.employeeType && errors.employeeType}
              >
                {employeeTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>

            <div>
              <Field
                as={TextField}
                name="baseSalary"
                fullWidth
                type="number"
                label="Base Salary"
                variant="outlined"
                error={touched.baseSalary && Boolean(errors.baseSalary)}
                helperText={touched.baseSalary && errors.baseSalary}
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
  );
};

export default AddEmployee;
