import React, { useState, Fragment } from 'react';


function HeaderComps({name, sendMsgToParent}){
    
    const [childData, setChildData] = useState("");

    const handleChange = (event) => {
        setChildData(event.target.value)
    }
    const handleSubmit = () => {
        sendMsgToParent(childData);
    }

    //var childData = "some data";
    return (
        <>
            <input 
                type='text'
                value={childData} 
                onChange={handleChange}
                placeholder='Enter your message'
            />
            <button onClick={handleSubmit}> Send to parent </button>
            <h1> Welcome to  {name} App  {childData} </h1>
        </>
    )
}

export default HeaderComps;