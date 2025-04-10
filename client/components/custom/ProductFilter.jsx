import React, { useState, useEffect } from 'react'

export default function ProductFilter({
    setMinPrice,
    setMaxPrice,
    loading,
}) {
    const [minPricePreview, setMinPricePreview] = useState(0)
    const [maxPricePreview, setMaxPricePreview] = useState(2000)

    const handleMinInputChange = (e) => {
        const val = parseInt(e.target.value)
        if (!isNaN(val)) {
            const fixed = Math.max(0, val)
            setMinPricePreview(fixed)
            setMinPrice(fixed)
        }
    }

    const handleMaxInputChange = (e) => {
        const val = parseInt(e.target.value)
        if (!isNaN(val)) {
            const fixed = Math.min(7000, val)
            setMaxPricePreview(fixed)
            setMaxPrice(fixed)
        }
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-1 my-4">
                <div className="grid grid-cols-2 gap-3">
                    {/* Min Price Slider */}
                    <div>
                        <label
                            htmlFor="min-price"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Min Price
                        </label>
                        <input
                            disabled={loading}
                            type="range"
                            min="0"
                            max="2000"
                            step="10"
                            value={minPricePreview}
                            onChange={(e) => {
                                const val = parseInt(e.target.value)
                                if (!isNaN(val)) {
                                    setMinPricePreview(val)
                                    setMinPrice(val)
                                }
                            }}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                        />
                    </div>

                    {/* Max Price Slider */}
                    <div>
                        <label
                            htmlFor="max-price"
                            className="block text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Max Price
                        </label>
                        <input
                            disabled={loading}
                            type="range"
                            min="0"
                            max="2000"
                            step="10"
                            value={maxPricePreview}
                            onChange={(e) => {
                                const val = parseInt(e.target.value)
                                if (!isNaN(val)) {
                                    setMaxPricePreview(val)
                                    setMaxPrice(val)
                                }
                            }}
                            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
                        />
                    </div>

                    {/* Min and Max Number Inputs */}
                    <div className="col-span-2 flex items-center justify-between space-x-2">
                        <input
                            type="number"
                            id="min-price-input"
                            min="0"
                            max="2000"
                            step="10"
                            value={minPricePreview}
                            onChange={handleMinInputChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-black dark:text-white"
                        />

                        <div className="shrink-0 text-sm font-medium dark:text-gray-300">to</div>

                        <input
                            type="number"
                            id="max-price-input"
                            min="0"
                            max="2000"
                            step="10"
                            value={maxPricePreview}
                            onChange={handleMaxInputChange}
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
