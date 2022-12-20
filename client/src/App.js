import './App.css';
import React,{useReducer,useState,useEffect} from 'react';
import { Routes , Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import About from './components/About';
import Contact from './components/Contact';
import Listing from './components/Listing';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import {reducer,initialState} from './context/Reducer'
import { SuccessMessage,ErrorMessage,Wait } from './components/Message';
import Context from './context/authenticate';
import ProductDetails from './components/ProductDetails';
import Dashboard from './components/Dashboard/Dashboard';
import { getData } from './callApi/backend_api';
import Login from './components/Dashboard/Login';
function App() {
  const [messages,dispatch]=useReducer(reducer,initialState)
  const [openWait,setOpenWait]=useState(false);
  const [products,setProducts]=useState([]);
  const [isLoggedIn,setIsLoggedIn]=useState(null);
  const navigate=useNavigate();
  useEffect(()=>{
    getData('/auth/isLoggedIn').then((res)=>{
   
      if(res){
        if(res.data.loggedIn){
          setIsLoggedIn(true)
        }
        else{
          setIsLoggedIn(false);
        }
      }
      
    }).catch(err=>{

      setIsLoggedIn(false);
    })
  },[])
  return (
    <div>
      <Context.Provider value={{status:dispatch,wait:setOpenWait,products,setProducts}}>
      <Wait open={openWait}/>
      <SuccessMessage open={messages.success} message={messages.message}/>
      <ErrorMessage open={messages.error} message={messages.message}/>       
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/listing/:width/:height/:diameter/:type" element={<Listing />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/details" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard loggedIn={isLoggedIn}/>} />
        
        <Route path="/login" element={<Login loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn}/>} />
        
      </Routes>   
      </Context.Provider>
    </div>
  );
}

export default App;
