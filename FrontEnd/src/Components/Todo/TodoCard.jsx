import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { GrUpdate } from "react-icons/gr";

export default function TodoCard({ title, body , id , delid ,updateId,index}) {
  
  
  return (
    <div className="todo-card p-3">
      <div>
        <h3>{title}</h3>
        <p className="todo-card-paragraph">{body.split("", 67)}...</p>
      </div>
      <div className="d-flex justify-content-around">
        <div onClick={()=>updateId(index)} className="d-flex align-items-center justify-content-center p-2 todo-card-icons">
          <GrUpdate size={30} />Update
        </div>
        <div onClick={()=>delid(id)
        } className= "d-flex align-items-center justify-content-center p-2 todo-card-icons">
          <RiDeleteBin5Fill size={30} />Delete
        </div>
      </div>
    </div>
  );
}
