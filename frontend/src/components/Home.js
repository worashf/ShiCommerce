import React, { useEffect, useState } from 'react'
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import Pagination from "react-js-pagination"
import { useParams } from 'react-router-dom';

import MetaData from './layout/MetaData'
import { getAllProducts } from '../redux/actions/productAction'
import Product from './product/Product'
import Loader from './layout/Loader'



const prices = [10, 50, 100, 500, 3000]
const categories =[    'Electronics',
'Cameras',
'Laptops',
'Accessories',
'Headphones',
'Food',
"Books",
'Clothes/Shoes',
'Beauty/Health',
'Sports',
'Outdoor',
'Home']
const Home = () => {
   const[price, setPrice] = useState(1000)
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState("")
  const[rating,setRating] = useState(0)
  
  const {keyword} = useParams()
  const dispatch = useDispatch()
  const { error, productsCount, loading, products ,resPerPage} = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getAllProducts(keyword,currentPage,price,category, rating))

    if (error) {
   return toast.error(error);
    }
  }, [dispatch,error,keyword, currentPage, price,category, rating])
  

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
                keyword ? (<>
                   <div className='col-6 col-md-3 mt-5 mb-5'>
                <div className='px-2'>
                  <h3> Filter by Price</h3>
                  <ul>
                    {
                      prices.map(pr => {
                    return   ( <li key={pr} style={{
                      "cursor": "pointer",
                      "color":"#0965d6",
                          "listStyle":"none"
                        }}
                      onClick={() => setPrice(pr)}>{ `Less than $${pr}`}</li>)
    })
                    }
      
                      </ul>
                      <hr className='my-3' />

                      <div className='mt-'>
                        <h3> Filter by Category</h3>
                        <ul>
                          {
                            categories.map((category ,index)=> (
                              <li key={index} style={{
                                "cursor": "pointer",
                                "color":"#0965d6",
                                    "listStyle":"none"
                                  }} onClick={() => setCategory(category)}>{category}</li>
                            ))
                          }
                        </ul>

                      </div>

                      <hr className='my-3' />

<div className='mt-'>
  <h3> Ratings</h3>
  <ul>
    {
 [5,4,3,2,1].map((rating ,index)=> (
        <li key={index} style={{
          "cursor": "pointer",
          "color":"#0965d6",
              "listStyle":"none"
   }} onClick={() => setRating(rating)}>
     <div className='rating-outer'>
       <div className='rating-inner' style={{width:`${rating*20}%`}}>
         
       </div>
       
     </div>
            </li>
      ))
    }
  </ul>

</div>
                    </div>
              </div>
              <div className='col-6 col-md-9'>
                <div className='row'>
                {
                  products && products.map((product, index) =>  (
                    <Product key={product._id} product={product} loading={loading} />
                  ) )      
    }
   
                 </div>
              </div>
                </>) : (
                              
                                products && products.map((product, index) =>  (
                                  <Product key={product._id} product={product} loading={loading} />
                                ) )      
                  
                )
              }
             
          
                  
                  
   
      </div>
          </section> 
          {
           products.length > 0 && resPerPage <= productsCount && (
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