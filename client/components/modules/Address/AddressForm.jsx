    'use client'

    import React, { useState } from 'react'
    import { Formik, Form, Field, ErrorMessage } from 'formik'
    import * as yup from 'yup'
    import { cn } from '@/lib/utils'
    import { Button } from '@/components/custom/Button'
    import { createAddress, updateAddress } from '@/actions/address'
    import toast from 'react-hot-toast'
    import Toast from '@/components/custom/Toast'

    const AddressForm = ({ initialValues = {}, onSuccess }) => {
    const [loading, setLoading] = useState(false)

    const isEditMode = !!initialValues._id

    const defaultValues = {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        ...initialValues,
    }

    const validationSchema = yup.object().shape({
        firstName: yup
        .string()
        .min(3, 'First name must have at least 3 characters')
        .max(20, 'First name can have at most 20 characters')
        .required('First name is required'),
        lastName: yup
        .string()
        .min(3, 'Last name must have at least 3 characters')
        .max(20, 'Last name can have at most 20 characters')
        .required('Last name is required'),
        phoneNumber: yup
        .string()
        .min(3, 'Phone must have at least 3 characters')
        .max(20, 'Phone can have at most 20 characters')
        .required('Phone number is required'),
        address: yup
        .string()
        .min(3, 'Address must have at least 3 characters')
        .max(100, 'Address can have at most 100 characters')
        .required('Address is required'),
        city: yup
        .string()
        .min(3, 'City must have at least 3 characters')
        .max(50, 'City can have at most 50 characters')
        .required('City is required'),
        state: yup
        .string()
        .min(2, 'State must have at least 2 characters')
        .max(50, 'State can have at most 50 characters')
        .required('State is required'),
        zipCode: yup
        .string()
        .min(3, 'Zip code must have at least 3 characters')
        .max(20, 'Zip code can have at most 20 characters')
        .required('Zip code is required'),
        country: yup.string().required('Country is required'),
    })

    const handleSubmit = async (values, { resetForm }) => {
        setLoading(true)
        try {
        let response

        if (isEditMode) {
            response = await updateAddress(initialValues._id, values)
            if (response && !response.error) {
            toast.custom(
                <Toast message="Address updated successfully" status="success" />
            )
            if (onSuccess) onSuccess()
            } else {
            toast.custom(
                <Toast message="Failed to update address" status="error" />
            )
            }
        } else {
            response = await createAddress(values)
            if (response && !response.error) {
            toast.custom(
                <Toast message="Address added successfully" status="success" />
            )
            resetForm()
            if (onSuccess) onSuccess()
            } else {
            toast.custom(
                <Toast message="Failed to create address" status="error" />
            )
            }
        }
        } catch (error) {
        console.error('Error saving address:', error)
        toast.custom(<Toast message="An error occurred" status="error" />)
        } finally {
        setLoading(false)
        }
    }

    return (
        <Formik
        initialValues={defaultValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
        >
        {({ errors, touched }) => (
            <Form className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
                <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                First Name
                </label>
                <Field
                name="firstName"
                type="text"
                id="firstName"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.firstName && touched?.firstName && 'border-red-700'
                )}
                placeholder="John"
                />
                <ErrorMessage
                name="firstName"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div>
                <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                Last Name
                </label>
                <Field
                name="lastName"
                type="text"
                id="lastName"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.lastName && touched?.lastName && 'border-red-700'
                )}
                placeholder="Doe"
                />
                <ErrorMessage
                name="lastName"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div>
                <label
                htmlFor="phoneNumber"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                Phone Number
                </label>
                <Field
                name="phoneNumber"
                type="text"
                id="phoneNumber"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.phoneNumber && touched?.phoneNumber && 'border-red-700'
                )}
                placeholder="+1 234 567 8900"
                />
                <ErrorMessage
                name="phoneNumber"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div>
                <label
                htmlFor="country"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                Country
                </label>
                <Field
                as="select"
                name="country"
                id="country"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.country && touched?.country && 'border-red-700'
                )}
                >
                <option value="">Select Country</option>
                <option value="Tunisia">Tunisia</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="USA">USA</option>
                <option value="Spain">Spain</option>
                <option value="UK">UK</option>
                <option value="Germany">Germany</option>
                </Field>
                <ErrorMessage
                name="country"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div>
                <label
                htmlFor="city"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                City
                </label>
                <Field
                name="city"
                type="text"
                id="city"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.city && touched?.city && 'border-red-700'
                )}
                placeholder="New York"
                />
                <ErrorMessage
                name="city"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div>
                <label
                htmlFor="state"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                State/Province
                </label>
                <Field
                name="state"
                type="text"
                id="state"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.state && touched?.state && 'border-red-700'
                )}
                placeholder="NY"
                />
                <ErrorMessage
                name="state"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div>
                <label
                htmlFor="zipCode"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                Zip/Postal Code
                </label>
                <Field
                name="zipCode"
                type="text"
                id="zipCode"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.zipCode && touched?.zipCode && 'border-red-700'
                )}
                placeholder="10001"
                />
                <ErrorMessage
                name="zipCode"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div className="sm:col-span-2">
                <label
                htmlFor="address"
                className="mb-2 block text-sm font-medium text-gray-900"
                >
                Street Address
                </label>
                <Field
                name="address"
                type="text"
                id="address"
                className={cn(
                    'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500',
                    errors?.address && touched?.address && 'border-red-700'
                )}
                placeholder="123 Main St, Apt 4B"
                />
                <ErrorMessage
                name="address"
                component="div"
                className="mt-1 text-sm text-red-600"
                />
            </div>

            <div className="sm:col-span-2 mt-4">
                <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto"
                >
                {loading
                    ? 'Saving...'
                    : isEditMode
                    ? 'Update Address'
                    : 'Save Address'}
                </Button>
            </div>
            </Form>
        )}
        </Formik>
    )
    }

    export default AddressForm
