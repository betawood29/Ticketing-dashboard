import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { loginSchema } from "./ValidationSchema";

const Login = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center p-4 space-y-4">
          <Field
            name="email"
            type="email"
            as={TextField}
            label="Email"
            variant="outlined"
            fullWidth
            helperText={<ErrorMessage name="email" />}
          />
          <Field
            name="password"
            type="password"
            as={TextField}
            label="Password"
            variant="outlined"
            fullWidth
            helperText={<ErrorMessage name="password" />}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Login
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;