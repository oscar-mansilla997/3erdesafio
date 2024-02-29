
const { json } = require('body-parser');
const express = require('express')
const fs = require('fs').promises;



const app = express()

const productos = ('./assets/productos.json')

app.get('/products', async (req, res) => {
    let contenido = await fs.readFile('./assets/productos.json', 'utf-8');
    let productos = JSON.parse(contenido);


    let limit = req.query.limit ? parseInt(req.query.limit) : productos.length;
    res.json(productos.slice(0, limit));

    
})






app.listen(8080, ()=>{
    console.log('server listo');
})