import React, { useContext,useState,useEffect } from 'react'
import Context from '../../context/authenticate'
import { getData } from '../../callApi/backend_api'
function OrderDetails(props) {
    const [tableData,setTableData]=useState(null)
    const {customerProducts,ptotal}=props
    const {status}=useContext(Context)
useEffect(()=>{
  getData('/products/view').then(res=>{
    if(res.data.status==200){
      setTableData(res.data.data)
      status({type:'success',message:"Data Found"})
    }
    else
    {
      status({type:'error',message:"No Data Found"})
      
    }

  })
},[])
let total=0;
const TableData=customerProducts&&tableData?customerProducts.map(p=>{

  const data=tableData.filter(t=>{
 
    return t._id==p.id
})
    return (
    <tr>
    <td>{data[0].tyre_name}</td>
    <td>{data[0].brand}</td>
    <td>£{data[0].price}</td>
    <td>{p.quantity}</td>
    </tr>
  )
}):null

  return (
    <div>
         <div className="products_container_body_body">
                <div className="products_container_body_body_table">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Brand</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Quantity</th>                     
                      </tr>
                    </thead>
                    <tbody>
                      {TableData}
                    </tbody>
                    </table>
                    <div className='d-flex justify-content-end'>
                        Total(Including Delivery): <span>£{parseFloat(ptotal)}</span>
                    </div>
                    </div>
                    </div>
    </div>
  )
}

export default OrderDetails