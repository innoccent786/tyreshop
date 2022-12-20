import React, { useContext,useEffect,useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { deleteData, getData, postData, updateData } from "../../callApi/backend_api";
import Context from "../../context/authenticate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: "93vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const Products = () => {
  const [success,setSuccess]=useState(false)
  const [formData,setFormData]=useState({
    tyre_name:null,
    description:null,
    tyre_size:{
      width:0,
      height:0,
      diameter:null,
      type:null
    },
    price:0,
    brand:null,
    pattern:null,
    load_index:0,
    speed_rating:null,
    trad_dept:0,
    category:null,
    discount:0
  })
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  
  const [openBrand, setOpenBrand] = React.useState(false);
  const handleOpenBrand = () => setOpenBrand(true);
  const handleCloseBrand = () => setOpenBrand(false);

  const [brands,setBrands]=useState(null)
  const [newBrand,setNewBrand]=useState({
    name:null,
    file:null
  })

const submitBrand=()=>{
  const formdata=new FormData();
  let flag=true;
  for (const [key, value] of Object.entries(newBrand)) {
  console.log(value)
    if(value==null){
      flag=false
     }
     else if(value.length<=0){
      flag=false
     }
  }
  if(!flag){
      status({type:'error',message:'Every Field is required'})
  }
  else{
  formdata.append('data',JSON.stringify(newBrand));
  formdata.append('file',newBrand.file);
  wait(true)
  postData('/products/saveBrand',formdata).then(res=>{
    if(res.data.status===200){
        status({type:'success',message:'Brand Save Successfully!'})
        setNewBrand({
          name:null,
          file:null
        })
    }
    else{
      status({type:'error',message:'Can not save Brand!'})
    }
    setSuccess(!success)
    handleClose()
    wait(false)
  })
}
}


  const Edit=(item)=>{
  setFormData(item);
  handleOpenEdit();
  }
    
    const {wait,status}=useContext(Context)

const [tableData,setTableData]=useState(null)
useEffect(()=>{
  getData('/products/view').then(res=>{
    if(res.data.status==200){
      setTableData(res.data.data)
    }
    else{
      setTableData(null)
    }
  })
  getData('/products/viewBrand').then(res=>{
    if(res.data.status==200){
      setBrands(res.data.data)
    }
    else{
      setBrands(null);
      
    }
  })
  
},[success]) 

  const handleChange=(e)=>{
const {name,value}=e.target;
if(name=='width'||name=='height'||name=='diameter'||name=='type')
{
  setFormData({
  ...formData,
    tyre_size:{...formData.tyre_size,[name]:value}
})
}
else
setFormData({
  ...formData,
  [name]:value
})
}
const [file,setFile]=useState(null);
const handleFilechange=(e)=>{
  setFile(e.target.files[0])
}

const handleSubmit=(e)=>{
  const formdata=new FormData();
  let flag=true;
  for (const [key, value] of Object.entries(formData)) {
    if(key=='tyre_size'){
      if(formData.tyre_size.width<=0||formData.tyre_size.height<=0||formData.tyre_size.diameter==null||formData.tyre_size.type==null)
      {
        flag=false
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
  if(!flag||file==null){
      status({type:'error',message:'Every Field is required'})
  }
  else{
  formdata.append('data',JSON.stringify(formData));
  formdata.append('file',file);
  wait(true)
  postData('/products/save',formdata).then(res=>{
    if(res.data.status===200){
        status({type:'success',message:'Product Save Successfully!'})
        setFormData({
          tyre_name:null,
          description:null,
          tyre_size:{
            width:0,
            height:0,
            diameter:null,
            type:null
          },
          price:0,
          brand:null,
          pattern:null,
          load_index:0,
          speed_rating:null,
          trad_dept:0,
          category:null,
          discount:0
        })
    }
    else{
      status({type:'error',message:'Can not save product!'})
    }
    setSuccess(!success)
    handleClose()
    wait(false)
  })
}
}
const handleDelete=(id)=>{
  wait(true)
  deleteData('/products/delete?id='+id).then(res=>{

    if(res.data.status===200){
      status({type:'success',message:'Product Deleted Successfully!'})
    }
    else{
      status({type:'error',message:'Can not delete product!'})
    }
    setSuccess(!success)
    handleCloseDelete()
    wait(false)
  })
}

const handleSubmitUpdate=(e)=>{
  const formdata=new FormData();
  let flag=true;
  for (const [key, value] of Object.entries(formData)) {
    if(key=='tyre_size'){
      if(formData.tyre_size.width<=0||formData.tyre_size.height<=0||formData.tyre_size.diameter==null||formData.tyre_size.type==null)
      {
        flag=false
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
      status({type:'error',message:'Every Field is required'})
  }
  else{
  formdata.append('data',JSON.stringify(formData));
  if(file)
  formdata.append('file',file);
  wait(true)
  updateData('/products/update?id='+formData._id,formdata).then(res=>{
    if(res.data.status===200){
        status({type:'success',message:'Product Save Successfully!'})

    }
    else{
      status({type:'error',message:'Can not save product!'})
    }
    setSuccess (!success)  
    handleCloseEdit()
    wait(false)
  })
}
}
const TableData=tableData?tableData.map((item,index)=>{
    return(
                   <tr>
                        <td>{item.tyre_name}</td>
                        <td><img src={"http://localhost:4001/"+item.brand} height="27px"/></td>
                        <td>£{item.price}</td>
                        <td>{item.discount}</td>
                        <td>
                          <button className="products_container_body_body_table_button"
                            onClick={() => Edit(item)}
                          >
                            <EditIcon />
                          </button>
                          <Modal
                  open={openEdit}
                  onClose={handleCloseEdit}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                     <div>
                      <h1 className="mb-3">Edit Product</h1>
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Name
                            </label>
                            <input
                            value={formData.tyre_name}
                            name='tyre_name'
                            onChange={handleChange}
                              type="text"
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Description
                            </label>
                            <input
                            value={formData.description}
                            name='description'
                            onChange={handleChange}
                              type="text"
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Width
                            </label>
                            <input
                              type="number"
                              name='width'
                              value={formData.tyre_size.width}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Height
                            </label>
                            <input
                              type="number"
                              name='height'
                              value={formData.tyre_size.height}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Diameter
                            </label>
                            <input
                              type="text"
                              name='diameter'
                              value={formData.tyre_size.diameter}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre type
                            </label>
                            <input
                              type="text"
                              name='type'
                              value={formData.tyre_size.type}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Price
                            </label>
                            <input
                              type="number"
                              name='price'
                              value={formData.price}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Pattern
                            </label>
                            <input
                              type="text"
                              name="pattern"
                              value={formData.pattern}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Load Index
                            </label>
                            <input
                              type="number"
                              name="load_index"
                              value={formData.load_index}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Speed Rating
                            </label>
                            <input
                              type="text"
                              name="speed_rating"
                              value={formData.speed_rating}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Trad Department
                            </label>
                            <input
                              type="text"
                              name="trad_dept"
                              value={formData.trad_dept}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Category
                            </label>
                            <input
                              type="text"
                              name='category'
                              value={formData.category}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Image
                            </label>
                            <input
                              type="file"
                              name="file"
                              onChange={handleFilechange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4"> 
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Discount (%)
                            </label>
                            <input
                              type="number"
                              name="discount"
                              max={100}
                              min={0}
                              value={formData.discount}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Brand Name
                            </label>
                            <select onChange={handleChange} name='brand' value={formData.brand} className="add_product_input_div_input">
                              <option value="null">Select Brand</option>
                                {brands?brands.map((b)=>{
                                  return(
                                    <option value={b.image}>{b.name}</option>
                                  )
                                }):null
                                }
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12 col-lg-12 col-sm-12 py-0">
                          <div className="d-flex justify-content-end">
                            <button className="add_product_input_div_button btn btn-primary mx-2"
                            onClick={handleCloseEdit}
                            >
                              Cancel
                            </button>
                            <button className="add_product_input_div_button btn btn-primary"
                            onClick={handleSubmitUpdate}
                            >
                              Update Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
                          <button
                            className="products_container_body_body_table_button"
                            onClick={handleOpenDelete}
                          >
                            <DeleteIcon />
                          </button>
                          <Modal
                            open={openDelete}
                            onClose={handleCloseDelete}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box style={{
                                backgroundColor: "white",
                                width: "500px",
                                height: "200px",
                                margin: "auto",
                                marginTop: "200px",
                                borderRadius: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "0px 20px",

                            }}>
                              <div>
                                <h3 className="text-center">
                                  Are you sure you want to delete this product?
                                </h3>
                                <div className="d-flex justify-content-end pt-4">
                                  <Button
                                    variant="contained"
                                    onClick={handleCloseDelete}
                                    className="mx-2"
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            </Box>
                          </Modal>
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
                <h3>Products</h3>
                <button
                  className="products_container_body_header_button"
                  onClick={handleOpen}
                >
                  Add Product
                </button>
                <button
                  className="products_container_body_header_button"
                  onClick={handleOpenBrand}
                >
                  Add Brand
                </button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <div>
                      <h1 className="mb-3">Add Product</h1>
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Name
                            </label>
                            <input
                            value={formData.tyre_name}
                            name='tyre_name'
                            onChange={handleChange}
                              type="text"
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Description
                            </label>
                            <input
                            value={formData.description}
                            name='description'
                            onChange={handleChange}
                              type="text"
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Width
                            </label>
                            <input
                              type="number"
                              name='width'
                              value={formData.tyre_size.width}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Height
                            </label>
                            <input
                              type="number"
                              name='height'
                              value={formData.tyre_size.height}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre Diameter
                            </label>
                            <input
                              type="text"
                              name='diameter'
                              value={formData.tyre_size.diameter}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Tyre type
                            </label>
                            <input
                              type="text"
                              name='type'
                              value={formData.tyre_size.type}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12 mt-2">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Price
                            </label>
                            <input
                              type="number"
                              name='price'
                              value={formData.price}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Pattern
                            </label>
                            <input
                              type="text"
                              name="pattern"
                              value={formData.pattern}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Load Index
                            </label>
                            <input
                              type="number"
                              name="load_index"
                              value={formData.load_index}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Speed Rating
                            </label>
                            <input
                              type="text"
                              name="speed_rating"
                              value={formData.speed_rating}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Trad Department
                            </label>
                            <input
                              type="text"
                              name="trad_dept"
                              value={formData.trad_dept}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Category
                            </label>
                            <input
                              type="text"
                              name='category'
                              value={formData.category}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Image
                            </label>
                            <input
                              type="file"
                              name="file"
                              onChange={handleFilechange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4"> 
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Discount (%)
                            </label>
                            <input
                              type="number"
                              name="discount"
                              max={100}
                              min={0}
                              value={formData.discount}
                              onChange={handleChange}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Brand Name
                            </label>
                            <select onChange={handleChange} name='brand' value={formData.brand} className="add_product_input_div_input">
                              <option value="null">Select Brand</option>
                                {brands?brands.map((b)=>{
                                  return(
                                    <option value={b.image}>{b.name}</option>
                                  )
                                }):null
                                }
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12 col-lg-12 col-sm-12 py-0">
                          <div className="d-flex justify-content-end">
                            <button className="add_product_input_div_button btn btn-primary mx-2"
                            onClick={handleClose}
                            >
                              Cancel
                            </button>
                            <button className="add_product_input_div_button btn btn-primary"
                            onClick={handleSubmit}
                            >
                              Add Product
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
              </div>
              <div className="products_container_body_body">
                <div className="products_container_body_body_table">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Brand</th>
                        <th scope="col">Product Price</th>
                        <th scope="col">Product Discount</th>
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
      <Modal
                  open={openBrand}
                  onClose={handleCloseBrand}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                  <div>
                      <h1 className="mb-3">Add Brand</h1>
                     
                      <div className="row mt-4">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={newBrand.name}
                              onChange={(e)=>setNewBrand({...newBrand,'name':e.target.value})}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                          <div className="add_product_input_div">
                            <label className="add_product_input_div_label">
                              Brand Icon
                            </label>
                            <input
                              type="file"
                              name="icon"
                              
                              onChange={(e)=>setNewBrand({...newBrand,file:e.target.files[0]})}
                              className="add_product_input_div_input"
                            />
                          </div>
                        </div>
                        
                      </div>
                     
                      
                      <div className="row mt-4">
                        <div className="col-md-12 col-lg-12 col-sm-12 py-0">
                          <div className="d-flex justify-content-end">
                            <button className="add_product_input_div_button btn btn-primary mx-2"
                            onClick={handleCloseBrand}
                            >
                              Cancel
                            </button>
                            <button className="add_product_input_div_button btn btn-primary"
                            onClick={submitBrand}
                            >
                              Add Brand
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Box>
                </Modal>
    </div>
  );
};

export default Products;
