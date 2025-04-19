'use client'

import React, { useState, useEffect } from 'react'
import Container from '@/components/custom/Container'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/custom/costumeUI'
import {
  getAllAddresses,
  deleteAddress,
  updateAddress,
  createAddress,
} from '@/actions/address'
import { MapPin, Edit, Trash, Plus } from 'lucide-react'
import { Button } from '@/components/custom/Button'
import toast from 'react-hot-toast'
import Toast from '@/components/custom/Toast'
import Loading from '@/components/custom/Loading'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { cn } from '@/lib/utils'

export default function AddressPage() {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      const res = await getAllAddresses()
      if (res && res.data) {
        setAddresses(res.data)
      }
    } catch (error) {
      console.error('Error fetching addresses:', error)
      toast.custom(<Toast message="Failed to load addresses" status="error" />)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        setLoading(true)
        const res = await deleteAddress(id)
        if (res && !res.error) {
          setAddresses(addresses.filter((address) => address._id !== id))
          toast.custom(
            <Toast message="Address deleted successfully" status="success" />
          )
        } else {
          toast.custom(
            <Toast message="Failed to delete address" status="error" />
          )
        }
      } catch (error) {
        console.error('Error deleting address:', error)
        toast.custom(
          <Toast message="Failed to delete address" status="error" />
        )
      } finally {
        setLoading(false)
      }
    }
  }

  const handleEditAddress = (address) => {
    setEditingAddress(address)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('Zip code is required'),
    country: yup.string().required('Country is required'),
  })

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true)

      if (editingAddress) {
        // Update existing address
        const res = await updateAddress(editingAddress._id, values)
        if (res && !res.error) {
          toast.custom(
            <Toast message="Address updated successfully" status="success" />
          )
          setEditingAddress(null)
          setShowForm(false)
          fetchAddresses()
        } else {
          toast.custom(
            <Toast message="Failed to update address" status="error" />
          )
        }
      } else {
        // Create new address
        const res = await createAddress(values)
        if (res && !res.error) {
          toast.custom(
            <Toast message="Address created successfully" status="success" />
          )
          resetForm()
          setShowForm(false)
          fetchAddresses()
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
    <>
      <section className="my-10 p-3">
        <Container>
          <Breadcrumb>
            <BreadcrumbList className="capitalize flex flex-wrap">
              <Link href="/" className="text-xl hover:text-black">
                Home
              </Link>
              <BreadcrumbSeparator />
              <Link
                href="/account/dashboard"
                className="text-xl hover:text-black"
              >
                Dashboard
              </Link>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-xl font-bold hover:text-gray-700">
                  My Addresses
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {loading && <Loading isLoading={loading} />}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Addresses</h2>
            <Button
              onClick={() => {
                setEditingAddress(null)
                setShowForm(!showForm)
              }}
            >
              {showForm ? 'Cancel' : 'Add New Address'}
            </Button>
          </div>

          {/* Address Form */}
          {showForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold mb-4">
                {editingAddress ? 'Edit Address' : 'Add New Address'}
              </h3>

              <Formik
                initialValues={
                  editingAddress || {
                    firstName: '',
                    lastName: '',
                    phoneNumber: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: '',
                  }
                }
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ errors, touched }) => (
                  <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block mb-1 font-medium"
                      >
                        First Name
                      </label>
                      <Field
                        name="firstName"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.firstName &&
                            touched.firstName &&
                            'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="lastName"
                        className="block mb-1 font-medium"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lastName"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.lastName &&
                            touched.lastName &&
                            'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phoneNumber"
                        className="block mb-1 font-medium"
                      >
                        Phone Number
                      </label>
                      <Field
                        name="phoneNumber"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.phoneNumber &&
                            touched.phoneNumber &&
                            'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="block mb-1 font-medium"
                      >
                        Country
                      </label>
                      <Field
                        as="select"
                        name="country"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.country && touched.country && 'border-red-500'
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
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="city" className="block mb-1 font-medium">
                        City
                      </label>
                      <Field
                        name="city"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.city && touched.city && 'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label htmlFor="state" className="block mb-1 font-medium">
                        State
                      </label>
                      <Field
                        name="state"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.state && touched.state && 'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="zipCode"
                        className="block mb-1 font-medium"
                      >
                        Zip Code
                      </label>
                      <Field
                        name="zipCode"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.zipCode && touched.zipCode && 'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="zipCode"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label
                        htmlFor="address"
                        className="block mb-1 font-medium"
                      >
                        Street Address
                      </label>
                      <Field
                        name="address"
                        className={cn(
                          'w-full px-3 py-2 border rounded-md',
                          errors.address && touched.address && 'border-red-500'
                        )}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Button type="submit" className="mt-2">
                        {editingAddress ? 'Update Address' : 'Save Address'}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <MapPin className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No addresses yet
              </h3>
              <p className="text-gray-500 mb-8">
                Add your first shipping address
              </p>
              {!showForm && (
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Address
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((address) => (
                <div
                  key={address._id}
                  className="bg-white p-5 rounded-lg shadow-md relative"
                >
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address._id)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <Trash size={16} className="text-red-500" />
                    </button>
                  </div>

                  <h3 className="font-bold text-lg mb-2">
                    {address.firstName} {address.lastName}
                  </h3>

                  <div className="space-y-1 text-gray-600">
                    <p>{address.address}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                    <p className="pt-2 font-medium">{address.phoneNumber}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
