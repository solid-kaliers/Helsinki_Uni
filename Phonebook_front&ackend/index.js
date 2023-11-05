const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(express.static("dist"))
app.use(cors())

let phonebook = [
      {
        "name": "zak",
        "number": "09667945676",
        "id": 1
      },
      {
        "name": "im",
        "number": "07343546345",
        "id": 2
      }
    ]

app.get("/persons", (req, res) =>{
    res.json(phonebook)
})

app.get("/persons/:id", (req, res) => {
    id = Number(req.params.id)
    const entry = phonebook.find(el => el.id === id)
    res.json(entry)
})

app.post("/persons", (req, res) => {
    const new_id = phonebook.length > 0 ? Math.max(...phonebook.map(el => el.id)) : 0
    console.log(req.body)
    const new_entry = {
        name: req.body.name,
        number: req.body.number,
        id: new_id + 1
    }
    phonebook = phonebook.concat(new_entry)

    res.statusCode = 201
    res.json(new_entry)
})

app.delete("/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(el => el.id !== id)
    
    res.statusCode = 204
    res.end()
})

app.put(("/persons/:id"), (req, res) => {
    const id = Number(req.params.id)
    entry_index = phonebook.map(el => el.id).indexOf(id)
    phonebook[entry_index]["name"] = req.body.name
    phonebook[entry_index]["number"] = req.body.number
    
    res.json(phonebook[entry_index])
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`listening on ${PORT}`))