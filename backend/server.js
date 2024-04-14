const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'Albanzyle2022!',
    port: 5432,
    database: 'testbackend',
})

app.post('/submit', async (req, res) => {

    try{
        const {name, email} =  req.body;
        if(!name || !email){
            return res.status(400).json({message: "Uncorrect email or name"})
        }

        const query = 'INSERT INTO form_data (name , email) VALUES ($1 , $2)';
        await pool.query(query, [name, email])
        console.log("This are the data submited", name, email)
        res.status(200).json({message: "Data successfully inserted"})
    }
    catch (error){
        res.status(500).json("Internal Error")
        console.error("Error", error)
    }

});

app.get('/getData', async (req, res) =>{
    try{

        const query = 'SELECT * FROM form_data'
        const response = await pool.query(query);
        const data =  response.rows
        res.json(data)
    }
    catch (error){
        console.error("Internal service error". error);
        res.status(500).json({message: "Internal service error". error})
    }
})

app.delete('/delete/:id', async (req, res)=>{
    try{
        const id = req.params.id
        const query = 'DELETE FROM form_data WHERE id = $1';
        const response = await pool.query(query, [id]);
        res.status(200).json({message: 'Deleted successfully'})
    }
    catch (error){
        console.error("Internal service error". error);
        res.status(500).json({message: "Internal service error". error})
    }
})

app.put('/update/:id', async (req, res) =>{
    const { id } = req.params;

    const {name, email} = req.body;
    
    try{
        const selectQuery = 'SELECT * FROM form_data WHERE id = $1'
        const response = await pool.query(selectQuery, [id]);
        if( response.rowCount == 0){
            return res.status(400).json({message:'Item not found'})
        } 

        const updateQuery = 'UPDATE form_data SET name = $1 , email = $2 WHERE id = $3';
        await pool.query(updateQuery, [name, email, id]);
        res.json({message: 'Item updated successfully'});

    } catch(error){
        console.error("Internal service error". error);
        res.status(500).json({message: "Internal service error". error})
    }
})

app.listen(5000, ()=>{
    console.log('Server running in port 5000')
})