require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const PhoneBook = require("./models/phonebook")

const logger = (req, res, next) => {
    if(req.method === "POST") {
        let string = `${new Date()}\t${req.method}\t${JSON.stringify(req.headers)}\t${JSON.stringify(req.body)}\t`
        console.log(string);
    }
    next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(logger)
app.use(cors())

const unknownEndPoint = (req, res) => {
    res.status(404).send({
        error : "unknown endpoint"
    })
}

app.get("/api/persons", (req, res, next) => {
    PhoneBook
        .find({})
        .then(data => res.json(data))
        .catch(error => next(error))
})

app.get("/info", (req, res)  => {
    res.send(`Phonebook has info for ${PhoneBook.length} people
        <br>${new Date()}`)
})

app.get("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    PhoneBook
        .find({_id: id})
        .then(data => {
            console.log(data)
            if (data) {
                res.json(data)
            }
            else {
                res.status(400).send("Requested data not found")
            }
        })
        .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    PhoneBook
        .deleteOne({_id: id})
        .then(data => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put("/api/persons/:id", (req, res, next) => {
    const id = req.params.id
    const { name, number } = req.body

    PhoneBook.findByIdAndUpdate(
        id,
        { name, number },
        { new: true, runValidators: true, context: 'query' }
    )
    .then(updatedPerson => {
        if (!updatedPerson) {
            return res.status(404).end()
        }
        res.json(updatedPerson)
    })
    .catch(err => next(err))
})

app.post("/api/persons", (req, res, next) => {
    let data = req.body;
    /*if (!data.name) {
        return res.status(400).send("Name missing !");
    }
    else if (!data.number) {
        return res.status(400).send("Number missing !");
    }*/


    PhoneBook
        .find({$or: [{name: data.name}, {number: data.number}]})
        .then(queryResult => {
            console.log(queryResult)
            if (queryResult.length > 0) {
                res.status(400).json({error: "name or number already in Phonebook"})
                return
            }
            const newPerson = new PhoneBook({
                ...data
            })
            newPerson
                .save()
                .then(savedData => res.json(savedData))
                .catch(error => next(error))
        })
        .catch(err => next(err))
});

app.use(unknownEndPoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  if (error.name = "ValidationError") {
    return response.status(400).send({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Listening on " + PORT);
})