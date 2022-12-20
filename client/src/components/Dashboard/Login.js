import React, { useContext, useEffect,useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/authenticate';

const Login = (props) => {
  const navigate=useNavigate();
  const {loggedIn,setLoggedIn}=props
  const {status,wait}=useContext(Context)
  const [ loginData, setloginData ] = useState({        
      email:"",
      password:"",
  })
  
  const handleChange = (e) => {
      setloginData({
          ...loginData,
          [e.target.name]: e.target.value
      })
  }
  

  //api calls
  const callAPI=async ()=>{
      const formdata=new FormData();
      formdata.append('data',JSON.stringify({...loginData}))
      const res=await axios.post('http://localhost:4001/auth/login',formdata,{
          withCredentials:true
      })
      return res
  }
  const submitForm=(e)=>{
    e.preventDefault()
     
      wait(true);
      callAPI().then((res)=>{
          if(res.data.status==200){
              window.localStorage.setItem('access_token',res.data.access_token)
              status({type:'success',message:'Login Success!'})
              setLoggedIn(true);
          }
          else{
              status({type:'error',message:'Invalid Login Details!'})
          }
          wait(false);
      })
  }
  useEffect (()=>{
    if(loggedIn){
        navigate('/dashboard')
    }
},[loggedIn])
  return (
    <div>
        <div className="login_container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <div className="login_form">
                <div className="login_form_header">
                  <h3>Login</h3>
                  <p>Please Enter your details below</p>
                </div>
                <div className="login_form_body">
                  <form>
                    <div className="add_product_input_div">
                      <label htmlFor="email">Email address</label>
                      <input type="email" value={loginData.email} onChange={handleChange} name='email' className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="add_product_input_div">
                      <label htmlFor="password">Password</label>
                      <input type="password" onChange={handleChange} value={loginData.password} name='password' className="form-control" id="password" placeholder="Password" />
                    </div>
                    
                    <div className='d-flex justify-content-center w-100'>
                      <button type="submit" className="btn btn-primary w-100" onClick={submitForm}>Login</button>
                    </div>
                  </form>
                </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login