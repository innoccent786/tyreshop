import { useReducer } from "react";
const initialState={
    success:false,
    error:false,
    message:null
}
const reducer=(state,action)=>{
   
            return {[action.type]:!action.value,message:action.message}
}
export  {reducer,initialState}