const express = require("express");
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(error => console.log(error));

const user = require('./routes/user');

app.use('/api/v1/user', user);

app.listen(PORT, () => {
    console.log(`server is up on PORT:${PORT}`);
})