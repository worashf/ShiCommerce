import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
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
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import store from "./redux/store";
import { loadUser } from "./redux/actions/userAction";

function App() {



  useEffect(() => {
    store.dispatch(loadUser())
  },[])
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
              <Route path="/password/update" element={<UpdatePassword/>}/>
            </Route>
            <Route path="/cart" element={<Cart />} />
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
