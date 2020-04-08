// frameworks
const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const routes = require("./routes");
var model = require('./models/index')
const morgan = require('morgan')

app.use(morgan('dev'))
app.use(express.json())
app.use("/api",routes)
port = 8000;
app.listen(port,()=> console.log("running on "+port))