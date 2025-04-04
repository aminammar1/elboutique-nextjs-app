import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { SiMeta } from 'react-icons/si'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function ProductShare({ product }) {
    const pathname = usePathname()
    return (
    <ul className="flex justify-between flex-wrap items-center gap-1 mt-auto w-full">
        <li className="inline-flex items-center gap-4">
        <h6 className="capitalize">SKU: </h6>
        <span className="text-primary uppercase ms-auto">
            {product && product._id ? product._id.substring(0, 8) : 'N/A'}
        </span>
        </li>
        <li className="inline-flex items-center gap-4">
        <h6 className="capitalize">categories: </h6>
        <div className="text-primary capitalize inline-flex gap-4 ms-auto">
            {product && product.category && Array.isArray(product.category) &&
            product.category.map((cat, idx) => {
                return (
                <Link
                    href={`/categories/${cat.toLowerCase()}/products`}
                    key={idx}
                >
                    {cat}
                </Link>
                )
            })}
        </div>
        </li>

        <li className="inline-flex items-center gap-8">
        <h6 className="capitalize">share: </h6>
        <div className=" capitalize inline-flex gap-8 ms-auto text-slate-700">
            <Link
            target="_blank"
            href={`https://x.com/intent/post?url=${window.location.origin}${pathname}`}
            >
            <FaXTwitter className="hover:text-primary" />
            </Link>
            <Link
            target="_blank"
                href={`https://www.instagram.com/share?url=${window.location.origin}${pathname}`}
            >
            <FaInstagram className="hover:text-primary" />
            </Link>
            <Link
            target="_blank"
            href={`https://facebook.com/sharer/sharer.php?u=${window.location.origin}${pathname}`}
            >
            <SiMeta className="hover:text-primary" />
            </Link>
        </div>
        </li>
    </ul>
    )
}
