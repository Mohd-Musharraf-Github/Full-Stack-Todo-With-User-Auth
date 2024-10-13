import React from "react";

export default function SignComponent({first,second}){

    return(
        <h1 className="heading-sign">
              {first}<br />
              {second}
            </h1>
    )
}