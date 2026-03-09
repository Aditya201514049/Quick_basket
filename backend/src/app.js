// create the server here

const express = require('express');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const app = express();

app.use(express.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get("/", (req, res)=>{
    res.send("Hello World");
})

module.exports = app;