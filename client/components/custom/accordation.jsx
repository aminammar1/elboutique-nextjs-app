'use client'

import React, { useEffect } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Checkbox } from './checkbox'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b border-gray-300', className)}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef(
  (
    {
      className,
      children,
      categoryId,
      checkedCategory,
      setCheckedCategory,
      router,
      ...props
    },
    ref
  ) => {
    const isChecked = checkedCategory === categoryId

    const handleCheckedChange = (checked) => {
      const newValue = checked ? categoryId : null
      setCheckedCategory(newValue)

      const params = new URLSearchParams(window.location.search)

      if (checked) {
        params.set('category', categoryId)
      } else {
        params.delete('category')
      }

      router.push(`/categories/${categoryId}/products?${params.toString()}`, { scroll: false })
    }

    return (
      <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex flex-1 items-center gap-4 py-4 font-medium hover:underline transition-all',
            '[&[data-state=open]>.plus]:hidden [&[data-state=closed]>.minus]:hidden',
            className
          )}
          {...props}
        >
          <Checkbox
            className="h-6 w-6"
            checked={isChecked}
            onCheckedChange={handleCheckedChange}
          />
          {children}
          <Plus className="ms-auto h-6 w-6 plus shrink-0 transition-all duration-200" />
          <Minus className="ms-auto h-6 w-6 minus shrink-0 transition-all duration-200" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
    )
  }
)

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn('pb-4 pt-0', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
)

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
