    'use client'

    import React, { useState, useEffect } from 'react'
    import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    } from '@/components/custom/sheet'
    import { ChevronLeft, ChevronRight } from 'lucide-react'
    import Link from 'next/link'
    import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    } from '@/components/custom/tabs'
    import { useRouter } from 'next/navigation'
    import { CiMenuFries } from 'react-icons/ci'
    import { Button } from '@/components/custom/Button'
    import { getAllSubcategories } from '@/actions/Subcategories'
    import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

    export default function SideBar() {
    const [show, setShow] = useState(false)
    const [subCategories, setSubCategories] = useState([])
    const [categories, setCategories] = useState([])
    const router = useRouter()

    const staticPages = [
        { name: 'Home', link: '/' },
        { name: 'Store', link: '/products' }
    ]

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
        console.error('Error loading subcategories:', error.message)
        }
    }

    useEffect(() => {
        loadSubcategories()
    }, [])

    return (
        <>
        {/* Main Sheet */}
        <Sheet>
            <SheetTrigger className="p-2">
            <CiMenuFries size={28} />
            </SheetTrigger>
            <SheetContent className="w-full max-w-sm px-4">
            <SheetHeader>
                <VisuallyHidden>
                <SheetTitle>Main Menu</SheetTitle>
                </VisuallyHidden>
            </SheetHeader>

            <Tabs defaultValue="category" className="mt-6 w-full">
                <TabsList className="grid grid-cols-2 gap-2">
                <TabsTrigger value="category" className="text-base">
                    Categories
                </TabsTrigger>
                <TabsTrigger value="menu" className="text-base">
                    Pages
                </TabsTrigger>
                </TabsList>

                <TabsContent value="category" className="mt-6 space-y-3">
                {categories.map((item) => (
                    <div
                    key={item.link}
                    className="flex items-center justify-between px-2 py-2 hover:bg-muted rounded-md group cursor-pointer"
                    >
                    <span
                        className="text-sm font-medium capitalize"
                        onClick={() =>
                        router.push(`/categories/${item.link}/products`)
                        }
                    >
                        {item.name}
                    </span>
                    {item.subcategories?.length > 0 && (
                        <ChevronRight
                        onClick={() => {
                            setShow(true)
                            setSubCategories(item.subcategories)
                        }}
                        className="text-muted-foreground group-hover:text-foreground h-4 w-4"
                        />
                    )}
                    </div>
                ))}
                </TabsContent>

                <TabsContent value="menu" className="mt-6 space-y-3">
                {staticPages.map((page, idx) => (
                    <Link
                    key={idx}
                    href={page.link}
                    className="block px-2 py-2 text-sm capitalize hover:bg-muted rounded-md"
                    >
                    {page.name}
                    </Link>
                ))}
                </TabsContent>
            </Tabs>
            </SheetContent>
        </Sheet>

        {/* Subcategory Sheet */}
        <Sheet open={show} onOpenChange={setShow}>
            <SheetTrigger />
            <SheetContent className="w-full max-w-sm px-4" side="left">
            <SheetHeader>
                <VisuallyHidden>
                <SheetTitle>Subcategory Menu</SheetTitle>
                </VisuallyHidden>
            </SheetHeader>

            <div className="flex flex-col gap-4 mt-6">
                <Button
                onClick={() => setShow(false)}
                variant="ghost"
                size="sm"
                className="w-fit text-sm flex items-center gap-1"
                >
                <ChevronLeft className="w-4 h-4" />
                Back
                </Button>

                {subCategories.map((item, idx) => (
                <Link
                    key={idx}
                    href={`/subcategory/${item.link}/products`}
                    className="text-sm capitalize px-2 py-2 rounded-md hover:bg-muted"
                >
                    {item.name}
                </Link>
                ))}
            </div>
            </SheetContent>
        </Sheet>
        </>
    )
    }
