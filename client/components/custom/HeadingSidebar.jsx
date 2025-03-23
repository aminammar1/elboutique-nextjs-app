import React from 'react'

export default function HeadingSidebar({ name }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-center w-full">
        <h6 className="capitalize text-xl">{name}</h6>
      </div>
    </div>
  )
}
