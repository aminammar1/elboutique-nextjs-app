    'use client'

    import React from 'react'
    import { Button } from '@/components/custom/Button'
    import { CiLogin, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci'
    import { useRouter } from 'next/navigation'
    import { useSelector } from 'react-redux'
    import CartBar from './CartBar'
    import SearchBar from './SearchBar'

    export default function IconsGroups({
    openSearchBar,
    openCartBar,
    setOpenSearchBar,
    setOpenCartBar,
    }) {
    const router = useRouter()
    const { user } = useSelector((state) => state.user)
    const { cartItems = [] } = useSelector((state) => state.cart || {})

    return (
        <div className="flex items-center gap-12 relative">
            <div className="inline-flex items-center gap-6">
            <SearchBar openSearchBar={openSearchBar} setOpenSearchBar={setOpenSearchBar} />
            <Button
                variant="nostyle"
                size='icon'
                onClick={() => setOpenSearchBar(!openSearchBar)}
                className=" hidden lg:block relative hover:scale-110 transform transition-transform duration-300"
            >
                <CiSearch size={40} className="hover:text-black" />
                </Button>
                    <Button
                        id="openCart"
                        onClick={() => setOpenCartBar(!openCartBar)}
                        className="hidden lg:block relative"
                        variant="nostyle"
                        size="icon"
                >
                <CiShoppingCart size={40} className="font-bold hover:text-black" />
                <span className="absolute flex items-center justify-center text-white text-base -top-1 justify-items-stretch -right-1 h-6 w-6 rounded-full bg-black">
                {cartItems.length}
                </span>
            </Button>
            
            {user ? (
                <Button variant="nostyle" size='icon' onClick={() => router.push('/account/dashboard')} className=" hidden lg:block relative hover:scale-110 transform transition-transform duration-300">
                <CiUser size={40} /> 
                </Button>
            ) : (
            <Button
                variant="nostyle"
                size='icon'
                onClick={() => router.push('/sign-in')}
                className=" hidden lg:block relative hover:scale-110 transform transition-transform duration-300"
            >
                <CiLogin size={40} />
            </Button>
            )}

            <CartBar openCartBar={openCartBar} setOpenCartBar={setOpenCartBar} />

        </div>
        </div>
        )
    }
