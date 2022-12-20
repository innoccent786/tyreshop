import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const [filter,setFilter]=useState({
    width:'all',
    height:'all',
    diameter:'all',
    type:'all'
  })
  const navigate=useNavigate()
  const handleChange=(e)=>{
    setFilter({
      ...filter,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit=()=>{
    navigate('/listing/'+filter.width+'/'+filter.height+'/'+filter.diameter+'/'+filter.type)
  }
  return (
    <div>
      <div class="landing_container postion-relative">
         <div className="row m-0">
            <div className="col-md-12 col-lg-12 col-sm-12">
                <div className="landing_innerdiv">
                    <div className="landing_inner_header">
                      <h1>Tyre Search</h1>
                    </div>
                    <div className="row ">
                      <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="landing_inner_search" >
                                <label>Width</label>
                                <select className="form-control" name='width' onChange={handleChange}>
                                    <option value='all'>All</option>
                                    <option value={247}>247</option>
                                    <option value={245}>245</option>
                                </select>
                            </div>
                      </div>        
                      <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="landing_inner_search">
                                <label>Height</label>
                                <select className="form-control" name='height' onChange={handleChange}>
                                    <option value="all">All</option>
                                    <option value={247}>247</option>
                                    <option value={245}>245</option>
                                </select>
                            </div>
                      </div>        
                      <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="landing_inner_search" >
                                <label>Diameter</label>
                                <select className="" name='diameter' onChange={handleChange}>
                                    <option value='all'>All</option>
                                    <option value='R17'>R17</option>
                                    <option value='R14'>R14</option>
                                </select>
                            </div>
                      </div>        
                      <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="landing_inner_search" style={{margin:" 0px"}}>
                                <select className="form-control" name='type' onChange={handleChange}>
                                    <option value='all'>All</option>
                                    <option value='winter'>Winter</option>
                                    <option value='summer'>Summer</option>
                                </select>
                            </div>
                      </div>        
                      <div className="col-md-12 col-lg-12 col-sm-12">
                            <p style={
                              {
                                color: "white",
                                fontSize: "16px",
                                cursor: "pointer",
                                margin: "10px 6px",
                                textAlign: "right"
                              }
                            }>More Options</p>
                      </div>        
                      <div className="col-md-12 col-lg-12 col-sm-12">
                            <div className="landing_inner_search" style={{margin:" 0px"}}>
                                <button className="btn btn-primary" onClick={handleSubmit}>Search for tyres</button>
                            </div>
                      </div>        
                          
                    </div>
                </div>
            </div>
         </div>
         <div className="landing_bottom">
            <div className="row m-0">
                <div className="col-md-12 col-lg-12 col-sm-12">
                    <div className="landing_bottom_inner">
                      <p>© 2022 Sofa Bespoke, LTD. All rights reserved. Privacy    |    Terms</p>
                    </div>
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}

export default Landing