import React,{useEffect, useState} from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/authenticate";
import Footer from "./Footer";

const ProductDetails = (props) => {
  const {tableData,singleData,setSingleData}=props
  const [tableData2,setTableData2]=useState(null)
  const {products,setProducts}=useContext(Context)
  const [paggination,setPaggination]=useState({
    currentPage:1,
    rowPerPage:4,
  })
  const handlePaggination=(val)=>{
    let prev=1;
    let next=parseFloat(tableData2.length/paggination.rowPerPage)
if(next%4!=0){
  next=next+1
}
    let flag=paggination.currentPage+val>=prev&&paggination.currentPage+val<=next?true:false
if(flag)
    setPaggination({
      ...paggination,
      currentPage:paggination.currentPage+val
    })
  }

const handleDetails=(index)=>{ 
    setSingleData(tableData[index])
  }
  let index=0;
  useEffect(()=>{
setTableData2(tableData.filter(t=>{
  return t._id!=singleData._id
}))
  },[tableData])
  const TableData=tableData2?tableData2.map((t,i=0)=>{
   // console.log(paggination.currentPage,i)
    if((i)>=((paggination.currentPage-1)*paggination.rowPerPage)&&(i)<((paggination.currentPage)*paggination.rowPerPage))
  {  
    console.log(paggination.currentPage,i)
      
  return (
    <div className="col-lg-3 col-md-3 col-sm-12">
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
  }}):null
  
    const navigate=useNavigate()
    const addToCart=()=>{
        setProducts([...products,{...singleData,quantity:1}])
        navigate('/cart')
    }
  return (
    <div>
      <div className="listing_container">
     
        <div className="listing_container_center listing_product_details_center">
          <div className="listing_product_div mt-0 pt-0">
            <div className="row m-0 my-4">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="listing_product_div_card"
                        style={{
                            border: "1px solid #e6e6e6",
                            position:"relative"
                        }}
                    >
                        <div className="logo_top_detail"
                            style={{
                                position:"absolute",
                                top:"0",
                                left:"12%",
                                width:"100px",
                                height:"100px",
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                background:"#fff"
                            }}
                        >
                            <img src={"/"+singleData.brand} alt="..." />
                        </div>
                        <div className="listing_product_div_card_top">
                            <img src={"/"+singleData.image} alt="..." />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="listing_product_div_card align-items-start justify-content-start">
                        <div className="listing_product_div_card_top">
                            <div className="d-flex flex-column">
                                <h1>{singleData.tyre_name}</h1>
                                <p>{singleData.description}</p>
                            </div>
                            <div className="my-3 listing_product_details_right">
                                <h4>Tyre Size <span>{singleData.tyre_size.width}/{singleData.tyre_size.height} {singleData.tyre_size.diameter}</span></h4>
                                <h4>Brand: <span>{<img src={"/"+singleData.brand} className='brand_image' alt="..." />}</span></h4>
                                <h4>Pattern Susqua<span>{singleData.pattern}</span></h4>
                                <h4>Load Index: <span>{singleData.load_index}</span></h4>
                                <h4>Speed Rating: <span>{singleData.speed_rating}</span></h4>
                                <h4>Tread Dept (mm): <span>{singleData.trad_dept}</span></h4>
                                <h4>Categories: <span>{singleData.category}</span></h4>
                            </div>
                            <div className="mt-5">
                                <button className="btn btn-primary px-5 py-2" onClick={ addToCart }>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row my-4 w-100">
                   {tableData?tableData.length>4? 
                   <div className="col-12">
                        <div className="details_top_nav_button d-flex justify-content-end align-items-end">
                            <div className="left_arrow" onClick={()=>handlePaggination(-1)}>
                                <img src="./assets/leftarrow.png" alt="..." />
                            </div>
                            <div className="right_arrow btn" onClick={()=>handlePaggination(1)}>
                                <img src="./assets/rightarrow.png" alt="..." />
                            </div>
                        </div>
                    </div>
                        :null:null}
                   
                
               
                {TableData}
                </div>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
