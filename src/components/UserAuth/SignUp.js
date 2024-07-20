import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signupSchema } from "./ValidationSchema";
import { Button, TextField } from "@mui/material";

const SignUp = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={signupSchema}
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
          <Field
            name="confirmPassword"
            type="password"
            as={TextField}
            label="Confirm Password"
            variant="outlined"
            fullWidth
            helperText={<ErrorMessage name="confirmPassword" />}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  )
};

export default SignUp;