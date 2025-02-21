import * as yup from 'yup';

export const otpSchema = yup.object().shape({
  otp1: yup
    .string()
    .required('Digit 1 is required')
    .matches(/^\d$/, 'Must be a single digit'),
  otp2: yup
    .string()
    .required('Digit 2 is required')
    .matches(/^\d$/, 'Must be a single digit'),
  otp3: yup
    .string()
    .required('Digit 3 is required')
    .matches(/^\d$/, 'Must be a single digit'),
  otp4: yup
    .string()
    .required('Digit 4 is required')
    .matches(/^\d$/, 'Must be a single digit'),
  otp5: yup
    .string()
    .required('Digit 5 is required')
    .matches(/^\d$/, 'Must be a single digit'),
  otp6: yup
    .string()
    .required('Digit 6 is required')
    .matches(/^\d$/, 'Must be a single digit'),
})