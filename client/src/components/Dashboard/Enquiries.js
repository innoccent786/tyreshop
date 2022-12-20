import React, { useContext,useState,useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Context from '../../context/authenticate';
import { getData,updateOne,deleteData } from '../../callApi/backend_api';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Enquiries = () => {

    const [open, setOpen] = React.useState(false);
    const {status,wait}=useContext(Context)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [success,setSuccess]=useState(false);
    const [tableData,setTableData]=useState(null)
    useEffect(()=>{
      getData('/contacts/view').then(res=>{
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
      updateOne('/contacts/updateStatus?id='+id+"&status="+state).then(res=>{
     
        if(res.data.status===200){
          status({type:'success',message:'Enquire Updated Successfully!'})
        }
        else{
          status({type:'error',message:'Can not update enquiry!'})
        }
        setSuccess(!success)
        handleClose()
        wait(false)
      })
    }
    const handleDelete=(id)=>{
      wait(true)
      deleteData('/contacts/delete?id='+id).then(res=>{
     
        if(res.data.status===200){
          status({type:'success',message:'Enquiry Deleted Successfully!'})
        }
        else{
          status({type:'error',message:'Can not delete enquiry!'})
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
        <td>{t.message}</td>
        
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
                                        Are you sure you want to delete this Enquiry?
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
                            <h3>Enquiries</h3>
                        </div>
                        <div className="products_container_body_body">
                            <div className="products_container_body_body_table">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Customer Name</th>
                                            <th scope="col">Customer Email</th>
                                            <th scope="col">Customer Message</th>
                                            <th scope="col">Status</th>
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
  )
}

export default Enquiries