import React from 'react'
import { Route ,Routes } from 'react-router'

import Home from './src/Home'
import Productdata from './src/Productdata'
import Addproduct from './src/Addproduct'
import ProductDescription from './src/ProductDescription'

const Allroutes = () => {
  return (
    <div>
      <Routes>
      <Route path='/' element   ={<Home/>}></Route>
      <Route path='/' element   ={<Productdata/>}></Route>
      <Route path='/' element   ={<Addproduct/>}></Route>
      <Route path='/' element   ={<ProductDescription/>}></Route>

      
    
      </Routes>
    </div>
  )
}

export default Allroutes
