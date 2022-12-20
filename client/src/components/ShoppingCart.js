import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/authenticate'
import Footer from './Footer'

const ShoppingCart = () => {
    const {products,setProducts}=useContext(Context)
    const Navigate = useNavigate();
let total=0;
    const handleCheckout = () => {
        Navigate('/checkout')
    }
    const handleProductChange=(index,val)=>{
    let product=products;
    
    product[index].quantity=val
    setProducts([...product])
}
const removeProduct=(index)=>{
    let product=products;
    product.splice(index,1)
    setProducts([...product])
}
const TableData=products?products.map((item,index)=>{
    total+=(parseFloat(item.price)-(parseFloat(item.price)*(parseFloat(item.discount)/100)))*item.quantity
    return(         
        <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                                <div className="shopping-cart-body-content">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 col-sm-2 d-flex align-items-center justify-content-center">
                                            <div className="shopping-cart-body-content-img">
                                                <img src={"/"+item.image} alt="product" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-2 d-flex ">
                                            <div className="shopping-cart-body-content-description">
                                                <h5>{item.discount>0?<span style={{textDecoration:'line-through'}}>£{item.price}</span>:null} £{parseFloat(item.price)-(parseFloat(item.price)*(parseFloat(item.discount)/100))} </h5>
                                                <p>{item.tyre_name}</p>
                                                <div className="remove_div d-flex align-items-center btn" onClick={()=>removeProduct(index)}>
                                                    
                                                    <img src="./assets/cancel.svg" alt="remove" />
                                                    <p>Remove</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-sm-12 d-flex ">
                                            <div className="shopping-cart-body-content-cart-count">
                                                
                                                <div className="cart_items_div">
                                                   <button className='btn' disabled={item.quantity==1?true:false} onClick={()=>handleProductChange(index,item.quantity-1)}>
                                                    <img src="./assets/minus.svg" alt="minus" /></button>
                                                    <p className='pt-2'>{item.quantity}</p>
                                                    <button className='btn' onClick={()=>handleProductChange(index,item.quantity+1)}><img src="./assets/plus.svg" alt="plus" /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-sm-12 d-flex ">
                                            <div className="shopping-cart-body-content-cart-count">
                                                
                                                <div className="cart_items_div">
                                                    <h5> £{ (parseFloat(item.price)-(parseFloat(item.price)*(parseFloat(item.discount)/100)))*item.quantity} </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
        )
    }):null 
  return (
    <div>
        <div className="shopping_cart_container">
            <div className="row m-0">
                <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                    <div className="shopping-cart-header">
                        <h1>Shopping Cart</h1>
                    </div>
                    <div className="shopping-cart-body">
                        <div className="row m-0">
                            <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                                <div className="shopping-cart-body-header">
                                    <div className="row">
                                        <div className="col-md-4 col-lg-4 col-sm-2">
                                            <h5>Product</h5>
                                        </div>
                                        <div className="col-md-4 col-lg-4 col-sm-2">
                                            <h5>Unit Price</h5>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-sm-2">
                                            <h5>Quantity</h5>
                                        </div>
                                        <div className="col-md-2 col-lg-2 col-sm-2 text-center">
                                            <h5>Total</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           {TableData}                                              
                            <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                                <div className="shopping-cart-body-content mb-4"
                                    style={{
                                        borderBottom: '1px solid #e5e5e5',
                                    }}
                                
                                >
                                    <div className="row">
                                        <div className="col-md-7 col-lg-7 col-sm-12 d-flex align-items-center justify-content-between"
                                        >
                                            <div className="shopping-cart-body-content-shipping">
                                                <img src="./assets/truck.svg" alt="product" />
                                                <p>
                                                    Home Delivery £39
                                                </p>
                                            </div>
                                            <div className="shopping-cart-body-content-shipping justify-content-end pr-5">
                                                <h5>£{total+39}</h5>
                                            </div>
                                        </div>
                                        <div className="col-md-5 col-lg-5 col-sm-12 d-flex "
                                            style={{
                                                borderLeft: '1px solid #e5e5e5',
                                            }}
                                        >
                                            <div className="shopping-cart-body-content-shipping">

                                                <p>
                                                    Subtotal ({products.length} items)
                                                </p>
                                            </div>
                                            <div className="shopping-cart-body-content-shipping justify-content-end pr-5 flex-column">
                                                <h5>£{total}</h5>
                                                <p className='p-0 m-0'>(Excluding delivery)</p>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>   

                           <div className="col-md-12 col-lg-12 col-sm-12 p-0 mb-4">
                             <div className="shopping-cart-body-content"
                                    style={{
                                        borderBottom: 'none',
                                    }}
                             >
                                <div className="row">
                                    <div className="col-md-12 col-lg-12 col-sm-12 d-flex align-items-center justify-content-between px-5">
                                        <div className="shopping-cart-shipping-button">
                                            <button className="btn btn-transparent border border-1" onClick={()=>{window.history.back()}}>Back to Shopping</button>
                                        </div>
                                        <div className="shopping-cart-shipping-button">
                                            <button className="btn btn-primary p-2"
                                                onClick={handleCheckout}
                                            >Go to Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>                 

                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
    </div>
  )
}

export default ShoppingCart