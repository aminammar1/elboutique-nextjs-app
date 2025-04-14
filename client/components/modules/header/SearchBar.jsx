    'use client'

    import React, { useState } from 'react'
    import { Search, X } from 'lucide-react'
    import { Button } from '@/components/custom/Button'
    import { Dialog, DialogContent, DialogTitle } from '@/components/custom/Dialog'
    import  {Input}  from '@/components/custom/input'
    import Image from 'next/image'
    import { getBestPriceWithDiscountFromProduct } from '@/lib/utils'
    import Loading from '@/components/custom/Loading'
    import { useRouter } from 'next/navigation'
    import { searchProducts } from '@/actions/product'
    import toast from 'react-hot-toast'
    import Toast from '@/components/custom/Toast'

    export default function SearchBar({ openSearchBar, setOpenSearchBar }) {
    const router = useRouter()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = async (e) => {
        const search = e.currentTarget.value
        setLoading(true)

        if (search.length > 1) {
        searchProducts(search)
            .then((res) => {
            setData(res.data)
            setError(null)
            })
            .catch((err) => {
            setError(err.message)
            toast.custom(<Toast message={err.message} status="error" />)
            })
            .finally(() => {
            setLoading(false)
            })
        }
    }

    return (
        <Dialog open={openSearchBar}>
        <DialogContent className="sm:max-w-md lg:max-w-screen-xl z-[99999]">
            <DialogTitle className="sr-only">Search Products</DialogTitle>

            <div className="flex items-center w-full gap-4">
            <Search className="text-slate-300" />
            <Input
                onInput={handleSearch}
                placeholder="women shirt, shoes"
                className="outline-none text-black text-base"
            />
            <Button
                onClick={() => setOpenSearchBar(false)}
                type="button"
                variant="outline"
                className="hover:bg-black"
            >
                <X className="bg-transparent text-black hover:text-white" />
            </Button>
            </div>

            <div className="flex h-[600px] overflow-y-auto w-full py-12 gap-4 flex-col justify-start items-center px-12">
            {!loading ? (
                data?.map((product, idx) => (
                <div
                    onClick={() => {
                    router.push(`/products/${product._id}`)
                    setOpenSearchBar(false)
                    }}
                    title="Click to view product"
                    key={idx}
                    className="lg:h-fit group flex flex-col justify-start gap-8 px-8 items-center w-full py-4 hover:border-gray-50 cursor-pointer hover:scale-105 transition-all hover:shadow-lg lg:flex-row lg:px-2 lg:gap-32"
                >
                    <Image
                    src={product.image[0]}
                    height={80}
                    width={60}
                    className="object-contain"
                    alt={product.productName}
                    />
                    <h6 className="capitalize">
                        {product.productName?.substring(0, 100)}
                    </h6>
                    <div className="w-40 text-right lg:ms-auto font-bold text-xl text-black">
                    ${getBestPriceWithDiscountFromProduct(product)}
                    </div>
                </div>
                ))
            ) : (
                <Loading isLoading={loading} />
            )}
            </div>
        </DialogContent>
        </Dialog>
    )
    }
