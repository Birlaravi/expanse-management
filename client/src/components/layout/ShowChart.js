import React from "react";
import { Progress } from "antd";
import '../../page/css/showchart.css'
import Categorychart from "./Categorychart";
const ShowChart = ({ expanseData ,Type}) => {

    //total transaction
  const totalNoOfTransaction = expanseData.length;
  const totalNoofIncomeTransaction = expanseData.filter(
    (item) => item.type === "Income"
  ).length;
  const totalNoofExpanseTransaction = expanseData.filter(
    (item) => item.type === "Expense"
  ).length;

  const IncomePercent =
    parseInt((totalNoofIncomeTransaction * 100) / totalNoOfTransaction);
  const ExpensePercent =
  parseInt((totalNoofExpanseTransaction * 100) / totalNoOfTransaction);

  //total turnover
  const totalTurnover=expanseData.reduce((acc,curr)=>acc+curr.amount,0);
  const totalIncomeTurnover=expanseData.filter(
    (item) => item.type === "Income"
  ).reduce((acc,curr)=>acc+curr.amount,0);
  const totalExpanseTurnover= expanseData.filter(
    (item) => item.type === "Expense"
  ).reduce((acc,curr)=>acc+curr.amount,0);
  const IncomeTurnOverPercent=parseInt((totalIncomeTurnover*100)/totalTurnover);
  const ExpanseTurnOverPercent=parseInt((totalExpanseTurnover*100)/totalTurnover);

  return (
   
    <div className="dashboard-container">
  <div className='dashboard'>
       <div className="text-container">
        <h3>Transaction</h3>
       <h4 className="text-income">Income  :{totalNoofIncomeTransaction}</h4>     
       <h4 className="text-expanse">Expanse :{totalNoofExpanseTransaction}</h4>     
       </div>
      <div className="turnOver-conatiner">
      <div style={
        {
            margin:'10px'
        }
      }>
      <Progress
        type="circle"
        strokeColor='green'
        percent={IncomePercent}
        format={(percent) => `${percent} %`}
      />
      </div>
      <div style={
        {
            margin:'10px'
        }
      }>
        <Progress
        type="circle"
        strokeColor='red'
        percent={ExpensePercent}
        format={(percent) => `${percent} %`}
      /></div>
      </div>
    </div>

<div className='dashboard'>
<div className="text-container">
<h3>Turnover</h3>
<h4 className="text-income">Income  :{totalIncomeTurnover}</h4>     
<h4 className="text-expanse">Expanse :{totalExpanseTurnover}</h4>     
</div>
<div className="turnOver-conatiner"> 
<div style={
 {
     margin:'10px'
 }
}>
<Progress
 type="circle"
 strokeColor='green'
 percent={IncomeTurnOverPercent}
 format={(percent) => `${percent} %`}
/>
</div>

<div style={
 {
     margin:'10px'
 }
}>
 <Progress
 type="circle"
 strokeColor='red'
 percent={ExpanseTurnOverPercent}
 format={(percent) => `${percent} %`}
/></div>
</div>
 </div>

<div className="category">
<div className="text-container">
 <h3>Category Wise</h3>
</div>
<div className="catwise">
<Categorychart expanseData={expanseData} Type={Type}/>
</div>
 </div>
</div>

 
  );
};

export default ShowChart;
