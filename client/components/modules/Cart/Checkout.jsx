        import React from 'react'
        import CurrencyFormat from '@/components/custom/FormatCurrency'
        import { Button } from '@/components/custom/Button'
        import { useRouter } from 'next/navigation'

        export default function Checkout({
        subtotal,
        shippingFee,
        tax,
        total,
        loading,
        className,
        }) {
        const router = useRouter()


        return (
            <div
                className={`flex flex-col gap-6 min-w-[360px] p-6 h-full rounded-xl bg-white text-zinc-100 shadow-lg ${className}`}
                >
                {/* Totals Section */}
                <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-zinc-950">
                    <span>Subtotal</span>
                    <span>
                        <CurrencyFormat className="text-right" value={subtotal} />
                    </span>
                    </div>

                    <div className="flex justify-between text-zinc-950">
                    <span>Tax</span>
                    <span>
                        <CurrencyFormat className="text-right" value={tax || 0} />
                    </span>
                    </div>

                    <div className="flex justify-between text-zinc-950">
                    <span>Shipping</span>
                    <span>
                        <CurrencyFormat className="text-right" value={shippingFee || 0} />
                    </span>
                    </div>

                    <div className="h-px bg-zinc-700 my-2" />

                    <div className="flex justify-between text-base font-semibold text-zinc-950">
                    <span>Grand Total</span>
                    <span>
                        <CurrencyFormat className="text-right" value={total} />
                    </span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 mt-4">
                    <Button
                    size="lg"
                    onClick={() => router.push("/checkout")}
                    disabled={loading}
                    className="w-full bg-black text-white hover:bg-zinc-800 transition"
                    >
                    Continue to checkout
                    </Button>

                    <Button
                    variant="ghost"
                    disabled={loading}
                    className="w-full bg-white text-black hover:bg-zinc-100 transition"
                    onClick={() => router.push("/products")}
                    >
                    Continue to shop
                    </Button>
                </div>
                </div>
        )
        }