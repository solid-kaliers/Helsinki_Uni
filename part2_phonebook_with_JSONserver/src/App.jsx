import { useState } from 'react'
import Display from './Display'
import Header from "./Header"
import Filter from "./Filter"
import Form from './Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFitler, setNewFilter] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    if (persons.find(el => el.name === newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons(persons.concat({
      name: newName,
      number: newNumber,
      id: persons[persons.length - 1].id + 1
    }))
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
      <Display value={persons} filterName={newFitler} />
    </div>
  )
}

export default App