import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    username:Yup.string().email('please enter valid email!').required('Username is Required!'),
  title: Yup.string().required('Title is required'),
  priority: Yup.string().required('Priority is required'),
  remarks: Yup.string(),
  dueDate: Yup.date().nullable().required('Due Date is required'),
});

// Priority options
const priorities = [
  { value: 'LOW', label: 'Low' },
  { value: 'MED', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const sources = [
  { value: 'sms', label: 'SMS' },
  { value: 'gmail', label: 'Gmail' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'whatsapp', label: 'Whatsapp' },
];

const statuses = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Open', label: 'Open' },
  { value: 'Closed', label: 'Closed' },
];

const CreateTicket = ({ open, onClose, onSubmit,initialValues }) => {
    return (
    <Dialog open={open} onClose={onClose} className="max-w-lg mx-auto">
      <DialogTitle>{initialValues?'Edit Ticket':'Create a New Ticket'}</DialogTitle>
      <Formik
        initialValues={initialValues||{
            username:'',
          title: '',
          status: '',
          priority: '',
          source: '',
          remarks: '',
          dueDate: null,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >      
        {({ values, handleChange, handleSubmit, setFieldValue, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="space-y-4">
            <DialogContent dividers>
              <div className="space-y-4">
              <Field
                    as={TextField}
                    label="Username"
                    name="username"
                    placeholder="Enter Username"
                    fullWidth
                    required
                    value={values.name}
                    onChange={handleChange}
                    error={touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                    className="w-full"                  />
                <Field
                  as={TextField}
                  fullWidth
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  className="w-full"
                />
                <Field
                  as={TextField}
                  select
                  fullWidth
                  name="priority"
                  label="Priority"
                  value={values.priority}
                  onChange={handleChange}
                  error={touched.priority && !!errors.priority}
                  helperText={touched.priority && errors.priority}
                  className="w-full"
                >
                  {priorities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  as={TextField}
                  select
                  fullWidth
                  name="status"
                  label="Status"
                  value={values.status}
                  onChange={handleChange}
                  error={touched.status && !!errors.status}
                  helperText={touched.status && errors.status}
                  className="w-full"
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  as={TextField}
                  select
                  fullWidth
                  name="source"
                  label="Source"
                  value={values.source}
                  onChange={handleChange}
                  error={touched.source && !!errors.source}
                  helperText={touched.source && errors.source}
                  className="w-full"
                >
                  {sources.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <Field
                  as={TextField}
                  fullWidth
                  multiline
                  rows={4}
                  name="remarks"
                  label="Remarks"
                  value={values.remarks}
                  onChange={handleChange}
                  className="w-full"
                />
                <Field
                  as={TextField}
                  fullWidth
                  type="date"
                  name="dueDate"
                  label="Due Date"
                  value={values.dueDate}
                  onChange={(e) => setFieldValue('dueDate', e.target.value)}
                  error={touched.dueDate && !!errors.dueDate}
                  helperText={touched.dueDate && errors.dueDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className="w-full"
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}  style={{color:'#000000'}}>Cancel</Button>
              <Button type="submit" variant='contained' style={{color:'#000000'}}>{initialValues?'Update':'Create'}</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default CreateTicket;
