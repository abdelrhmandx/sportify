import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo2 .png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect } from "react";

const Sidebar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(0);

  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left : '0'
    },
    false:{
      left : '-60%'
    }
  }
  useEffect(()=>{
    if(location.pathname === '') {
      
    }
    var index = SidebarData.findIndex(function(item) {
      return item.path == location.pathname
    });
    setSelected(index);
    // console.log(location.pathname)
  },[])
  // console.log(window.innerWidth)
  return (
    <>
      <div className="bars" style={expanded?{left: '60%'}:{left: '5%'}} onClick={()=>setExpaned(!expanded)}>
        <UilBars />
      </div>
    <motion.div className='sidebar'
    variants={sidebarVariants}
    animate={window.innerWidth<=768?`${expanded}`:''}
    >
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>
          
          <span></span>
        </span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                navigate(item.path);
                setSelected(index);
              }}
            >
              <item.icon style={{fontSize:'25px',fontWeight:'lighter'}} />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <div className="menuItem" onClick={()=>{navigate('/')}}>
          <UilSignOutAlt />
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Sidebar;
