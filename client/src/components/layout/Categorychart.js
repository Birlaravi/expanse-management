import React from 'react'
import {Progress} from 'antd'
const Categorychart = ({expanseData}) => {
    const cat=['Food','Medical','Fees','Bills','Travel','Movies Ticket','others'];
    const total=expanseData.length;
  return (
   <div className="cat-con" style={{display:'flex',margin:'5px'}}>
     <div  style={{margin:'5px'}}>
        <h5 style={{color:'green'}}>Income</h5>
        {cat.map((item,index)=>{
           
              let cat= expanseData.filter((result)=>result.category===item && result.type==='Income').length;
              return (<> <span key={index}>{item}</span><Progress strokeColor='green' percent={parseInt((cat*100)/total)} style={{boxShadow:'0 0 15px black',padding:'1px 2px'}} /></>)
            
        })}
    </div>
    <div  style={{margin:'5px'}}>
        <h5 style={{color:'orangered'}}>Expense</h5>
        {cat.map((item)=>{
           
              let cat= expanseData.filter((result)=>result.category===item && result.type==='Expense').length;
              return (<> <span>{item}</span><Progress  strokeColor='orangered' percent={parseInt((cat*100)/total)} style={{boxShadow:'0 0 15px black',padding:'1px 2px'}} /></>)
            
        })}
    </div>
   </div>
  )
}

export default Categorychart