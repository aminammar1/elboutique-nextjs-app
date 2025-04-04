import { cn } from '@/lib/utils';
import React, { useState } from 'react';

export default function ProductStyles({ product, setStyle, setActive }) {
  const colorMap = {
    black: '#000000',
    blue: '#4834d4',
    orange: '#e67e22',
    red: '#FF4136',
    yellow: '#f1c40f',
    green: '#a3cb38',
    gold: '#eabf41',
  };

  const sizeList = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const styleList = product.stylesColors.split(',').map((color) => {
    const colorName = color.trim().toLowerCase()
    return {
      name: colorName,
      color: colorMap[colorName] || colorName,
    };
  });

  const [selectedColor, setSelectedColor] = useState(styleList[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(sizeList[0] || '');

  const handleColorSelect = (item) => {
    setSelectedColor(item.name);
    setStyle?.(item);
    setActive?.(styleList.findIndex((c) => c.name === item.name));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size)
  }

  return (
    <div className="my-4 flex flex-col gap-4">
      {/* Colors */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-black">Color</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {styleList.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleColorSelect(item)}
              className={cn(
                'w-8 h-8 rounded-md transition-all duration-200',
                selectedColor === item.name ? 'ring-2 ring-offset-2 ring-gray-700' : 'hover:scale-110'
              )}
              style={{ backgroundColor: item.color }}
              aria-label={item.name}
            />
          ))}
        </div>
      </div>
      {/* Sizes */}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-700">Size</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {sizeList.map((size, idx) => (
            <button
              key={idx}
              onClick={() => handleSizeSelect(size)}
              className={cn(
                'px-4 py-2 border rounded-md text-sm font-medium transition-all duration-200',
                selectedSize === size ? 'bg-black text-white' : 'hover:bg-black hover:text-white'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}