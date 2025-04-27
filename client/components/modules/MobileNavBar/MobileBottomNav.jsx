    'use client'

    import Link from 'next/link'
    import { usePathname } from 'next/navigation'
    import { CiHome, CiUser, CiShop } from 'react-icons/ci'
    import { useSelector } from 'react-redux'

    export default function MobileBottomNav() {
    const pathname = usePathname()
    const { user } = useSelector((state) => state.user)

    const navItems = [
        { name: 'Home', href: '/', icon: <CiHome size={28} /> },
        { name: 'Store', href: '/products', icon: <CiShop size={28} /> }, // You can attach cart handler
        {
        name: user ? 'Account' : 'Login',
        href: user ? '/account/dashboard' : '/sign-in',
        icon: <CiUser size={28} />,
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-white border-t border-gray-200 shadow-md xl:hidden">
        {navItems.map((item, index) => (
            <Link
            key={index}
            href={item.href}
            className={`flex flex-col items-center text-sm ${
                pathname === item.href ? 'text-black font-semibold' : 'text-gray-500'
            }`}
            >
            {item.icon}
            <span>{item.name}</span>
            </Link>
        ))}
        </nav>
    )
    }
