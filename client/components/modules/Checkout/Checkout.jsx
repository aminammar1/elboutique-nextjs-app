'use client'

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { cn } from '@/lib/utils'
import { AlertCircleIcon, LockKeyhole, Plus } from 'lucide-react'
import { deliveries, payments } from '@/constants/CheckoutData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Toast from '@/components/custom/Toast'
import toast from 'react-hot-toast'
import Loading from '@/components/custom/Loading'
import CurrencyFormat from '@/components/custom/FormatCurrency'
import { Button } from '@/components/custom/Button'
import { createAddress, getAllAddresses } from '@/actions/address'
import { verifyCoupon } from '@/actions/coupons'

export default function CheckoutPage({ couponGenerated }) {
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    state: '',
    city: '',
    zipCode: '',
    address: '',
    country: '',
  }

  const initialCoupon = {
    coupon: '',
  }

  const [loading, setLoading] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0)
  const [discount, setDiscount] = useState(0)
  const cart = useSelector((state) => state.cart)

  const shippingFee = 0
  const subtotal = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  const validate = yup.object().shape({
    firstName: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(20, 'Maximum 20 characters')
      .required('First name is required'),
    lastName: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(20, 'Maximum 20 characters')
      .required('Last name is required'),
    phoneNumber: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(20, 'Maximum 20 characters')
      .required('Phone is required'),
    state: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(100, 'Maximum 20 characters')
      .required('state is required'),
    city: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(100, 'Maximum 20 characters')
      .required('City is required'),
    zipCode: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(100, 'Maximum 20 characters')
      .required('Zip code is required'),
    address: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(100, 'Maximum 20 characters')
      .required('Address  is required'),
    country: yup.string().required('Country is required'),
  })

  const validateCoupon = yup.object().shape({
    coupon: yup
      .string()
      .min(3, 'must have at least 3 characters')
      .max(20, 'Maximum 20 characters')
      .required('Promo code is required'),
  })

  const router = useRouter()

  useEffect(() => {
    async function fetchAddresses() {
      setLoading(true)
      const res = await getAllAddresses()
      if (res && res.data) setAddresses(res.data)
      setLoading(false)
    }
    fetchAddresses()
  }, [])

  useEffect(() => {
    if (cart) {
      const total =
        discount > 0 ? subtotal - (subtotal * discount) / 100 : subtotal
      setTotalAfterDiscount(total)
    }
  }, [cart, discount, subtotal])

  return (
    <>
      <div className="">
        {loading && <Loading isLoading={loading} />}
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="flex-1 gap-y-8">
            {/* Address Form */}
            <Formik
              enableReinitialize
              initialValues={initialValues}
              validationSchema={validate}
              onSubmit={async (values, { resetForm }) => {
                if (loading) return
                if (addresses.length >= 4) {
                  toast.custom(
                    <Toast
                      message="You reached the address limit"
                      status="error"
                    />
                  )
                  return
                }
                setLoading(true)
                const res = await createAddress(values)
                if (res && res.data) {
                  setAddresses([...addresses, res.data])
                  toast.custom(
                    <Toast
                      message="Address created successfully"
                      status="success"
                    />
                  )
                  resetForm()
                } else {
                  toast.custom(
                    <Toast message="Failed to create address" status="error" />
                  )
                }
                setLoading(false)
                router.refresh()
              }}
            >
              {({ errors, touched }) => (
                <div className="">
                  <h4 className="border-b border-border mb-10 ">
                    Add New Address
                  </h4>

                  <Form>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {' '}
                          Your first name{' '}
                        </label>
                        <Field
                          name="firstName"
                          type="text"
                          id="firstName"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-gray-700 dark:focus:ring-gray-700',
                            errors?.firstName &&
                              touched?.firstName &&
                              'border border-red-700'
                          )}
                          placeholder="First name"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {' '}
                          Your last name{' '}
                        </label>
                        <Field
                          name="lastName"
                          type="text"
                          id="lastName"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.lastName &&
                              touched?.lastName &&
                              'border border-red-700'
                          )}
                          placeholder="Last Name"
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center gap-2">
                          <label
                            htmlFor="select-country-input-3"
                            className="block text-sm font-medium text-gray-900 "
                          >
                            {' '}
                            Country*{' '}
                          </label>
                        </div>
                        <Field
                          as="select"
                          name="country"
                          id="country"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.country &&
                              touched?.country &&
                              'border border-red-700'
                          )}
                        >
                          <option value="">Select</option>
                          <option value="Tunisia"> Tunisia</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="usa">Usa</option>
                          <option value="spain">Spain</option>
                          <option value="uk">UK</option>
                          <option value="germany">Germany</option>
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phoneNumber"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {' '}
                          Your phone{' '}
                        </label>
                        <Field
                          name="phoneNumber"
                          type="text"
                          id="phoneNumber"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.phoneNumber &&
                              touched?.phoneNumber &&
                              'border border-red-700'
                          )}
                          placeholder="+216"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {' '}
                          Your city{' '}
                        </label>
                        <Field
                          name="city"
                          type="text"
                          id="city"
                          className={cn(
                            'placeholder:block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.city &&
                              touched?.city &&
                              'border border-red-700'
                          )}
                          placeholder="City"
                        />
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          {' '}
                          Your state{' '}
                        </label>
                        <Field
                          name="state"
                          type="text"
                          id="state"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.state &&
                              touched?.state &&
                              'border border-red-700'
                          )}
                          placeholder="State"
                        />
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Your adresse{' '}
                        </label>
                        <Field
                          name="address"
                          type="text"
                          id="address"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.address &&
                              touched?.address &&
                              'border border-red-700'
                          )}
                          placeholder="Address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="zipCode"
                          className="mb-2 block text-sm font-medium text-gray-900 "
                        >
                          Your zip code{' '}
                        </label>
                        <Field
                          name="zipCode"
                          type="text"
                          id="zipCode"
                          className={cn(
                            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700  dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500',
                            errors?.zipCode &&
                              touched?.zipCode &&
                              'border border-red-700'
                          )}
                          placeholder="zip"
                        />
                        <ErrorMessage
                          name="zipCode"
                          component="div"
                          className="py-2 font-bold text-red-700"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <Button
                          variant="default"
                          size="lg"
                          disabled={loading}
                          type="submit"
                          className="flex gap-4"
                        >
                          <Plus />
                          <h6>Save</h6>
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>

            {/* Address list */}
            <div className="space-y-4 my-8">
              <h5 className="border-b border-border my-10">
                Choose an address
              </h5>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {addresses &&
                  addresses.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedAddress(item)}
                      className={cn(
                        'rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 cursor-pointer',
                        item._id === selectedAddress?._id &&
                          'border-2 border-gray-900'
                      )}
                    >
                      <div className="flex items-start">
                        <div className="ms-4 text-sm">
                          <h6>{item.firstName + ' ' + item.lastName}</h6>
                          <p className="mt-1 text-xs font-normal text-gray-500 ">
                            {item.country +
                              ' ' +
                              item.city +
                              ' ' +
                              item.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Payment method */}
            <div className="space-y-4 my-8">
              <h5 className="border-b border-border my-10">
                Choose a payment method
              </h5>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {payments &&
                  payments.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedPayment(item)}
                      className={cn(
                        'rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800  cursor-pointer',
                        item.id === selectedPayment?.id &&
                          'border-2 border-gray-900'
                      )}
                    >
                      <div className="flex items-start">
                        <div className="text-sm">
                          <label className="font-medium leading-none text-gray-900  capitalize">
                            {item.title}
                          </label>
                          <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Image src={item.image} alt="" width={50} height={50} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Delivery method */}
            <div className="space-y-4 my-8">
              <h5 className="border-b border-border my-10">
                Choose a delivery method
              </h5>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {deliveries &&
                  deliveries.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedDelivery(item)}
                      className={cn(
                        'rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800 cursor-pointer',
                        item.id === selectedDelivery?.id &&
                          'border-2 border-gray-900'
                      )}
                    >
                      <div className="flex items-start">
                        <div className="text-sm">
                          <label className="font-medium leading-none text-gray-900  capitalize">
                            {item.title}
                          </label>
                          <p className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        <Image src={item.image} alt="" width={50} height={50} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full space-y-11 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <h2 className="text-xl font-semibold text-gray-900">
              Summary Details
            </h2>
            {/* Promo code submit */}
            <Formik
              enableReinitialize
              initialValues={initialCoupon}
              validationSchema={validateCoupon}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                if (loading) return
                setLoading(true)
                const res = await verifyCoupon(values.coupon)
                if (res && res.data) {
                  setDiscount(10) // Always apply 10% discount on valid coupon
                  toast.custom(
                    <Toast message={'Coupon applied'} status="success" />
                  )
                } else {
                  setDiscount(0)
                  toast.custom(
                    <Toast message={'Invalid coupon'} status="error" />
                  )
                }
                setLoading(false)
                setSubmitting(false)
                resetForm()
              }}
            >
              {({ errors, touched, handleSubmit }) => (
                <Form>
                  <div className="flex max-w-md items-center gap-4">
                    <Field
                      name="coupon"
                      id="coupon"
                      className={cn(
                        'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 ',
                        errors?.coupon &&
                          touched?.coupon &&
                          'border border-red-700'
                      )}
                      placeholder="Paste your code here"
                    />
                    <Button
                      variant="default"
                      size="lg"
                      disabled={loading}
                      onClick={handleSubmit}
                      type="button"
                    >
                      Apply
                    </Button>
                  </div>
                  <ErrorMessage
                    name="coupon"
                    component="div"
                    className="py-2 font-bold text-red-700"
                  />
                  <div className="flex items-center gap-4 pt-4 cursor-pointer">
                    <AlertCircleIcon size={16} />{' '}
                    <p
                      onClick={() => {
                        navigator.clipboard.writeText(couponGenerated || '')
                        toast(
                          couponGenerated
                            ? 'code copied'
                            : 'Sorry no promo code available right now!'
                        )
                      }}
                    >
                      Click to copy this Code:{' '}
                      <strong className="">
                        {couponGenerated
                          ? couponGenerated
                          : 'No free Code available now '}
                      </strong>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 ">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 ">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 ">
                    <CurrencyFormat value={subtotal} className="text-right" />
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 ">
                    Shipping
                  </dt>
                  <dd className="text-xl font-medium text-red-500">
                    + {shippingFee}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 ">
                    Promo code
                  </dt>
                  <dd className="text-base font-bold text-green-500">
                    - {discount ? discount : 0}%{' '}
                    <strong className="text-black">
                      ({discount ? (discount * subtotal) / 100 : ''})
                    </strong>
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 ">Total</dt>
                  <dd className="text-base font-bold text-gray-900 ">
                    <CurrencyFormat
                      value={totalAfterDiscount}
                      className="text-right font-bold"
                    />
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                disabled={loading}
                type="submit"
                className="w-full flex justify-center gap-4"
              >
                <LockKeyhole />
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
