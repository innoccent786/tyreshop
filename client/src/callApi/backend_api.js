import axios from "axios"
const callApi= {
   getData: async (api)=>{
    try{
      const res=await axios.get(api,{
      withCredentials:true,
     
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  postData: async (api,data)=>{
    try{
      const res=await axios.post(api,data,{
      withCredentials:true,
      headers:{
        access_token:window.localStorage.getItem('access_token'),
        "Content-Type": "multipart/form-data",
      }
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  deleteData: async (api,data)=>{
    try{
      const res=await axios.delete(api,{
      withCredentials:true,
      headers:{
        access_token:window.localStorage.getItem('access_token')
      }
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  updateData: async (api,data)=>{
    try{
      const res=await axios.put(api,data,{
      withCredentials:true,
      headers:{
        access_token:window.localStorage.getItem('access_token')
      }
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
  updateOne: async (api)=>{
    try{
      const res=await axios.put(api,{
      withCredentials:true,
      headers:{
        access_token:window.localStorage.getItem('access_token')
      }
    });
    return res;
    }catch(err){ 
      return false;
    }
  },
}
const {postData,getData,updateData,deleteData,updateOne}=callApi
export {postData,getData,updateData,deleteData,updateOne}