import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../callApi/backend_api";
import Context from "../context/authenticate";
import Footer from "./Footer";
import ProductDetails from "./ProductDetails";
const Listing = () => {
  const {width,height,diameter,type}=useParams()
const [tableData,setTableData]=useState(null)
const [singleData,setSingleData]=useState(null)
const {products,setProducts,status,wait}=useContext(Context)
const [paggination,setPaggination]=useState({
  currentPage:1,
  rowPerPage:8,
})
const [filter,setFilter]=useState({
  width:'all',
  height:'all',
  diameter:'all',
  type:'all'
})
const handleChange=(e)=>{
  setFilter({
    ...filter,
    [e.target.name]:e.target.value
  })
}
const handleDetails=(index)=>{ 
  setSingleData(tableData[index])
}
useEffect(()=>{
  setFilter({
    width:width,
    height:height,
    diameter:diameter,
    type:type
  })
  
  wait(true)
  getData('/products/viewQuery?width='+width+"&height="+height+"&diameter="+diameter+"&type="+type).then(res=>{
    if(res.data.status==200){
      setTableData(res.data.data)
      status({type:"success",message:'data found!'})
    }
    else{
      status({type:'error',message:'no data found'})
    }
    
  wait(false)
  })  
},[])
const handleSubmit=()=>{
  wait(true)
getData('/products/viewQuery?width='+filter.width+"&height="+filter.height+"&diameter="+filter.diameter+"&type="+filter.type).then(res=>{
  if(res.data.status==200){
    setTableData(res.data.data)
    setSingleData(null)
    status({type:"success",message:'data found!'})
  }
  else{
    status({type:'error',message:'no data found'})
  }
  wait(false)
})
}

const handlePage=(p)=>{
setPaggination({
  ...paggination,
  currentPage:p
})
}
let page=0;
const pages=tableData?tableData.map((t,i=0)=>{
  console.log(i)
if(i>8*page){
  page++;
return (
  <button className="btn btn-primary" style={paggination.currentPage==page?{
    background: "#2490EF",
    color: "#fff"
}:null} id={page} onClick={(e)=>handlePage(Number(e.target.id))}>{page}</button>
)
}
}):null
const TableData=tableData?tableData.map((t,i=0)=>{
  if(i>=(paggination.currentPage-1)*paggination.rowPerPage&&i<(paggination.currentPage)*paggination.rowPerPage)
return (
  <div className="col-lg-3 col-md-3 col-sm-12 pb-4 pt-4">
  <div className="listing_product_div_card">
      <div className="listing_product_div_card_top">
          <img src={'/'+t.image} alt="" />
      </div>
      <div className="listing_product_div_card_bottom">
          <div className="listing_product_div_card_bottom_top ">
              <div className="listing_card_bottom_logo d-flex justify-content-center align-center-center">
                  <img src={"/"+t.brand} alt="" />
              </div>
              <h1>Tyre Size {t.tyre_size.width}/{t.tyre_size.height} {t.tyre_size.diameter}</h1>
          </div>
          <div className="listing_bottom_btn mt-2">
              <button className="btn btn-primary w-100" onClick={()=>handleDetails(i)}>View Details</button>
          </div>
      </div>
  </div>
</div>
)
}):null
  return (
    <div>
      <div className="listing_container">
        <div className="listing_container_top">
          <div className="row m-0">
            <div className="col-md-12 col-lg-12 col-sm-12 w-100">
              <div className="listing_container_top_center">
                <div className="row m-0">
                  <div className="col-md-12 col-lg-12 col-sm-12 p-0">
                    <h2>Tyre Search</h2>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12 pr-1">
                    <div className="listing_top_input">
                      <label>Width</label>
                      <select className="form-control" value={filter.width} name='width' onChange={handleChange}>
                                    <option value="all">All</option>
                                    <option value={247}>247</option>
                                    <option value={245}>245</option>
                        </select>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-12 px-1">
                    <div className="listing_top_input">
                      <label>Height</label>
                      <select className="form-control" value={filter.height} name='height' onChange={handleChange}>
                                    <option value="all">All</option>
                                    <option value={247}>247</option>
                                    <option value={245}>245</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-12 px-1">
                    <div className="listing_top_input">
                      <label>Diameter</label>
                      <select className="" name='diameter' value={filter.diameter} onChange={handleChange}>
                                    <option value='all'>All</option>
                                    <option value='R17'>R17</option>
                                    <option value='R14'>R14</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3 col-lg-3 col-sm-12">
                    <div className="listing_top_input">
                      <label> </label>
                      <select className="" value={filter.type} style={{marginTop:'30px'}} name='type' onChange={handleChange}>
                                    <option value='all'>All</option>
                                    <option value='winter'>Winter</option>
                                    <option value='summer'>Summer</option>
                      </select>
                      <div>
                        <p
                          className="text-right mt-1"
                          style={{
                            fontSize: "12px",
                            color: "#fff",
                            cursor: "pointer",
                          }}
                        >
                          More Options
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 col-lg-2 col-sm-12 p-0">
                    <div className="listing_top_input">
                      <div
                        style={{
                          marginTop: "30px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      ></div>
                      <button
                        className="btn btn-primary"
                        style={{
                          width: "150px",
                          height: "50px",
                        }}
                        onClick={handleSubmit}
                      >
                        Search For Tyres
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {singleData?<ProductDetails singleData={singleData} setSingleData={setSingleData} tableData={tableData}/>
        :<div className="listing_container_center">
          <div className="row m-0">
            <div className="col-md-12 col-lg-12 col-sm-12 p-0">
              <div className="listing_container_center_top d-flex justify-content-between align-items-center">
                <h1>Search result</h1>
                <p>
                    {tableData?tableData.length<8?tableData.length:(tableData.length-((paggination.currentPage-1)*8))>8?8:(tableData.length-((paggination.currentPage-1)*8)):0}  out of {tableData?tableData.length:0}
                </p>
              </div>
            </div>
          </div>
          <div className="listing_product_div">
            <div className="row m-0">
                {TableData}
            </div>
            <div className="row m-0 mt-2 py-4">
                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="listing_product_div_pagination d-flex align-items-center justify-content-center">
                        <div className="listing_product_div_pagination_btn">
                            {tableData?tableData.length>8?<button className="btn btn-primary listing_back" onClick={()=>handlePage(paggination.currentPage-1)} disabled={paggination.currentPage==1?true:false}>Back</button>:null:null}
                            {pages}{
                              tableData?tableData.length>8?
                            <button className="btn btn-primary listing_next" onClick={()=>handlePage(paggination.currentPage+1)} disabled={(tableData.length-((paggination.currentPage-1)*8))>8?false:true}>Next
                            </button>:null:null}
                        </div>
                    </div>
                </div>
            </div>
          </div>
          
        </div>}
      </div> 
      <Footer />  
    </div>
  );
};

export default Listing;
