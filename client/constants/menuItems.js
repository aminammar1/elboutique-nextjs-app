
import {
    BadgeDollarSign,
    LayoutDashboard,
    BookUser,
  } from 'lucide-react'


export const menuItems = [
    { href: '/account/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { href: '/account/orders', icon: <BadgeDollarSign />, label: 'Your Orders' },
    { href: '/account/address', icon: <BookUser />, label: 'Your Addresses' },
]
