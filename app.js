const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.listen(3000, () => {
    console.log("El servidor de prendio en el puerto:3000");
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "views/index.html"))
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "views/register.html"))
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "views/login.html"))
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, "views/productDetail.html"))
});
app.get('/productCar', (req, res) => {
    res.sendFile(path.join(__dirname, "views/productCar.html"))
});

app.get("/demo", (req, res) => {
  res.sendFile(path.join(__dirname, "views/demo.html"));
});



