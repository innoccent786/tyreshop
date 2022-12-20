import React, { useContext, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getData,deleteData, updateOne } from "../../callApi/backend_api";
import Context from "../../context/authenticate";
import OrderDetails from "./OrderDetails";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Orders = () => {
  const [open, setOpen] = React.useState(false);
  const [openOrder,setOpenOrder]=useState(false);
  const {status,wait}=useContext(Context)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseOrder=()=>setOpenOrder(false)
  const handleOpenOrder=()=>setOpenOrder(true)
  
  const [success,setSuccess]=useState(false);
const [tableData,setTableData]=useState(null)
useEffect(()=>{
  getData('/orders/view').then(res=>{
    if(res.data.status==200){
      setTableData(res.data.data)
    }
    else
    {
      setTableData(null)
      
    }

  })
},[success])
const handleStatusChange=(id,state)=>{
  wait(true)
  console.log(state)
  updateOne('/orders/updateStatus?id='+id+"&status="+state).then(res=>{
 
    if(res.data.status===200){
      status({type:'success',message:'Order Updated Successfully!'})
    }
    else{
      status({type:'error',message:'Can not Update Order!'})
    }
    setSuccess(!success)
    handleClose()
    wait(false)
  })
}
const handleDelete=(id)=>{
  wait(true)
  deleteData('/orders/delete?id='+id).then(res=>{
  
    if(res.data.status===200){
      status({type:'success',message:'Order Deleted Successfully!'})
    }
    else{
      status({type:'error',message:'Can not delete Order!'})
    }
    setSuccess(!success)
    handleClose()
    wait(false)
  })
}

const TableData=tableData?tableData.map((t,index)=>{
  return (
    <tr>
    <td>{t.name}</td>
    <td>{t.email}</td>
    <td>{t.phone}</td>
    <td>{t.country}</td>
    <td>{t.state}</td>
    <td>{t.city}</td>
    <td>{t.address}</td>
    
    <td className="d-flex justify-content-center align-items-center">
      <FormGroup>
        <FormControlLabel
          control={<Switch defaultChecked={t.status=='pending'?false:true} onChange={()=>handleStatusChange(t._id,t.status=='pending'?'delivered':'pending')}/>}
        />
      </FormGroup>
    </td>
      <td >
                            <div className="d-flex">
                            <button
                              className="products_container_body_body_table_button"
                              onClick={handleOpen}
                            >
                              <DeleteIcon />
                            </button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style}>
                                <div>
                                  <h3 className="text-center">
                                    Are you sure you want to delete this order?
                                  </h3>
                                  <div className="d-flex justify-content-end pt-4">
                                    <Button
                                      variant="contained"
                                      onClick={handleClose}
                                      className="mx-2"
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="contained"
                                      onClick={()=>handleDelete(t._id)}
                                    >
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              </Box>
                            </Modal>
                            <button
                              className="products_container_body_body_table_button"
                              onClick={handleOpenOrder}
                            >
                              <RemoveRedEyeIcon />
                            </button>
                            <Modal
                              open={openOrder}
                              onClose={handleCloseOrder}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={style2}>
                                <OrderDetails customerProducts={t.products} ptotal={t.total}/>
                              </Box>
                            </Modal>
                            </div>
      </td>
  </tr>
  )
}):null
  return (
    <div>
      <div className="products_container">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-sm-12">
            <div className="products_container_body">
              <div className="products_container_body_header d-flex justify-content-between py-3">
                <h3>Orders</h3>
              </div>
              <div className="products_container_body_body">
                <div className="products_container_body_body_table">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                              <td scope="col">Customer Name</td>
                              <td scope="col">Customer Email</td>
                              <td scope="col">Customer Phone</td>
                              <td scope="col">Customer Country</td>
                              <td scope="col">Customer State</td>
                              <td scope="col">Customer City</td>
                              <td scope="col">Customer Address</td>
                              <td scope="col">Delivered</td>
                              
                              <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TableData}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
