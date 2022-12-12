
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';
import ProductDetail from "./components/product/ProductDetail";
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Router>


    <div className="App">

        <Header />
        <Routes>
 
       
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductDetail />} />
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
