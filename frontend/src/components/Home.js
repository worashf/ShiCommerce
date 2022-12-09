import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './layout/MetaData'
import { getAllProducts } from '../redux/actions/productAction'
import Product from './product/Product'
import Loader from './layout/Loader'
const Home = () => {
  

  const dispatch = useDispatch()
  const {error, productsCount, loading,products} = useSelector(state => state.products)
  useEffect(() => {
    dispatch(getAllProducts())
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