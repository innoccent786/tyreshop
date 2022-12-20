import React,{useState,useEffect,useContext} from 'react'
import Footer from './Footer'
import { postData } from '../callApi/backend_api'
import Context from '../context/authenticate'
const Contact = () => {
  const [formData,setFormData]=useState({
    name:null,
    email:null,
    message:null,
    status:'pending'
  })
  const handleChange=(e)=>{
    const {name,value}=e.target
    setFormData({
      ...formData,
      [name]:value
    })
  }
  const {wait,status}=useContext(Context)
  const handleSubmit=(e)=>{
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
    if(!flag){
        status({type:'error',message:'May be a field is empty or cart is empty'})
    }
    else{
    formdata.append('data',JSON.stringify(formData));
    wait(true)
    postData('/contacts/save',formdata).then(res=>{
      if(res.data.status===200){
          status({type:'success',message:'Message Sent!'})
      }
      else{
        status({type:'error',message:'Can not Send Message!'})
      }
      wait(false)
    })
  }
  }
  return (
    <div>
      <div className="contactus_container">
        <div className="contactus_content">
           <div className="contactus_topdiv"> 
            <h1 className="contactus_title">Contact us</h1>
           </div>
           <div className="contactus_centerdiv">
              <div className="row m-0">
                <div className="col-md-6 col-lg-6 col-sm-12">
                  <div className="contactus_leftdiv pl-3">
                    <div className="contactus_info">
                      <div className="contactus_info_icon mt-3">
                        <img src="./assets/emailicon.png" alt="..."  />
                      </div>
                      <div className="contactus_info_text">
                        <h1 className="contactus_info_title">Email Address</h1>
                        <p>info@sofabespoke.co.uk</p>
                      </div>  
                    </div>
                    <div className="contactus_info">
                      <div className="contactus_info_icon mt-3">
                        <img src="./assets/callicon.png" alt="..."  />
                      </div>
                      <div className="contactus_info_text">
                        <h1 className="contactus_info_title">Phone Number</h1>
                        <p>+02087442000</p>
                      </div>  
                    </div>
                    <div className="contactus_info">
                      <div className="contactus_info_icon mt-3">
                        <img src="./assets/locationicon.png" alt="..."  />
                      </div>
                      <div className="contactus_info_text">
                        <h1 className="contactus_info_title">Address</h1>
                        <p>Corner Building, Twickenham Trading Estate, Rugby Road, Twickenham, TW1 1DQ.</p>
                      </div>  
                    </div>
                    <div className="contactus_info">
                      <div className="contactus_info_icon mt-3 mr-4">
                        
                      </div>
                      <div className="contactus_info_text">
                        <h1 className="contactus_info_title">Follow us</h1>
                        <div className="contactus_social_logo">
                          <button><img src="./assets/facebook.svg" alt="..."  /></button>
                          <button><img src="./assets/youtube.png" alt="..."  /></button>
                          <button><img src="./assets/insta.png" alt="..."  /></button>
                         
                        </div>
                      </div>  
                    </div>

                  </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12 position-relative">
                  <div className="contactus_rightdiv">
                    <div className='contactus_form'>
                      <div className="contactus_form_title">
                        <h1 
                          style={{color: '#fff', fontSize: '2rem', fontWeight: 'bold'}}
                        >Get in touch with us</h1>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="contactus_form_input">
                            <label for="name">Full Name</label>
                            <input type="text" name='name' value={formData.name} onChange={handleChange} placeholder="Name" />
                          </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                          <div className="contactus_form_input">
                            <label for="name">Email</label>
                            <input type="email" name='email' value={formData.email} onChange={handleChange} placeholder="Email"  />
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <div className="contactus_form_input">
                            <label for="name">Message</label>
                            <textarea type="text" name='message' value={formData.message} onChange={handleChange}
                              cols={30} rows={6}
                             placeholder="Your Message" />
                          </div>
                        </div>
                        <div className="col-md-12 col-lg-12 col-sm-12">
                          <div className="contactus_form_input d-flex align-items-end">
                            <button className="contactus_form_button btn btn-primary w-25" onClick={handleSubmit}>Send</button>
                          </div>
                        </div>
                        
                      </div>

                    </div>
                  </div>
                </div>
              </div>
              <div className="contactus_bottom">
                  <div className="row m-0">
                    <div className="col-md-12 col-lg-12 col-sm-12">
                      <div className="contactus_map bg-dark mx-5">
                          
                      </div>
                    </div>
                  </div>
                </div>
           </div>
           <Footer />
        </div>
      </div>
    </div>
  )
}

export default Contact