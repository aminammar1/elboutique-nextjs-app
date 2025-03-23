import HeadingSidebar from '@/components/custom/HeadingSidebar'
import React from 'react'
import ProdCatAccordions from '@/components/custom/ProdCatAccordions'
import ProductFilter from '@/components/custom/ProductFilter'


export default function StoreSideBar({
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    loading,
    setLoading,
    className,}) {

        return (
            <div className={`lg:max-w-[300px] h-full ${className}`}>
                <div className="flex flex-col gap-8 items-center">
                {/* product categories  */}
                <div className="flex flex-col gap-6 items-center w-full" >
                    <HeadingSidebar name="Product categories" />
                    <ProdCatAccordions />
                </div>
        
                {/* filters prices */}
                <div className="flex flex-col gap-2 items-center w-full">
                    <HeadingSidebar name="Filter by price" />
                    <ProductFilter
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    setMinPrice={setMinPrice}
                    setMaxPrice={setMaxPrice}
                    setLoading={setLoading}
                    loading={loading}
                    />
                </div>
        
                {/* latest products  */}
                </div>
            </div>
            )
        }