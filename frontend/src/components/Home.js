import React, { useEffect } from 'react'
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './layout/MetaData'
import { getAllProducts } from '../redux/actions/productAction'
import Product from './product/Product'
import Loader from './layout/Loader'
const Home = () => {
  

  const dispatch = useDispatch()
  const { error, productsCount, loading, products } = useSelector(state => state.products)
  console.log(error)
  useEffect(() => {
    dispatch(getAllProducts())

    if (error) {
   return toast.error(error);
    }
  },[dispatch])
  return ( 
    <>
      {loading ? <Loader/>: (
      
      <>
          <MetaData title="Buy best products from  ShiShop online"/>
          <h1 id="products_heading">Latest Products</h1>

         
    <section id="products" className="container mt-5">
        <div className="row">
          {
            products && products.map((product, index) => {
              return (
                <Product key={product._id} product={product} loading={loading} />
              )
            })
          }
    
     
      </div>
    </section> 
    </>
      )}
    </>

  )
}

export default Home 