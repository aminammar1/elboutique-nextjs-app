import { Button } from '@/components/custom/Button'
import { Minus, Plus } from 'lucide-react'
import React from 'react'

export default function ProductQty({ updateQty, qty }) {
    return (
    <div className="flex justify-between gap-4 border border-border rounded-lg items-center p-2">
        <Button
        data-cy="decreaseBtn"
        onClick={() => updateQty('dec')}
        variant="outline"
        size="lg"
        className=""
        >
        <Minus />
        </Button>
        <strong className="text-xl w-10 text-center">{qty}</strong>
        <Button
        onClick={() => updateQty('inc')}
        variant="outline"
        size="lg"
        className=""
        //data-cy="increaseBtn"
        >
        <Plus />
        </Button>
    </div>
    )
}
