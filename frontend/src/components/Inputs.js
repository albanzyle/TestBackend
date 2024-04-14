
import React, {useEffect, useState} from "react";

const Inputs =({fetchData})=>{
    const [formData, setFormData] = useState({});

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await fetch('http://localhost:5000/submit', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            fetchData();
        }
        catch (error){
            console.error('Error:',error)
        }


    }

    const handleFormData = (e)=>{

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        console.log(formData);
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Test Backed Skills</h2>
            <input type='text' name='name' placeholder='Name' onChange={handleFormData}/>
            <input type='email' name='email' placeholder='Email@example.com' onChange={handleFormData}/>
            <button>Submit</button>
        </form>
    )
}


export default Inputs