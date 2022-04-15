const express = require("express");
const path = require('path');
const app = express();
const mainRouter = require("./routers/main-router");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, "../public")));
app.listen(3000, () => {
    console.log("El servidor de prendio en el puerto:3000");
});

app.use(mainRouter);