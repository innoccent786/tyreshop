import React from 'react'
import Footer from './Footer'

const About = () => {
  return (
    <div>
      <div className="aboutus_container">
        <div className="aboutus_content">
           <div className="aboutus_topdiv"> 
            <h1 className="aboutus_title">About Us</h1>
           </div>
           <div className="aboutus_centerdiv">
              <div className="row m-0">
                <div className="col-md-7 col-lg-7 col-sm-12">
                  <div className="aboutus_leftdiv pl-3">
                    <h1 className="aboutus_lefttitle mb-4">About Company</h1>
                    <p>Lorem ipsum dolor sit amet consectetur. Mauris odio pharetra massa nunc non nisl at. Tempor consectetur vitae enim mattis nulla consequat posuere sit. A vestibulum vulputate volutpat et pretium amet amet. Pellentesque nibh nullam morbi sem pellentesque vestibulum. Vitae est egestas lectus neque adipiscing egestas vehicula. Consectetur tincidunt pellentesque enim tincidunt maecenas sagittis. Malesuada laoreet feugiat at pharetra. Lobortis volutpat elementum convallis ac viverra sed. Dignissim eget ut consequat ipsum nisi semper vitae at.<br /> <p className='pb-2'></p> 
                    

                    Congue mauris laoreet suspendisse enim nullam sed. Id aliquet ultrices viverra ornare. Id elit imperdiet bibendum posuere. Elit diam neque adipiscing id. Morbi massa semper pharetra senectus auctor feugiat nisi. <br /><p className='pb-2'></p> 

                    A orci aliquet netus amet id at nisi ornare ipsum. In ut ut malesuada tellus morbi eleifend. Viverra egestas fusce lorem id congue molestie lectus. Est tincidunt feugiat arcu neque viverra nulla neque. Consequat mi egestas senectus fringilla purus. Felis a ac sollicitudin nulla est leo est. <br />

                    Quis est mi nec est rhoncus pretium fermentum. Adipiscing pretium tellus viverra.</p>
                  </div>
                </div>
                <div className="col-md-5 col-lg-5 col-sm-12">
                  <div className="aboutus_rightdiv">
                    <img src="./assets/tyresshowroom.png" alt="..."  />
                  </div>
                </div>
              
              </div>
           </div>
           <Footer />
        </div>
      </div>
    </div>
  )
}

export default About