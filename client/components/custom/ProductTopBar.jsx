'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuRadioItem,
} from './dropdown-menu'
import MobileSidebarLeft from './MobileSideBarLeft'
import { Button } from './Button'
import { fetchFilteredProducts } from '@/actions/product'

export default function ProductsTopBar({
  productID,
  perpage,
  setPerPages,
  setFilter,
  filter,
  loading,
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  setLoading,
  page,
  setPage,
  products,
  setProducts,
}) {
  const handleFilterChange = async (filterValue) => {
    setFilter(filterValue)
    setPage(1)
    setLoading(true)
    try {
      const res = await fetchFilteredProducts(filterValue, perpage, 1)
      setProducts(res.data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const handlePerPageChange = async (newPerPage) => {
    setPerPages(newPerPage)
    setPage(1)
    setLoading(true)
    try {
      const res = await fetchFilteredProducts(filter, newPerPage, 1)
      setProducts(res.data)
    } catch (err) {
      console.error('Error updating perPage:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="lg:flex items-center justify-between w-full">
      <div className="w-full flex items-center gap-4 flex-1 justify-between">
        <MobileSidebarLeft
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          loading={loading}
          setLoading={setLoading}
        />

        <div className="hidden lg:flex">
          Showing {Math.min(products.length, perpage * page)} of {products.length} results
        </div>

        <div className="ms-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{filter || productID}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={filter}>
                <DropdownMenuRadioItem value="alphabetic" onClick={() => handleFilterChange('alphabetic')}>
                  Alphabetic
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="priceLowToHigh" onClick={() => handleFilterChange('priceLowToHigh')}>
                  Price: Low to high
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="priceHighToLow" onClick={() => handleFilterChange('priceHighToLow')}>
                  Price: High to low
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="latest" onClick={() => handleFilterChange('latest')}>
                  Latest
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <span className="ms-4">Show:</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{perpage}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={String(perpage)}>
                <DropdownMenuRadioItem value="10" onClick={() => handlePerPageChange(10)}>
                  10
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20" onClick={() => handlePerPageChange(20)}>
                  20
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="30" onClick={() => handlePerPageChange(30)}>
                  30
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
