import React from 'react'
import SideBar from './SideBar'


export default function MobileButton() {
    return (
        <div className="block xl:hidden">
            <SideBar />
        </div>
    )
}