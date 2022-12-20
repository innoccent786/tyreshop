import React, { useContext, useEffect,useState } from "react";
import { updateData,getData } from "../../callApi/backend_api";
import Context from "../../context/authenticate";

const AccountSetting = () => {
  const {status}=useContext(Context)
  const [ loginData, setloginData ] = useState({        
    email:"",
    password:"",
    name:""
})

const handleChange = (e) => {
    setloginData({
        ...loginData,
        [e.target.name]: e.target.value
    })
}
useEffect(()=>{
  getData('/users/view').then(res=>{
    if(res.data.status==200){
      setloginData(res.data.data)
      status({type:'success',message:"Data Found"})
    }
    else
    {
      status({type:'error',message:"No Data Found"})
      
    }

  })
},[])
const update=()=>{
  const formdata=new FormData();
  formdata.append('data',JSON.stringify(loginData))
updateData('/users/update',formdata).then(res=>{
  if(res.data.status==200){
    status({type:'success',message:"Data Update"})
  }
  else
  {
    status({type:'error',message:"No Data Found"})
    
  }

})
}
  return (
    <div>
      <h1 className="mb-5">Account Setting</h1>
      <div className="row">
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="add_product_input_div">
            <label className="add_product_input_div_label">Name</label>
            <input type="text" name="name" value={loginData.name} onChange={handleChange} className="add_product_input_div_input" />
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="add_product_input_div">
            <label className="add_product_input_div_label">Email</label>
            <input type="text" name="email" value={loginData.email} onChange={handleChange}   className="add_product_input_div_input" />
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-sm-12">
          <div className="add_product_input_div">
            <label className="add_product_input_div_label">Password</label>
            <input type="text" name="password" value={loginData.password} onChange={handleChange}  className="add_product_input_div_input" />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-12 col-sm-12">
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary px-4 py-2" onClick={update}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetting;
