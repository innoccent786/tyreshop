import React, { useContext, useEffect, useState } from 'react'
import Context from '../context/authenticate';
import {postData} from '../callApi/backend_api'
import cities from '../local/cities.json'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { parsePhoneNumber } from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import countries from '../local/countries.json'
import cities_name from '../local/cities.json'
 import { Country, State, City }  from 'country-state-city';
import { Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 
const Checkout = () => {

    const [value, setValue] = useState(null)
    const [isValid,setIsValid]=useState(null)
   let total=0;
const navigate=useNavigate()
    const [formData,setFormData]=useState({
        city:null,
        postal_code:null,
        address:null,
        country:null,
        state:null,
        first_name:null,
        last_name:null,
        payment_method:'Cash',
        email:null,
        total:0,
    });
    const {products,setProducts,status,wait}=useContext(Context)

    
//handlers
const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.name]:e.target.value
    })
}  
const handleProductChange=(e,index)=>{
let product=products;

product[index].quantity=e.target.value
setProducts([...product])
}
 
//use effect
useEffect(()=>{
    
    if(value){
        setIsValid(false)
        
        if(value.length>0){
            
        if(isValidPhoneNumber(value))
        {
            setIsValid(true)
            
            let countryName=parsePhoneNumber(value);
           if(countryName){
                let country=Country.getCountryByCode(countryName.country)
                if(country){
                    let state=State.getStatesOfCountry(countryName.country)
                    let city=City.getCitiesOfState(countryName.country,state[0].isoCode)
                    setFormData({...formData,country:country.name,state:state[0].isoCode,city:city[0].name})
             }
            }
        }
    }
    }
},[value])

//api calls
const handleSubmit=()=>{
    const formdata=new FormData();
    let flag=true;
    for (const [key, value] of Object.entries(formData)) {
        if(key=='email'){
            if(value==null){
                flag=false
               }
               else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)))
               {
                status({type:'error',message:'Invalid Email'})
                return;
               }   
        }
        else{
       if(value==null){
        flag=false
       }
       else if(value.length<=0){
        flag=false
       }
    }
    }
    if(!flag||!isValid||products.length<=0){
        status({type:'error',message:'May be a field is empty or cart is empty'})
    }
    else{
    let productss=products.map(p=>{
        return {id:p._id,quantity:p.quantity}
    })
    wait(true)
    formdata.append('data',JSON.stringify({...formData,total:total,products:productss,name:formData.first_name+' '+formData.last_name,phone:value}))
    postData('/orders/save',formdata).then(res=>{
        if(res.data.status==200){
            status({type:'success',message:'Order Placed!'})
            setProducts([])
            navigate('/')
        }
        else{
            status({type:'error',message:res.data.message})
        }
        wait(false)
    })
}
}

