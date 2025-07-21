const mongoose = require("mongoose")

if (process.argv.length < 3) {
    console.log("provide password");
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://kaliers:${password}@cluster0.drnaotf.mongodb.net/PhoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const PhoneBook = mongoose.model('phonebook', phoneBookSchema)

if (process.argv[3]) {
    const phoneBook = new PhoneBook({
        name: process.argv[3],
        number: process.argv[4]
        })

    phoneBook.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
    })
    return
}

PhoneBook
    .find({})
    .then(res => {
        res.forEach(el => console.log(el.name + " " + el.number))
        mongoose.connection.close()
    })