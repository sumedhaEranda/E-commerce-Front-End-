import { Box, Button, TextField, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, } from "firebase/auth";
import app from '../../components/firebase/firebase';
import axios from 'axios';
import React, { useRef, useState } from "react";
import form from '../../scenes/form/form.css'

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [userExists, setUserExists] = useState(false);
  const [usercreate, setusercreate] = useState(false);
  const handleFormSubmit = (values) => {
    console.log(values);
    axios.post('http://localhost:8080/api/v1/user/create', values)
      .then(response => {
        setusercreate(true);
        console.log(response.data);
      })
      .catch(error => {
        console.log("user exit");
        setUserExists(true);
      });
  };
  const check = (event) => {
      setUserExists(false);
      setusercreate(false);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}

      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={ check}
                value={values.userName}
               
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={ check}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={ check}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={ check}
                value={values.confirmPassword}
                name="confirmPassword"
                error={!!touched.confirmPassword && !!errors.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={ check}
                value={values.contactNo}
                name="contactNo"
                error={!!touched.contactNo && !!errors.contactNo}
                helperText={touched.contactNo && errors.contactNo}
                sx={{ gridColumn: "span 4" }}
              />


              <TextField
                fullWidth
                select
                variant="filled"
                label="Access Level"
                onBlur={handleBlur}
                onChange={handleChange}
                onClick={ check}
                value={values.roles}
                name="roles"
                error={!!touched.roles && !!errors.roles}
                helperText={touched.roles && errors.roles}
                sx={{ gridColumn: "span 4" }}
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="moderator">Moderator</MenuItem>
                <MenuItem value="user">User</MenuItem>
              </TextField>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New User
              </Button>
              
            </Box>
            <div>
                {userExists === true && (
                  <span className="error-message">Already have User</span>
                )}
                {usercreate === true && (
                  <span className="ok-message">User Create Succesfully</span>
                )}
              </div>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  userName: yup.string().required("required"),
  password: yup.string().required("required"),
  confirmPassword: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contactNo: yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  roles: yup.string().required("required"),

});
const initialValues = {

  userName: "",
  password: "",
  confirmPassword: "",
  email: "",
  contactNo: "",
  roles: ""
};

export default Form;
