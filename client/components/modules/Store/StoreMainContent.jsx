import Loading from '@/components/custom/Loading'
import ProductsContent from '@/components/custom/ProductsContent'
import ProductsTopBar from '@/components/custom/ProductTopBar'
import { Pagination } from '@mui/material'
import usePagination from '@/hooks/usePagination'
import React, { useEffect, useState } from 'react'
import { fetchProducts } from '@/actions/product'
import {
    getProductByCategoryID,
    getProductBySubcategoryID,
    getProductByPriceRange,
    } from '@/actions/product'

export default function StoreMainContent({
    categoryId,
    subcategoryId,
    maxPrice,
    minPrice,
    setMinPrice,
    setMaxPrice,
    className,
    loading,
    setLoading,
}) {
    const [products, setProducts] = useState([])
    const [perpage, setPerPages] = useState(10)
    const [filter, setFilter] = useState('latest')
    const [page, setPage] = useState(1)
    const count = Math.ceil(products.length / perpage)
    const _DATA = usePagination(products, perpage)

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
            let data
            if (subcategoryId) {
                data = await getProductBySubcategoryID(subcategoryId)
            } else if (categoryId) {
                data = await getProductByCategoryID(categoryId)
            
            }
            else if (minPrice !== 0 || maxPrice !== 7000) {
                data = await getProductByPriceRange (minPrice, maxPrice)
                } 
                else {
                data = await fetchProducts()
            }
            setProducts(data)
            } catch (err) {
            console.error(err)
            } finally {
            setLoading(false)
            }
        }
        getProducts()
        }, [categoryId, subcategoryId, minPrice, maxPrice])

    const handleChange = (event, p) => {
        setPage(p)
        _DATA.jump(p)
    }

    return (
        <>
            {loading && <Loading isLoading={loading} />}
            <div className={className}>
                <div className="flex flex-col gap-4">
                    <ProductsTopBar
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        setMinPrice={setMinPrice}
                        setMaxPrice={setMaxPrice}
                        loading={loading}
                        setLoading={setLoading}
                        perpage={perpage}
                        filter={filter}
                        setPerPages={setPerPages}
                        setFilter={setFilter}
                        maxPage={_DATA.maxPage}
                        page={_DATA.maxPage}
                        products={products}
                    />
                    <ProductsContent products={_DATA.currentData()} />
                    <div className="py-10 flex justify-between mt-auto">
                        <Pagination
                            count={count}
                            page={page}
                            color="black"
                            variant="outlined"
                            shape="rounded"
                            onChange={handleChange}
                        />
                        <div className="flex ms-auto">
                            Showing {_DATA.maxPage === page ? products.length : perpage * page} of {products.length} results
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
