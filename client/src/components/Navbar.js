import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const [activeItem, setActiveItem] = React.useState(true);
  const [activeItem1, setActiveItem1] = React.useState(true);
  const [activeItem2, setActiveItem2] = React.useState(true);

  useEffect(() => {
     setActiveItem(true);
      setActiveItem1(false);
      setActiveItem2(false);
  }, []);

  const handleToggle = () => {
    setActiveItem(!false);
    setActiveItem1(false);
    setActiveItem2(false);

  };
  const handleToggle1 = () => {
    setActiveItem1(!false);
    setActiveItem(false);
    setActiveItem2(false);
  };
  const handleToggle2 = () => {
    setActiveItem2(!false);
    setActiveItem(false);
    setActiveItem1(false);
  };



  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light navigation_bar">
            <Link class="navbar-brand ml-4" to="/">
            <img src="./assets/logo.png" width="200" height="50" alt="..." />
            </Link>
            <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav ml-auto pr-lg-4">
                    <Link class={activeItem ? "nav-item nav-link active":"nav-item nav-link"} to="/" 
                      onClick={handleToggle}
                    >Home </Link>
                    <Link class={activeItem1 ? "nav-item nav-link active":"nav-item nav-link"} to="/about"
                      onClick={handleToggle1}
                    >About us</Link>
                    <Link class={activeItem2 ? "nav-item nav-link active":"nav-item nav-link"} to="/contact"
                      onClick={handleToggle2}
                    >Contact us</Link>
                    <Link class={activeItem2 ? "nav-item nav-link active":"nav-item nav-link"} to="/dashboard"
                      onClick={handleToggle2}
                    >Dashboard</Link>
                </div>
            </div>
            </nav>
    </div>
  )
}

export default Navbar