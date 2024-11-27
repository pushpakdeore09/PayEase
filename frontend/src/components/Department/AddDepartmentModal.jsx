import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { addDepartment } from "../api/deptApi";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"; 
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 230,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  deptName: ""
}

const validationSchema = Yup.object().shape({
  deptName: Yup.string()
    .matches(/^\S(.*\S)?$/, "No leading or trailing whitespace allowed") 
    .required("Department name is required"),
});


const AddDepartmentModal = ({ open, handleClose }) => {
  const handleAddDepartment = async (values, { resetForm }) => {
    try {
      const response = await addDepartment(values);
      toast.success("Department added Successfully", { autoClose: 1000 });
      resetForm();
      handleClose();
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("Service Unavailable", { autoClose: 1000 });
      } else {
        toast.error(error.response.body, { autoClose: 1000 });
      }
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Formik
          initialValues={initialValues} 
          validationSchema={validationSchema} 
          onSubmit={handleAddDepartment} 
        >
          {({ setFieldValue, errors, touched, handleBlur }) => (
            <Form>
              <div>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  className="font-bold"
                >
                  Enter Department Name
                </Typography>
              </div>
              <div className="mt-8">
                <Field
                  name="deptName"
                  as={TextField}
                  label="Department Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={
                    touched.departmentName && Boolean(errors.departmentName)
                  }
                  helperText={touched.departmentName && errors.departmentName}
                  onChange={(e) => {
                    setFieldValue("deptName", e.target.value);
                  }}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex justify-end mt-6 space-x-8">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="medium"
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="medium"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddDepartmentModal;
