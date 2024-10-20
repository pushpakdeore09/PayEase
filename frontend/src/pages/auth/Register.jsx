import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Link, Typography } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import  { signup } from '../../components/api/authApi';
import { toast } from 'react-toastify';
import "../styles/SignUpForm.css";
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      )
      .required("Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await signup(values);
      toast.success(response, {autoClose: 1500});
      setTimeout(() => {
        navigate('/signin')
      }, 2000);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 2000 });
      } else {
        toast.error(error.response.body, { autoClose: 1500 });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg space-y-5 bg-slate-200 z-10 relative">
        <Typography variant="h3" className="text-center text-2xl text-white bg-blue-900 p-2 rounded-xl">
          Sign up
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <Field
                as={TextField}
                label="First Name"
                variant="outlined"
                fullWidth
                className="mb-6"
                type="text"
                name="firstName"
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={touched.firstName && errors.firstName}
              />
              <Field
                as={TextField}
                label="Last Name"
                variant="outlined"
                fullWidth
                className="mb-6"
                type="text"
                name="lastName"
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                sx={{ borderRadius: "8px" }}
              />
              <Field
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                className="mb-6"
                type="email"
                name="email"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <Field
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                className="mb-6"
                type="password"
                name="password"
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mb-6 bg-blue-600 hover:bg-blue-700"
              >
                Sign up
              </Button>
            </Form>
          )}
        </Formik>

        <Typography variant="body2" className="text-center text-gray-400 z-10">
          Already have an account?{" "}
          <Link
            onClick={() => navigate("/signin")}
            className="text-blue-500 cursor-pointer"
          >
            Sign in
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterForm;
