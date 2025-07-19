const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.static('dist'))
app.use(express.json())

const logger = (req, res, next) => {
    if(req.method === "POST") {
        let string = `${new Date()}\t${req.method}\t${JSON.stringify(req.headers)}\t${JSON.stringify(req.body)}\t`
        console.log(string);
    }
    next()
}

app.use(logger)
app.use(cors())

let notes = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]


const unknownEndPoint = (req, res) => {
    res.status(404).send({
        error : "unknown endpoint"
    })
}

app.get("/api/persons", (req, res) => {
    res.json(notes)
})

app.get("/info", (req, res)  => {
    res.send(`Phonebook has info for ${notes.length} people
        <br>${new Date()}`)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const data = notes.find(el => el.id === id)
    if (data) {
        res.json(data)
    }
    else {
        res.status(400).send("Requested data not found")
    }
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const data = notes.find(el => el.id === id)
    if (data) {
        notes = notes.filter(el => el.id !== id)
    }
    res.status(204).end()
})

app.put("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const data = notes.findIndex(el => el.id === String(id))
    if (data) {
        notes[data] = req.body
    }
    res.status(204).end()
})

app.post("/api/persons", (req, res) => {
    let data = req.body;
    if (!data.name) {
        return res.status(400).send("Name missing !");
    }
    else if (!data.number) {
        return res.status(400).send("Name missing !");
    }

    let searchForPerson = notes.find(el => (el.name === data.name) || (el.number === data.number));

    if (searchForPerson) {
        res.json({error: "name or number already in Phonebook"})
        return
    }

    const newId = notes.length > 0 ? Math.max(...notes.map(el => Number(el.id))) + 1 : 1;
    const newPerson = {
        ...data,
        id: String(newId)
    };

    notes.push(newPerson);
    res.json(newPerson);
});

app.use(unknownEndPoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log("Listening on " + PORT);
})