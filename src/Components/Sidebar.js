import React, { useEffect } from 'react';
import {useNavigate} from "react-router-dom";

function Sidebar() {
const navigate=useNavigate();

let empID=sessionStorage.getItem("EmployeeID");



useEffect(()=>{
  // console.log(window.location.pathname);
  if(window.location.pathname==="/"){
    let doc=document.getElementById("Documents");
  
    doc.style.backgroundColor="#304480";
    doc.style.color="white";
    // console.log(doc);
  }
  else if(window.location.pathname===`https://bombaymetrics-8c830.web.app/?EmployeeId=${empID}`){
    let doc=document.getElementById("Home");
  
    doc.style.backgroundColor="#304480";
    doc.style.color="white";
  }
  else{
    console.log("something");
  }
})
  
  return (
   <>
    <div className="sbar p-3">
      <div className="text-center">
        <div className="card mt-3 menucrd" id='Home' onClick={()=>{
              window.location.replace(`https://bombaymetrics-8c830.web.app/?EmployeeId=${empID}`)

          // navigate(`/https://bombaymetrics-8c830.web.app/?EmployeeId=${empID}`)
        }}>
            <p className='p-3 menuName'>Home</p>
        </div>
        <div className="card mt-3 menucrd" id='Dashboard'>
            <p className='p-3 menuName'>Dashboard</p>
        </div>
        <div className="card mt-3 menucrd" id='Documents'>
            <p className='p-3 menuName' onClick={()=>{
              window.location.replace(`https://bombaymetrics-8c830.web.app/?EmployeeId=${empID}`)
              // navigate(`/`)
            }}>Documents</p>
        </div>
       
      </div>
   </div>
   </>
  )
}

export default Sidebar