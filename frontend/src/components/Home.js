import React, { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import Pagination  from "react-js-pagination"
import MetaData from './layout/MetaData'
import { getAllProducts } from '../redux/actions/productAction'
import Product from './product/Product'
import Loader from './layout/Loader'
const Home = () => {
  
  const [currentPage, setCurrentPage] = useState(1)
  
  const dispatch = useDispatch()
  const { error, productsCount, loading, products ,resPerPage} = useSelector(state => state.products)
  console.log(error)
  useEffect(() => {
    dispatch(getAllProducts(currentPage))

    if (error) {
   return toast.error(error);
    }
  }, [dispatch,error, currentPage])
  

  const setCurrentPageNum = (pageNum) => {
    setCurrentPage(pageNum)
  }
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
          {
            resPerPage <= productsCount && (
              <div className='d-flex justify-content-center mt-5'>
              <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNum}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
                  itemClass="page-item"
                  linkClass="page-link"/>
            </div>
            )
           }
        
    </>
      )}
    </>

  )
}

export default Home 