import React from 'react'

export default function Heading({ name }) {
  return (
    <div className="flex w-full relative">
      <h1
        className="text-xl lg:text-3xl w-full text-black font-bold capitalize border-b border-b-gray-300 after:absolute after:left-0 after:bottom-0
        after:w-[80px] after:h-[2px] after:bg-gray-800 pb-2"
      >
        {name}
      </h1>
    </div>
  )
}
