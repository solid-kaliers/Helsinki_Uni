let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const express = require("express")
const cors = require("cors")
const app = express()

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static("dist"))


morgan.token("content", (req, res) => {
    return JSON.stringify(req.body)
})

app.get("/api/persons", (req, res) => {
    res.json(phonebook)
})

app.get("/api/info", (req,res) => {
    text = `<p>Phonebook has ${phonebook.length} entries</p>`
    let date = Date()
    date_string = `<p>${date.toString()}</p>`

    res.send(text + date_string)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    const entry = phonebook.find(el => el.id === id)
    if (entry) {
        res.json(entry)
    }
    else {
        res.statusCode = 404
        res.statusMessage = "id not found"
        res.end()
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(el => el.id !== id)
    res.statusCode = "204"
    res.end()
})

app.post("/api/persons", (req, res) => {
    const new_id = phonebook.length > 0 ? Math.max(...phonebook.map(el => el.id)) : 0
    console.log(req.body)
    if (!req.body.name || !req.body.number) {
        res.statusCode = 404
        return res.end()
    }

    if (phonebook.find(el => el.name === req.body.name)) {
        res.statusCode = 404
        res.statusMessage = "already there"
        return res.send({error: "not unique"})
    }

    new_entry = {
        id: Math.floor(Math.random()*1000),
        name: req.body.name,
        number: req.body.number
    }
    phonebook = phonebook.concat(new_entry)

    res.json(new_entry)
})

const no_route = (request, response) => {
    response.statusCode = 404
    response.statusMessage = "Seems you're lost, mate"
    response.send({error: 'get out of here'})
}

app.use(no_route)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))
