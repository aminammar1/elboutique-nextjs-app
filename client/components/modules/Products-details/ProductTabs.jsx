import { Card, CardContent } from '@/components/custom/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/custom/tabs'
import React from 'react'
import Review from '@/components/review/main'

export default function ProductTabs({ product, className }) {
  return (
    <Tabs defaultValue="descriptions" className={`${className}`}>
      <TabsList className="grid grid-cols-3 w-fit overflow-auto">
        <TabsTrigger className="w-fit lg:w-80" value="descriptions">
          Descriptions
        </TabsTrigger>
        <TabsTrigger className="w-fit lg:w-80" value="additionnal">
          Additional Info
        </TabsTrigger>
        <TabsTrigger className="w-fit lg:w-80" value="reviews">
          Reviews
        </TabsTrigger>
      </TabsList>
      <TabsContent value="descriptions">
        <Card>
          <CardContent className="p-4">
            <p className="text-pretty">{product.productDescription}</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="additionnal">
        <Card className="p-10 flex flex-col gap-4">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <span className="w-80 font-bold text-xl capitalize">Colors:</span>
            <span className="text-base font-light text-black">
              {product.stylesColors}
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <span className="w-80 font-bold text-xl capitalize">
              Additional Info:
            </span>
            <span className="text-base font-light text-black">
              {product.additionalInfo}
            </span>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="reviews">
        <Card>
          <CardContent className="p-8">
            <Review product={product} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
