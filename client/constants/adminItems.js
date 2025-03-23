import {
    FolderOpen,
    Folders,
    Shirt,
    Store,
    } from 'lucide-react'


export const adminItems = [
    {
    href: '/account/upload-category',
    icon: <FolderOpen />,
    label: 'Upload Category',
    },
    {
    href: '/account/manage-subcategory',
    icon: <Folders />,
    label: 'Manage Subcategories',
    },
    {
    href: '/account/upload-products',
    icon: <Shirt />,
    label: 'Upload Products',
    },
    { href: '/account/admin-products', icon: <Store />, label: 'Products' },
]
