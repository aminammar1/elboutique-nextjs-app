import * as yup from 'yup'

export const forgotpassSchema = yup.object().shape({
  email: yup.string().email('Email invalide').required('Email requis'),
})
