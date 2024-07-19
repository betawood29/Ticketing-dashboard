import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  Button,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setLoggedInUser } from "../redux/formSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const initialValues = {
    username: "",
    password: "",
    remember: false,
  };
  const validationSchema=yup.object().shape({
    username:yup.string().email('please enter valid email!').required('Username is Required!'),
    password:yup.string().required('Password is Required')
  })
  const onSubmit = async(values, props) => {
    // dispatch(saveFormData(values));
    dispatch(setLoggedInUser({username:values.username}))
    // dispatch(saveDataToLocalStorage(values));
    setTimeout(()=>{
      props.resetForm();
      props.setSubmitting(false);
      navigate('/dashboard');
    },1000)
  };
  // const saveDataToLocalStorage = (data) => {
  //   const existingData = JSON.parse(localStorage.getItem('formData')) || [];
  //   existingData.push(data);
  //   localStorage.setItem('formData', JSON.stringify(existingData));
  // };

  return (
    <Grid container className="min-h-screen flex items-center justify-center">
      <Paper elevation={10} className="p-8 w-80">
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Grid item>
            <Avatar className="bg-blue-500 w-14 h-14">
              <LockOutlined />
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h5">Login</Typography>
          </Grid>
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Grid item className="w-full">
                  <Field
                    as={TextField}
                    label="Username"
                    name="username"
                    placeholder="Enter Username"
                    fullWidth
                    required
                    helperText={<ErrorMessage name="username" />}
                  />
                </Grid>
                <Grid item className="w-full py-3">
                  <Field
                    as={TextField}
                    label="Password"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item className="w-full py-3">
                  <Field
                    as={FormControlLabel}
                    name="remember"
                    control={<Checkbox defaultChecked />}
                    label="Remember Me"
                  />
                </Grid>
                <Grid item className="w-full">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={props.isSubmitting}
                  >
                    Submit
                  </Button>
                </Grid>
              </Form>
            )}
          </Formik>
          <Grid item>
            <Typography>
              <Link href="#">Forgot Password</Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;
