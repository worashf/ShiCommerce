import { useEffect ,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer} from 'react-toastify';
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {

  Elements,
} from '@stripe/react-stripe-js';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ProductDetail from "./components/product/ProductDetail";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import Payment from "./components/cart/Payment";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrder from "./components/order/ListOrder";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductList from "./components/admin/ProductList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrderList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import ReviewList from "./components/admin/ReviewList";


function App() {

  const [stripeApiKey,setStripeApiKey] = useState("")
 console.log(stripeApiKey, "strip")
  useEffect(() => {
    store.dispatch(loadUser())
    async function getStripeApiKey() {
      const { data } = await axios.get(`/api/v1/stripe-api-key`)
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()

  }, [])

  return (
    <>
    <Router>


    <div className="App">

        <Header />
        <Routes>
 
       
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword/>}/>
            <Route element={<ProtectedRoute />}>
              
            <Route path="/me" element={<Profile/>} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/confirm" element={<ConfirmOrder />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path = "/payment" element={ stripeApiKey && 
                <Elements stripe={loadStripe(stripeApiKey)}> <Payment /> </Elements>} />
              
              <Route path="/orders/me" element={<ListOrder />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/admin/orders" element={<OrdersList/>}/>
              <Route path="/admin/order/:orderId" element={<ProcessOrder/>}/>
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/user/:userId" element={<UpdateUser/>}/>

            <Route path = "/payment" element={ stripeApiKey && 
          <Elements stripe={loadStripe(stripeApiKey)}> <Payment/> </Elements>} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/dashboard" isAdmin={true} element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="admin/product/:productId" element={<UpdateProduct />} />
              <Route path="/admin/reviews" element={<ReviewList/>}/>
            </Route>

            
          </Routes>
      <Footer/>
      </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </>
  );
}

export default App;
