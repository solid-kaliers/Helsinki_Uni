const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const appRouter = require("./controller/router")
const logger = require("./utils/logger")
const errorHandler = require("./utils/errorHandler")
const unknownEndPoint = require("./utils/unknownEndPoint")
const mongoose = require("mongoose")

const app = express()

mongoose
    .connect(config.MONGODB_URI)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log("Error connection to DB:" + err.message))

app.use(express.static('dist'))
app.use(express.json())
app.use(logger)
app.use(cors())
app.use('/api/persons', appRouter)
app.use(unknownEndPoint)
app.use(errorHandler)

app.listen((config.PORT || 3001), () => {
    console.log("Listening on " + (config.PORT || 3001));
})