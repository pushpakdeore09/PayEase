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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { searchEmployee, updateEmployee } from "../api/employeeApi";
import { fetchAllDept } from "../api/deptApi";
import { toast } from "react-toastify";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { employeeId } = useParams();
  const [employee, setEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await searchEmployee(employeeId);
        setEmployee(response);
        setSelectedDepartment(response.department);
      } catch (error) {
        toast.error(error.response.data, { autoClose: 2000 });
      }
    };
    const fetchDepartments = async () => {
      try {
        const response = await fetchAllDept();
        setDepartments(response.data);
      } catch (error) {
        toast.error(error.response.data, { autoClose: 2000 });
      }
    };

    fetchEmployee();
    fetchDepartments();
  }, [employeeId]);

  const initialValues = {
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    gender: employee?.gender || "",
    dob: employee?.dob || "",
    address: employee?.address || "",
    email: employee?.email || "",
    designation: employee?.designation || "",
    joiningDate: employee?.joiningDate || "",
    employeeType: employee?.employeeType || "",
    baseSalary: employee?.baseSalary || "",
    department: employee?.department || "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    dob: Yup.date().required("Required").nullable(),
    address: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    designation: Yup.string().required("Required"),
    joiningDate: Yup.date().required("Required").nullable(),
    employeeType: Yup.string().required("Required"),
    baseSalary: Yup.number()
      .typeError("Base salary must be a number")
      .required("Required")
      .moreThan(0, "Base salary must be greater than 0"),
    department: Yup.string().required("Required"),
  });

  const handleUpdate = async (values) => {
    const updatedData = {
      ...values,
      department: selectedDepartment,
      employeeId,
    };
    try {
      const response = await updateEmployee(updatedData);
      toast.success(response, { autoClose: 2000 });
    } catch (error) {
      toast.error(error.response.data, { autoClose: 2000 });
    }
  };

  const handleBack = () => {
    navigate(-1);
  }

  if (!employee) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="flex flex-col p-4 space-y-6">
      <Typography variant="h4" className="text-3xl font-bold mb-4">
        Update Employee Details
      </Typography>
      <Divider sx={{ height: 4, bgcolor: "gray" }} />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ errors, touched, setFieldValue }) => (
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
                error={Boolean(touched.department && errors.department)}
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
                error={Boolean(touched.firstName && errors.firstName)}
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
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
              />
            </div>
            <div>
              <Typography variant="body1" gutterBottom>
                Gender
              </Typography>
              <Field as={RadioGroup} row name="gender">
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
              {touched.gender && errors.gender && (
                <Typography color="error">{errors.gender}</Typography>
              )}
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
                error={Boolean(touched.dob && errors.dob)}
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
                error={Boolean(touched.address && errors.address)}
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
                error={Boolean(touched.email && errors.email)}
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
                error={Boolean(touched.designation && errors.designation)}
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
                error={Boolean(touched.joiningDate && errors.joiningDate)}
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
                error={Boolean(touched.employeeType && errors.employeeType)}
                helperText={touched.employeeType && errors.employeeType}
              >
                <MenuItem value="full-time">Full-Time</MenuItem>
                <MenuItem value="part-time">Part-Time</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="intern">Intern</MenuItem>
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
                error={Boolean(touched.baseSalary && errors.baseSalary)}
                helperText={touched.baseSalary && errors.baseSalary}
              />
            </div>

            <div className="flex justify-center col-span-2 gap-5">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handleBack}
              >Back</Button>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditEmployee;
