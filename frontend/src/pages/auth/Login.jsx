import React from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Link, Typography } from "@mui/material";
import * as Yup from "yup";
import "../styles/SignInForm.css";
import { useNavigate } from "react-router-dom";
import { signin } from "../../components/api/authApi";
import { toast } from "react-toastify";

const SignInForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values) => {
    console.log("login data", values);
    try {
      const response = await signin(values);
      const message = response.body;
      console.log(response);
      
      if (
        message === "User does not exist!" ||
        message === "Invalid email or password"
      ) {
        toast.error(message, { autoClose: 1500 });
      } else {
        toast.success("Login Successfully", { autoClose: 1500 });
        setTimeout(() => {
          navigate("/home");
        });
      }
    } catch (error) {
      toast.error(error.response.body, { autoClose: 1500 });
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
      <div className="w-full max-w-sm p-8 rounded-2xl shadow-lg space-y-5 bg-white relative z-10">
        <Typography
          variant="h3"
          className="text-center text-2xl text-white bg-blue-900 p-2 rounded-xl"
        >
          Sign in
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div className="space-y-5">
              <Field
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                inputLabel={{ style: { color: "#A0AEC0" } }}
                className="mb-6"
                type="email"
                id="email"
                name="email"
              />
            </div>

            <div className="space-y-5">
              <Field
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                sx={{ borderRadius: "8px" }}
                inputLabel={{ style: { color: "#A0AEC0" } }}
                className="mb-6 rounded-md"
                type="password"
                id="password"
                name="password"
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mb-6 bg-blue-600 hover:bg-blue-700"
            >
              Sign in
            </Button>
          </Form>
        </Formik>

        <Typography variant="body2" className="text-center text-gray-400">
          Don't have an account?{" "}
          <Link
            onClick={() => navigate("/signup")}
            className="text-blue-500 cursor-pointer"
          >
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default SignInForm;
