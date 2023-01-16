import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import  {toast}  from "react-toastify"
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import Sidebar from './Sidebar'
import MetaData from '../layout/MetaData'
import {clearErrors, getAllAdminProducts, deleteProduct} from  "../../redux/actions/productAction"
import {DELETE_PRODUCT_RESET} from "../../redux/constants/productConstants"
const ProductList = () => {

  ;
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector(state => state.products);
    const { error: deleteError, isDeleted } = useSelector(state => state.productAction)
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getAllAdminProducts());

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            toast.success('Product deleted successfully');
            navigate('/admin/products');
            dispatch({ type: DELETE_PRODUCT_RESET })
        }

    }, [dispatch,  error, deleteError, isDeleted, navigate])

     const setProducts = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Stock',
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,
                actions: <>
                    <Link to={`/admin/product/${product._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })

        return data;
    }

    
    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }
  return (
    <>
    <MetaData title={'All Products'} />
    <div className="row">
        <div className="col-12 col-md-2">
            <Sidebar />
        </div>

        <div className="col-12 col-md-10">
            <>
                <h1 className="my-5">All Products</h1>

                {loading ? <Loader /> : (
                    <MDBDataTable
                        data={setProducts()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                )}

            </>
        </div>
    </div>

</>
  )
}

export default ProductList