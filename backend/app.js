const express = require("express");
const cors = require("cors")
const app = express();
require("dotenv").config();
require("./conn/conn");
const port = process.env.PORT || 5000;

const user = require("./router/user");
const books = require("./router/books");
const faverate = require("./router/faverateBook")
const cart = require("./router/cart")
const order = require("./router/order")
const paymentRoute = require('./router/payment');
app.use('/api/payment', paymentRoute);


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

app.use("/api/v1", user);
app.use("/api/v2", books);
app.use("/api/v3", faverate);
app.use("/api/v4", cart);
app.use("/api/v5", order);


//creating the port
app.listen(port, () => {
    console.log(`server is listen in port ${port}`);
})