const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))
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


app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = phonebook.find(el => el.id === Number(id))
    if (!person) {
        res.status(404).json({error: 'person doesn\'t exist'})
    }
    else {
        res.json(person)
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    phonebook = phonebook.filter(el => el.id !== Number(id))
})

app.use(express.json())
app.post('/api/persons/', (req, res) => {
    if (!req.body.name || !req.body.number) {
        return(
            res.status(400).json({error: 'missing data in payload'})
        )
    }
    else if (phonebook.find(el => el.name === req.body.name)) {
        return(
            res.status(400).json({error: 'person exists in phonebook'})
        )
    }
    else{
        const person = {
            id: Math.random()* 123456789,
            name: req.body.name,
            number: req.body.number
        }
        phonebook.push(person)
        res.status(200).json(person)
    }
})

app.put('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(el => el.id === id)
    if (!person) {
        return(
            res.status(404).json({"error" : "person doesn't exist in phonebook"})
        )
    }
    else {
        person.name = req.body.name || person.name
        person.number = req.body.number || person.number
        res.status(200).json(person)
    }
})

app.use((req, res) => res.status(404).json({error: 'link not available'}))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))