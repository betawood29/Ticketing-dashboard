import * as Yup from 'yup';

export const loginSchema=Yup.object({
    email:Yup.string()
    .email('invalid email address')
    .required('Email is required'),
    password:Yup.string()
    .required('password is required')
})

export const signupSchema=Yup.object({
    email:Yup.string()
    .email('Invalid Email Address')
    .required('Email is required'),
    password:Yup.string()
    .required('password is required')
    .min(8,'Password must be at least 8 characters(A-Za-z0-9@#$%^&*)'),
    confirmPassword:Yup.string()
    .oneOf([Yup.ref('password'),null],'Passwords must match')
    .required('confirm password is required')

})