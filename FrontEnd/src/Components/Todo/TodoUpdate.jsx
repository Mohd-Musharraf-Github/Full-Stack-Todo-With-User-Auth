import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";

export default function TodoUpdate({ updateContent }) {
  useEffect(() => {
    setInputs({
      title: updateContent.title,
      body: updateContent.body,
    });
  }, [updateContent]);

  const [inputs, setInputs] = useState({
    title: "",
    body: "",
  });

  const change = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async () => {
    console.log(inputs);
    await axios.put(
      `http://localhost:1000/api/v2/updatetask/${updateContent._id}`,inputs
    ).then(toast.success("Your Task Updated")
    )
    updateCancel();
  };

  const updateCancel = () => {
    document.getElementById("todo-update").style.display = "none";
  };

  return (
    <div className="Todo-Update-card">
      <div className="d-flex">
        <h2 className="p-2 m-2 ">Update Your Task...</h2>
        <button onClick={updateCancel} className="cancle-btn">
          <MdCancel size={40} />
        </button>
      </div>

      <input
        className="p-2 m-2 w-75 update-inside-items"
        type="text"
        name="title"
        // value={inputs.title}
        value={inputs.title}
        onChange={change}
      />
      <textarea
        className="p-2 m-2 w-75 h-50 update-inside-items"
        name="body"
        value={inputs.body}
        onChange={change}
      />
      <button
        onClick={submit}
        className="p-2 m-2 w-75 update-inside-items update-btn"
      >
        Update
      </button>
    </div>
  );
}
