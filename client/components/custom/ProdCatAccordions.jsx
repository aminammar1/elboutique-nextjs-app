    'use client'

    import React, { useEffect, useState } from 'react'
    import { useRouter, useSearchParams } from 'next/navigation'
    import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordation'
    import Link from 'next/link'
    import { getCategories } from '@/actions/Categories'
    import { getAllSubcategories } from '@/actions/Subcategories'

    export default function ProdCatAccordions() {
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [checkedCategory, setCheckedCategory] = useState(null)

    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const categoryFromURL = searchParams.get('category')
        if (categoryFromURL) {
        setCheckedCategory(categoryFromURL)
        }
    }, [searchParams])
    
    useEffect(() => {
        const fetchData = async () => {
        const cats = await getCategories()
        const subs = await getAllSubcategories()
        setCategories(cats)
        setSubcategories(subs)
        }
        fetchData()
    }, [])

    return (
        <Accordion type="multiple" className="w-full space-y-2">
        {categories.map((category) => (
            <AccordionItem key={category._id} value={category._id}>
            <AccordionTrigger
                categoryId={category._id}
                checkedCategory={checkedCategory}
                setCheckedCategory={setCheckedCategory}
                router={router}
            >
                <span className="capitalize text-xl cursor-pointer">
                {category.name}
                </span>
            </AccordionTrigger>

            <AccordionContent>
                <div className="flex flex-col gap-4 ms-10">
                {subcategories
                    .filter((sub) => sub.category?.[0]?._id === category._id)
                    .map((sub) => (
                    <Link
                        key={sub._id}
                        href={`/subcategory/${sub._id}/products`}
                        className="text-xl min-w-40 hover:text-gray-700 capitalize"
                    >
                        {sub.name}
                    </Link>
                    ))}
                </div>
            </AccordionContent>
            </AccordionItem>
        ))}
        </Accordion>
    )
    }
