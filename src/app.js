const express = require("express");
const path = require('path');
const app = express();
const mainRouter = require("./routers/main-router");
const productsRouter = require("./routers/products")
const usersRouter = require("./routers/users");
const methodOverride = require('method-override');



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));
app.listen(3000, () => {
    console.log("El servidor de prendio en el puerto:3000");
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/", mainRouter);


