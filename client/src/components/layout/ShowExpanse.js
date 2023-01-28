import React from "react";
import moment from 'moment'
import {DeleteFilled,EditFilled} from '@ant-design/icons';
const ShowExpanse = ({ expanseData,onEdit,onDelete }) => {
  // console.log(expanseData)
  return (
    <div style={{margin:'20px',boxShadow:'1px 1px 5px gray',padding:'10px 20px',background:'#c9bcbc',fontFamily: 'Rowdies', fontStyle:'cursive'}}>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Type</th>
            <th scope="col">Category</th>
            <th scope="col">Reference</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {expanseData.map((item) => (
            <tr key={item._id}>
              <td>{moment(item.date).format('DD-MM-YYYY')}</td>
              <td>{item.amount}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.reference}</td>
              <td>{<div style={{display:'flex',justifyContent:'space-evenly'}}>
                <span ><DeleteFilled onClick={()=>onDelete(item._id)}
                style={{cursor:'pointer'}}/></span><span ><EditFilled onClick={()=>onEdit(item)} style={{cursor:'pointer'}}/></span>
                </div>}</td>
            </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowExpanse;