return (
    <div>
        <div className="checkout_container">
            <div className="row m-0">
                <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                    <div className="checkout_container_content">
                         <div className="checkout-header">
                        <h1>Checkout</h1>
                    </div>
                    <div className="checkout_center_div">
                        <div className="row m-0">
                            <div className="col-md-6 col-lg-6 col-sm-12 ">
                                <div className="checkout_center_div_left">
                                    <div className="checkout_center_div_left_header">
                                        <h5 className='mb-4' >Address</h5>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname" >First Name</label>
                                                    <input type="text" id="fname" name="first_name" onChange={handleChange} value={formData.first_name} placeholder="First Name" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">Last Name</label>
                                                    <input type="text" id="fname" name="last_name" onChange={handleChange} value={formData.last_name} placeholder="Last Name" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">Email Address</label>
                                                    <input type="text" id="fname" name="email" onChange={handleChange} value={formData.email} placeholder="Email Address" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">Phone</label>
                                                    <PhoneInput
                                                        placeholder="Enter phone number"
                                                        defaultCountry="US"
                                                        value={value}
                                                        onChange={setValue}

                                                    />{isValid==false?
                                                    <small style={{color:'red'}}>Enter a valid phone number</small>:null} 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">Street Address </label>
                                                    <input type="text" id="fname" name="address" value={formData.address} onChange={handleChange} placeholder="Street Address" />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">State/Province</label>
                                                    <select name="state" onChange={handleChange} className='form-control' id="city">
                                                        {
                                                           isValid&&value?value.length>0&&isValidPhoneNumber(value) ? State.getStatesOfCountry(parsePhoneNumber(value).country).map((state,index) => {
                                                                return (
                                                                    <option key={index} value={state.isoCode}>{state.name}</option>
                                                                )
                                                            }): null:null
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                 <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">Country </label>
                                                    <select name="country" className='form-control' id="country" disabled value={formData.country} onChange={handleChange}>
                                                        {
                                                            Country.getAllCountries().map((country,val,index) => {
                                                                return (
                                                                    <option key={val} value={country.name}>{country.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                
                                            </div>
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                                <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">City</label>
                                                    <select name="city" value={formData.city} onChange={handleChange} className='form-control' id="city">
                                                        {
                                                          isValid&&value?value.length>0&&isValidPhoneNumber(value) ? City.getCitiesOfState(parsePhoneNumber(value).country,formData.state).map((city, index) => {
                                                                return (
                                                                    <option key={index} value={city.name}>{city.name}</option>
                                                                )
                                                            }): null:null
                                                        }
                                                    </select>
                                                </div>
                                                
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-lg-6 col-sm-12">
                                               <div className="checkout_center_div_header_input">
                                                    <label htmlFor="fname">Zip/Postal Code</label>
                                                    <input type="number" value={formData.postal_code} onChange={handleChange}  id="fname" name="postal_code" placeholder="Zip/Postal Code" />
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>
                            </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-sm-12 ">
                                <div className="checkout_center_div_left">
                                    <div className="checkout_center_div_left_header">
                                        <h5 className='mb-4'>Payment Methods</h5>
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 col-sm-12">
                                                
                                                <div className="checkout_center_div_header_input_radio">
                                                    
                                                    <input type="radio" checked id="fname" name="firstname" placeholder="First Name" />
                                                    <label htmlFor="fname">Cash On Delivery</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                            </div>
                            </div>
                    </div>
                    </div>
                    <div className="checkout_order_summary">
                        <div className="checkout_order_summary_header">
                            <h5>Order Summary</h5>
                        </div>
                        <div className="checkout_order_summary_body">
                            <div className="row" >
                                <div className="col-md-6 col-lg-6 col-sm-12" style={{borderRight: '1px solid rgb(230, 230, 230)'}}>
                                   {products.map((p,i=0)=>{
                                    total+=(parseFloat(p.price)-(parseFloat(p.price)*(parseFloat(p.discount)/100)))*p.quantity
                                   return (
                                    <>
                                   <div className="row" style={{padding:'22px 0px'}}>
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <div className="checkout_order_summary_body_img">
                                                <img src={'/'+p.image} alt="" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <div className="checkout_order_summary_body_img ">
                                                <p>{p.description}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-12">
                                            <div style={{width:'30% !important'}} className="checkout_order_summary_body_img checkout_order_summary_body_quantity d-flex flex-column pb-4">
                                                <h1>{p.discount>0?<span style={{textDecoration:'line-through'}}>£{p.price}</span>:null} £{parseFloat(p.price)-(parseFloat(p.price)*(parseFloat(p.discount)/100))}  </h1>
                                                <div className='d-flex justify-content-center align-items-center'>
                                                    <p>Qty</p>
                                                    <input style={{width:'30%'}} type="number" name={p._id}  id="" value={p.quantity} onChange={(e)=>handleProductChange(e,i)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {i+1<products.length?<Divider/>:null}
                                    </>
                                ) 
                                })
                                 
                                }
                                </div>
                                <div className="col-md-6 col-lg-6 col-sm-12 align-self-end">
                                    <div className="row">
                                        <div className="col-md-6 col-lg-6 col-sm-12 pt-3"
                                            style={{ borderLeft: '1px solid #e6e6e6' }}>
                                           <div className='d-flex justify-content-between'>
                                             <div className="checkout_order_summary_body_img align-items-end justify-content-start">
                                                <p>Delivery Fee</p>
                                            </div>
                                            <div className='d-flex flex-column justify-content-between'>
                                                <h5> £{39}</h5>
                                                <h5 className='mb-3'> £{total}</h5>
                                            </div>
                                           </div>
                                        </div>
                                        <div className="col-md-6 col-lg-6 col-sm-12 pt-3"
                                            style={{ borderLeft: '1px solid #e6e6e6' }}>
                                           <div className='d-flex justify-content-between'>
                                             <div className="checkout_order_summary_body_img align-items-end justify-content-start">
                                                <p>Total to Pay</p>
                                            </div>
                                            <div className='d-flex flex-column justify-content-between'>
                                                <h5></h5>
                                                <h5 className='mb-3'> £{total+39}</h5>
                                            </div>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary d-flex justify-content-center mt-4 pt-2 pb-2' style={{width:'12%!important',float:'right'}} onClick={handleSubmit}>Place order</button>
                </div>
                   
                </div>
        </div>
        </div>
    </div>
  )
}

export default Checkout