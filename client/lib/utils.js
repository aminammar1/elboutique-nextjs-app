import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function dateTostring(date) {
  const parsedDate = new Date(date)
  return parsedDate.toISOString().slice(0, 16).replace('T', ' ')
}

export const discountPrice = (price, discount) => {
  if (typeof price !== 'number' || typeof discount !== 'number') return 0
  return parseFloat(((price * (100 - discount)) / 100).toFixed(2))
}

export const getDate = (date) => {
  return new Date(date).toDateString()
}

export const getRatingNote = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) return 0
  
  const ratingTotal = reviews.reduce((acc, review) => acc + (review?.rating || 0), 0)
  const rating = (ratingTotal / reviews.length).toFixed(0)
  
  return parseFloat(rating) || 0
}

export const getBestPriceWithDiscountFromProduct = (product) => {
  if (!product || typeof product !== 'object' || typeof product.price !== 'number') return 0
  return discountPrice(product.price, product.discount || 0)
}

export const getBestPriceWithoutDiscountFromProduct = (product) => {
  if (!product || typeof product !== 'object' || typeof product.price !== 'number') return 0
  return product.price
}

export const getDiscountRate = (price, discountPrice) => {
  if (typeof price !== 'number' || typeof discountPrice !== 'number' || price === 0) return 0
  const discountRate = ((price - discountPrice) * 100) / price
  return parseFloat(discountRate.toFixed(2))
}
