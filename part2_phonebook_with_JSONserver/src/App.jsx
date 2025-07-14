import { useState, useEffect, use } from 'react'
import Display from './Display'
import Header from "./Header"
import Filter from "./Filter"
import Form from './Form'
import dbService from './dbService'

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    dbService
      .getAllContacts()
      .then(res => {
        setPersons(res)})
  }, [])
    

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFitler, setNewFilter] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    if (persons.find(el => el.name === newName)) {
      let contact = persons.find(el => el.name === newName)
      let index = persons.findIndex(el => el.name === newName)
      let temp = [...persons]
      temp[index] = {...contact, number: newNumber}
      dbService
        .changeContact(contact.id, {...contact, number: newNumber})
        .then(res => setPersons(temp))
      return
    }

    let newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length === 0
        ? "1"
        : String(parseInt(persons[persons.length - 1].id) + 1)
    }

    dbService
      .createContact(newPerson)
      .then(res => {
        setPersons(persons.concat(newPerson))})
  } 

  const nameChangeHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberChangeHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const filterChangeHandler = (event) => {
    setNewFilter(event.target.value)
  }

  const deleteHandler = (id) => {
    console.log("test" + id)
    dbService
      .deleteContact(id)
      .then(res => setPersons(persons.filter(el => el.id !== id)))
  }

  return (
    <div>
      <Header data={"Phonebook"}/>
      <Filter data={newFitler} changeHandler={filterChangeHandler}/>
      <Header data={"Add a new contact"}/>
      <Form submitHandler={submitHandler} 
          newName={newName}
          nameChangeHandler={nameChangeHandler}
          newNumber={newNumber}
          numberChangeHandler={numberChangeHandler}/>
      <Header data={"Numbers"}/>
      <Display value={persons} filterName={newFitler} deleteHandler={deleteHandler} />
    </div>
  )
}

export default App