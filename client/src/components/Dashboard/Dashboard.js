import React, { useContext,useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getData } from '../../callApi/backend_api'
import Context from '../../context/authenticate'
import AccountSetting from './AccountSetting'
import Enquiries from './Enquiries'
import Orders from './Orders'
import Products from './Products'

const Dashboard = (props) => {

    const {loggedIn,setLoggedIn}=props
    const [show, setShow] = React.useState({
        dashboard: true,
        products: false,
        enquiries: false,
        orders: false,
        account: false,
    })

const navigate=useNavigate()
    const handleShow = (val) => {
    

        if (val === 'dashboard') {
            setShow({
                dashboard: true,
                products: false,
                enquiries: false,
                orders: false,
            })
        }
        if (val === 'products') {
            setShow({
                dashboard: false,
                products: true,
                enquiries: false,
                orders: false,
            })
        }
        if (val=== 'enquiries') {
            setShow({
                dashboard: false,
                products: false,
                enquiries: true,
                orders: false,
            })
        }
        if (val=== 'orders') {
            setShow({
                dashboard: false,
                products: false,
                enquiries: false,
                orders: true,
            })
        }
        if (val=== 'account') {
            setShow({
                dashboard: false,
                products: false,
                enquiries: false,
                orders: false,
                account: true,
            })
        }
        

    }

    const {status}=useContext(Context)
const [success,setSuccess]=useState(false);
const [tableData,setTableData]=useState(null)
useEffect(()=>{
  getData('/orders/view').then(res=>{
    if(res.data.status==200){
      setTableData(res.data.data)
    }
  })
  
},[show])
const [total,setTotal]=useState({
    total:0,
    pending:0,
    delivered:0
})
useEffect (()=>{
    if(!loggedIn){
        navigate('/login')
    }
},[loggedIn])
useEffect(()=>{
    if(tableData){
        let p=0;
        let t=0;
        let d=0;
tableData.map(element => {
    if(element.status==='pending'){
    
    p+=1
    }
    else{
        t+=parseFloat(element.total)
        d+=1
    }
  
})
setTotal({
    total:t,
    pending:p,
    delivered:d
})
}
},[tableData]);

  return (
    <div>
        <div className="dashboard_container">
            <div className="row m-0 p-0">
                <div className="col-md-3 col-lg-3 col-sm-12 p-0">
                    <div className="dashboard_sidebar">
                        <div className="dashboard_sidebar_header pb-3">
                            <img src="./assets/logo.png" alt="avatar" 
                                style={{
                                    width: '100%',
                                    height: '60px',
                                }}
                            
                            />
                        </div>
                        <div className="dashboard_sidebar_body">
                            <ul>
                                <li onClick={
                                    (e) => handleShow('dashboard')
                                } id="dashboard" 
                                ><Link><h1>Dashboard</h1></Link></li>
                                <li 
                                    onClick={
                                        (e) => handleShow('products')
                                    } id="products"
                                ><Link> <h1>Products</h1> </Link> </li>
                                <li 
                                    onClick={
                                        (e) => handleShow('enquiries')
                                    } id="enquiries"

                                ><Link> <h1>Enquiries</h1> </Link></li>
                                <li
                                    onClick={
                                        (e) => handleShow('orders')
                                    } id="orders"

                                ><Link> <h1>Orders</h1> </Link></li>
                                <li
                                    onClick={
                                        (e) => handleShow('account')
                                    } id="orders"

                                ><Link> <h1>Account Settings</h1> </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-lg-9 col-sm-12">
                        <div className="dashboard_main">
                            
                            <div className="dashboard_main_body">
                                {
                                    show.dashboard ? <>
                                    <h4 
                                style={{
                                    color: '#000',
                                    fontSize: '30px',
                                    fontWeight: 'bold',
                                    padding: '15px 0px'
                                }}
                            >Dashboard</h4>
                                        <div className="row m-0 p-0">
                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                        <div className="dashboard_main_body_card">
                                            <div className="dashboard_main_body_card_header">
                                                <h1>Total Revenue</h1>
                                                <h2>{total.total}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                        <div className="dashboard_main_body_card">
                                            <div className="dashboard_main_body_card_header">
                                                <h1>Orders Pending</h1>
                                                <h2>{total.pending}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-lg-4 col-sm-12">
                                        <div className="dashboard_main_body_card">
                                            <div className="dashboard_main_body_card_header">
                                                <h1>Orders Delivered</h1>
                                                <h2>{total.delivered}</h2>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    </>:null
                                }
                                {
                                    show.products ? <>
                                        <Products />
                                    </>:null
                                }
                                {
                                    show.enquiries ? <>
                                        <Enquiries />
                                    </>:null
                                }
                                {
                                    show.orders ? <>
                                        <Orders />
                                    </>:null
                                }
                                {
                                    show.account ? <>
                                        <AccountSetting />
                                    </>:null
                                }

                            </div>
                        
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard