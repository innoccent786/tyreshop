import React, { useContext, useState } from 'react'
import { Snackbar,Alert, CircularProgress, Modal } from '@mui/material'
import Context from '../context/authenticate'
function SuccessMessage(props) {
    const {open,message}=props
    const {status}=useContext(Context)
    
    const handleClose=()=>status({type:'success',message:null,value:true})
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
    </Alert>
    </Snackbar>
  )
}

function ErrorMessage(props) {
    const {open,message}=props
    const {status}=useContext(Context)
    
    const handleClose=()=>status({type:'error',message:null,value:true})
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
    </Alert>
    </Snackbar>
  )
}

function Wait(props){
  const {open}=props
  return(
    <Modal
    sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
  
  <CircularProgress sx={{width:'100px', height:'100px'}}/>
  </Modal>

)
}
export {SuccessMessage,ErrorMessage,Wait}