import * as React from 'react'
import HomeSlider from '@/components/modules/home/HomeSlider'
import PaymentCard from '@/components/modules/home/PaymentCard'
import Categories from '@/components/modules/home/CategorieSliders'
import BestSale from '@/components/modules/home/BestSale'
import BannerSale from '@/components/modules/home/BannerSale'
import DealOfMouth from '@/components/modules/home/DealOfMouth'
import SocialMedia from '@/components/modules/home/SocialMedia'


export default function Home() {
  return (
    <>
      <HomeSlider />
      <PaymentCard />
      <Categories />
      <BestSale />
      <BannerSale />
      <DealOfMouth />
      <SocialMedia />
    </>
  )
}
