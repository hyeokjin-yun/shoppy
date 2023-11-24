import React from "react";
import { useState } from "react";

export default function Quantity(props){
  let pnumber;
  (props.qty === undefined) ? pnumber = 1 : pnumber = props.qty;
  let [number, setNumber] = useState(pnumber);

  function quantityCheck(checkFlag, e){
    let qtyCheckFlag = false;
    if(checkFlag === "minus") { 
      // number >1 ? setNumber(--number) : alert("최소 수량은 1개 입니다."); 
      if(number > 1){
        setNumber(--number);
        qtyCheckFlag = true;
      }else{
        alert("최소 수량은 1개 입니다.")
      }
    }else{
      // number <10 ? setNumber(++number) : alert("최대 수량은 10개 입니다.");
      if(number < 10){
        setNumber(++number);
        qtyCheckFlag = true;
      }else{
        alert("최대 수량은 10개 입니다.")
      }
    }
    props.getQty({qty:number,price:props.price,flag:checkFlag, 
      qtyFlag:qtyCheckFlag, cid:props.cid});   
  }

  let style = {width: "20px", display:"inline-block"}
  let style_minus = {width: "30px", display:"inline-block", backgroundColor:"lightGray", cursor:"pointer"}
  let style_plus = {width: "30px", display:"inline-block", backgroundColor:"lightGray", cursor:"pointer"}
  let p_style = { margin:"20px 0 20px 0 "}
  let div_style = { border:"1px solid red", overflow:"hidden", width: "50%"}

  return(
    // <div style={div_style}>
    <p style={p_style}>      
      <span style={style_minus} onClick={() => {quantityCheck("minus")}}> - </span>
      <span style={style}>{number}</span>
      <span style={style_plus} onClick={() => {quantityCheck("plus")}}> + </span>
    </p>
    // </div>
  );
}