import Container from '@/components/custom/Container'
import Logo from '@/components/custom/Logo'
import Row from '@/components/custom/Row'
import React, { useState } from 'react'
import MainMenu from './MainMenu'
import IconsGroups from './IconsGroups'

export default function Main() {
  //const [openSearchBar, setOpenSearchBar] = useState(false)
  //const [openCartBar, setOpenCartBar] = useState(false)

  return (
  <section className="h-full">
    <Container>
      <Row className="justify-between">
        <Logo />
        <MainMenu />
        <IconsGroups
            //openSearchBar={openSearchBar}
            //openCartBar={openCartBar}
            //setOpenSearchBar={setOpenSearchBar}
           // setOpenCartBar={setOpenCartBar}
          />
        
      </Row>
    </Container>
    {/* <SearchBar open={openSearchBar} setOpen={setOpenSearchBar} />
    <CartBar open={openCartBar} setOpen={setOpenCartBar} /> */}
  </section>
  )
}
