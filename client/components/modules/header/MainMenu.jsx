'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { m, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getAllSubcategories } from  '@/actions/Subcategories'

export default function MainMenu() {
    // State
    const pathname = usePathname()
    const [show, setShow] = useState(false)
    const [categories, setCategories] = useState([])

    // Load Subcategories Data with Main Categories
    const loadSubcategories = async () => {
        try {
            const response = await getAllSubcategories()
            const categoryMap = new Map()
    
            response.forEach((subCat) => {
                if (subCat.category.length > 0) {
                    const mainCategory = subCat.category[0]
    
                    if (!categoryMap.has(mainCategory.name)) {
                        categoryMap.set(mainCategory.name, {
                            name: mainCategory.name,
                            link: mainCategory._id,
                            subcategories: [],
                        })
                    }
    
                    categoryMap.get(mainCategory.name).subcategories.push({
                        name: subCat.name,
                        link: subCat._id,
                    })
                }
            })
    
            setCategories(Array.from(categoryMap.values()))
        } catch (error) {
            console.error("Error loading subcategories:", error.message)
        }
    }
    

    // Load Data on Component Mount
    useEffect(() => {
        loadSubcategories()
    }, [])

    return (
        <div className="z-[9] hidden xl:block relative">
            <ul className="flex gap-32 justify-between items-center text-xl font-medium capitalize">
                
                {/* Navigation Links */}
                <li className="relative">
                    <Link href="/" className={cn(
                        "h-full duration-300 after:absolute after:top-[26px] after:left-0 after:w-0 after:h-1 after:bg-black after:duration-100 after:ease-linear hover:after:w-full",
                        pathname === '/' && "border-b-2 border-b-black"
                    )}>
                        Home
                    </Link>
                </li>
                <li className="relative">
                    <Link href="/products" className={cn(
                        "h-full duration-300 after:absolute after:top-[26px] after:left-0 after:w-0 after:h-1 after:bg-black after:duration-100 after:ease-linear hover:after:w-full",
                        pathname === '/products' && "border-b-2 border-b-black"
                    )}>
                        Store
                    </Link>
                </li>

                {/* Categories Dropdown */}
                <li className="group">
                    <button
                        className="capitalize inline-flex items-center cursor-pointer"
                        onClick={() => setShow(!show)}
                    >
                        Categories
                        <ChevronDown className="mt-1" />
                    </button>

                    <AnimatePresence>
                        {show && (
                            <m.div
                                exit={{
                                    y: -20,
                                    opacity: 0,
                                    filter: "blur(5px)",
                                    transition: { ease: "easeIn", duration: 0.22 },
                                }}
                                initial={{ opacity: 0, y: -15 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    filter: "blur(0px)",
                                    transition: { type: "spring", duration: 0.7 },
                                }}
                                className="grid grid-cols-4 justify-items-center grid-rows-auto fixed bg-white py-4 px-4 h-[560px] w-[1100px] z-[999999] 
                                right-[300px] top-[54px] gap-12 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] shadow-neutral-500"
                            >
                                {/* Display Categories and Subcategories */}
                                {categories.map((category, idx) => (
                                    <ul key={idx} className="flex flex-col gap-4 text-xl">
                                        <li>
                                            <Link
                                                href={`/categories/${category.link}/products`}
                                                className="font-bold group/item w-full transition-all flex items-center gap-2 duration-100 ease-linear hover:translate-x-1"
                                            >
                                                <h5 className="transition ease-in-out hover:text-black">
                                                    {category.name}
                                                </h5>
                                            </Link>
                                        </li>

                                        {/* Subcategories */}
                                        {category.subcategories.length > 0 &&
                                            category.subcategories.map((subCat, subIdx) => (
                                                <li
                                                    key={subIdx}
                                                    className="font-normal duration-100 ease-linear hover:translate-x-1"
                                                >
                                                    <Link
                                                        href={`/subcategory/${subCat.link}/products`}
                                                        className="hover:text-gray-600"
                                                    >
                                                        {subCat.name}
                                                    </Link>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                ))}
                            </m.div>
                        )}
                    </AnimatePresence>
                </li>
            </ul>
        </div>
    )
}
