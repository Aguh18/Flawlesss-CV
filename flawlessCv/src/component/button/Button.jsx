// import React from 'react'
// import styles from './button.module.css'

import { useNavigate } from "react-router-dom";

const NavButton = ({label, url}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(url)
  }
  return (
    <button onClick={handleClick} className="w-auto text-xl " >
        {label} 
  </button>
  )
}


export default NavButton