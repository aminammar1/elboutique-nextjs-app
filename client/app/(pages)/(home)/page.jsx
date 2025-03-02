import * as React from 'react'
import HomeSlider from '@/components/modules/home/HomeSlider'
import PaymentCard from '@/components/modules/home/PaymentCard'
import Categories from '@/components/modules/home/CategorieSliders'
import Container from '@/components/custom/Container'
import Row from '@/components/custom/Row'

export default function Home() {
  return (
    <>
      <HomeSlider />
      <PaymentCard />
      <Categories />
      <Container>
      <Row className="mb-10">
        </Row>
      </Container>
    </>
  )
}
