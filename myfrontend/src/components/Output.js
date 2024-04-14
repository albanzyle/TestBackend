import React, { useState, useEffect } from "react";
import styles from '../styles/Form.module.css'


const Outputs =({ fetchData, outputData })=>{


    const handleDelete =async (itemId) =>{
        try{

            const response = await fetch(`http://localhost:5000/delete/${itemId}`,{
                method: 'DELETE',
            })

            const data = await response.json();
            console.log(data);
            fetchData();
        }
        catch (error){
            console.error("Error:", error)
        }
    }

    const handleEdit = async  (id, name, email) =>{

        // Prompt the user to make edits
        const newName = prompt("Enter the new name:", name);
        const newEmail = prompt("Enter the new email:", email);

        // If the user cancels or provides empty input, do not proceed with the edit
        if (!newName || !newEmail) {
            return;
        }

        // Construct the updated data object
        const updatedData = { id, name: newName, email: newEmail };
        try{
            const reponse = await fetch(`http://localhost:5000/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)

            })

            const data = await reponse.json()
            console.log(data);
            fetchData();
        }
        catch(error){
            console.error('Error:', error)
        }
    }

    return(
        <div className={styles.outputContainer}>
            <h2>Output:</h2>
            <ul className={styles.outputList}>
                {outputData.map((item, index) => (
                    <li key={index} className={styles.outputItem}>
                        {item.name} - {item.email}
                        <button onClick={() => handleDelete(item.id)}>DEL</button>
                        <button onClick={() => handleEdit(item.id, item.name, item.email)}>EDIT</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Outputs;