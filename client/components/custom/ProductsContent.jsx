import React from 'react'
import { ShoppingBasket } from 'lucide-react'
import StoreProdCard from './StoreProdCard'



export default function ProductsContent({ products }) {
    return (
        <>
            {products.length === 0 ? (
            <div className="flex flex-col justify-center items-center py-20 px-20 w-full">
                <ShoppingBasket className="font-bold" size={100} />
                <h3 className="">No product found!</h3>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 relative">
                {products.map((product ,idx) => {
                return <StoreProdCard key={idx} product={product} />
                })}
            </div>
            )}
        </>
        )
    }
