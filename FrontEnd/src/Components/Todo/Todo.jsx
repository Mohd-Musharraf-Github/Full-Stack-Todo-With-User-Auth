import React, { useEffect, useState } from "react";
import "./Todo.css";
import TodoCard from "./TodoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TodoUpdate from "./TodoUpdate";
import axios from "axios";


export default function Todo() {
  
  const [globalArray,setGlobalArray] = useState([]);
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const [array, setarray] = useState([]);
  let id = sessionStorage.getItem("id");

  const onchange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const submit = async () => {
    console.log(inputs);
    if (inputs.title === "") {
      toast.error("Title can not be empty");
      return;
    } else{ 
            if (id) {
            await axios
            .post(`${window.location.origin}/api/v2/addtask`, {
               title: inputs.title,
              body: inputs.body,
              id: id,
               })
              .then((response) => console.log(response));
              setInputs({ title: "", body: "" });
              toast.success("Task Added");
                }
                else{setarray([...array, inputs]);
                setInputs({ title: "", body: "" });
                toast.success("Task Added");
                toast.error("Task not Saved Please Log In")
              }
      
    }
  };

  const del = async (cardid) => {
    if(id){
      await axios.delete(`${window.location.origin}/api/v2/delete/${cardid}`,
      {data:{id:id}})
      .then(toast.success("Task has been Deleted")
      )
    }
    else{
      toast.error("Please Sign Up FIrst")
    }
    
    
    // array.splice(id, 1);
    // setarray([...array]);
  };

  useEffect(()=>{
    if(id){
      const fetch = async ()=>{
      await axios.get(`${window.location.origin}/api/v2/gettask/${id}`)
      .then((response)=>
        setarray(response.data.list)
      )
      }
      fetch();
    }
    
  },[submit])

  
  

  const display = (element) => {
    console.log(element);
    document.getElementById("todo-update").style.display = "block";
    setGlobalArray(array[element])
    // globalArray = array[element];
    // console.log(globalArray);
    
  };
  
  function handleOnTitleClick() {
    console.log("clicked");
    
    document.getElementById("text-area").style.display = "block";
  }
  // console.log(array);

  

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main-container d-flex justify-content-center align-items-center my-4">
          <div className="d-flex flex-column w-50 p-2 todo-box">
            <input
              onClick={() => handleOnTitleClick()}
              type="text"
              name="title"
              placeholder="Enter Title...."
              onChange={onchange}
              value={inputs.title}
              className="my-2 p-2 todo-inputs"
            />
            <textarea
              type="text"
              name="body"
              placeholder="Enter Body...."
              onChange={onchange}
              value={inputs.body}
              className="p-2 todo-inputs text"
              id="text-area"
            />
          </div>
          <div className="d-flex flex-column p-2">
            <button className="Submit-button" onClick={submit}>
              Submit
            </button>
          </div>
        </div>
        <div className="todo-body">
          <div className="todo-container">
            <div className="row">
              {array && array.length > 0
                ? array.map((items, index) => (
                    <div
                      key={index}
                      className="col-lg-3 col-10 mx-5 my-2 bg-sucess"
                    >
                      <TodoCard
                        body={items.body}
                        title={items.title}
                        id={items._id}
                        delid={del}
                        updateId={display}
                        index={index}
                        
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
      <div id="todo-update">
        <div className="container update-box"></div>
        <TodoUpdate updateContent={globalArray} />
      </div>
    </>
  );
}
