import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/layoutscomp/Footer'


const MainLayouts = () => {
  return (
    <>
        <Outlet />
        <Footer />
    </>
  )
}
export default MainLayouts