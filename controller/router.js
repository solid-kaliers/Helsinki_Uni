const appRouter = require("express").Router()
const PhoneBook = require("../models/phonebook")

appRouter.get("/", (req, res, next) => {
    PhoneBook
        .find({})
        .then(data => res.json(data))
        .catch(error => next(error))
})

appRouter.get("/info", (req, res)  => {
    res.send(`Phonebook has info for ${PhoneBook.length} people
        <br>${new Date()}`)
})

appRouter.get("/:id", (req, res, next) => {
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

appRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id
    PhoneBook
        .deleteOne({_id: id})
        .then(data => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

appRouter.put("/:id", (req, res, next) => {
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

appRouter.post("/", (req, res, next) => {
    let data = req.body;

    PhoneBook
        .find({$or: [{name: data.name}, {number: data.number}]})
        .then(queryResult => {
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

module.exports = appRouter