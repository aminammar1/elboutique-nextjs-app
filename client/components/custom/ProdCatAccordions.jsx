import React, { useState, useEffect } from "react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./accordation"
import Link from "next/link"
import { getCategories } from "@/actions/Categories"
import { getAllSubcategories } from "@/actions/Subcategories"

export default function ProdCatAccordions() {
    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])
    const [checkedCategory, setCheckedCategory] = useState(null)

    useEffect(() => {
        loadCategories()
        loadSubcategories()
    }, []);

    const loadCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data)
        } catch (error) {
            console.log("Error loading categories");
        }
    };

    const loadSubcategories = async () => {
        try {
            const data = await getAllSubcategories();
            setSubcategories(data)
        } catch (error) {
            console.log("Error loading subcategories");
        }
    };

    return (
        <Accordion type="single" collapsible className="w-full space-y-2">
            {categories.map((category) => (
                <AccordionItem key={category._id} value={category._id}>
                    <AccordionTrigger 
                        categoryId={category._id}
                        checkedCategory={checkedCategory}
                        setCheckedCategory={setCheckedCategory}
                    >
                        <Link href={`/category/${category.link}/products`} className="capitalize text-xl">
                        {category.name}
                        </Link>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4 ms-10">
                            {subcategories
                                .filter(subcategory => subcategory.category?.[0]?._id === category._id)
                                .map((subcategory) => (
                                    <Link 
                                        key={subcategory._id} 
                                        href={`/category/${category.link}/${subcategory.link}/products`}
                                        className="text-xl min-w-40 hover:text-gray-700 capitalize"
                                    >
                                        {subcategory.name}
                                    </Link>
                                ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    )
}
