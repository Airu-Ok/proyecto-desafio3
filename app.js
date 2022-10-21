const express = require('express');
const app = express();
//clase contenedor
const contenedor = require('./contenedor');
const productos = new contenedor('./productos.txt');
//puero 8080
const PORT = 8080;

app.get('/', (req, res)=>{
    res.send('Hola Mundo!');
});
//ruta productos
app.get('/productos', (req, res)=>{
    productos.getAll()
    .then((data)=> res.send(data))
    .catch((err)=>{
        console.log('Error:', err);
    });
});
//ruta productoRandom
app.get('/productoRandom', (req, res)=>{
    productos.getAll()
    .then((data)=>{
        const productRandom = Math.floor(Math.random()*data.length);
        res.send(data[productRandom]);
    })
    .catch((err)=>{
        console.log('Error:', err);
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});