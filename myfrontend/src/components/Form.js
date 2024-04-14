import React, { useEffect, useState } from 'react';
import styles from '../styles/Form.module.css';
import Inputs from './Inputs';
import Outputs from './Output';
const Form =()=>{
    const [outputData, setOutputData] = useState([]);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/getData');
            const data = await response.json();
            setOutputData(data);
        } catch (error) {
            console.error("Error:", error)
        }
    }

    return (
        <>
        <Inputs fetchData={fetchData} outputData={outputData}/>
        <Outputs fetchData={fetchData} outputData={outputData}/>
        </>
    );
}


export default Form;