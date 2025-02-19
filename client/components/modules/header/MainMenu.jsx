'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'


export default function MainMenu() {
    {/* State */}
    const pathname = usePathname()

    const [show , setShow] = useState(false)


    {/* Functions */}

    {/** UI  */}

    return (
        <div className='z-[9] hidden xl:block relative'>
            <ul className='flex gap-32 justify-between items-center text-xl font-medium capitalize'>
                {/** Pages */}
                <li className='relative'>
                    <Link 
                        href='/'
                         className={cn(
                            "h-full duration-300 after:absolute after:top-[26px] after:left-0  after:w-0 after:h-1 after:bg-black after:duration-100 after:ease-linear hover:after:w-full",
                            pathname == '/' && "border-b-2 border-b-black"
                          )}
                        > Home 
                    </Link>
                </li>
                <li className='relative'>
                    <Link 
                        href='/products'
                        className={cn(
                            "h-full duration-300 after:absolute after:top-[26px] after:left-0  after:w-0 after:h-1 after:bg-black after:duration-100 after:ease-linear hover:after:w-full",
                            pathname == '/products' && "border-b-2 border-b-black"
                          )}
                        > Store 
                    </Link>
                </li>

                {/** Categories */}
                <li className='group'>
                    <button 
                        className='capitalize inline-flex items-center cursor-pointer'
                        onClick={() => setShow(!show)}
                    >
                        Categories
                        <ChevronDown className='mt-1' />
                    </button>
                    <AnimatePresence>
                    {show && (
                    <m.div
                        // onMouseLeave={() => setShow(!show)}
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
                            {/** Show category  */}
                        </m.div>
                    )}
                </AnimatePresence>    
                </li>   
                         
            </ul>

        </div>
    )
}