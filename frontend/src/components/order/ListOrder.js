import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {toast} from "react-toastify"
import { MDBDataTable } from "mdbreact"
import Loader from '../layout/Loader'
import MetaData from '../layout/MetaData'
import { getMyOrders, clearErrors } from '../../redux/actions/orderActions'



const ListOrder = () => {

    const { loading, error, orders } = useSelector(state => state.myOrders)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyOrders())   
        if (error) {
            toast.error(error)(
            dispatch(clearErrors))
        }
    }, [dispatch, error, toast])
    
    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
            
        }
        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }

  return (
      <>
          <MetaData title={"My Orders"} />
          <h1 className='mt-5'> My Orders </h1>
          {
              loading ? <Loader /> : (
                  <MDBDataTable
                      data={ setOrders()}
                      className="px-3"
                      bordered
                      striped
                      hover
                  />
                      
                
              )
    }

      </>
  )
}

export default ListOrder