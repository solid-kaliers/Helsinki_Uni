const mongoose = require("mongoose")

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose
    .connect(url)
    .then(res => console.log("Connected to DB"))
    .catch(err => console.log("Error connection to DB:" + err.message))

const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

phoneBookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports  = mongoose.model("phonebook", phoneBookSchema)