import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // muutetaan nimi
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // muutetaan numero
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // muutetaan haku
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // nimen ja numeron lisäys ja duplikaatin tarkistus
  const addName = (event) => {
    event.preventDefault()
    const isDuplicate= (persons.some(person => person.name === newName))
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const nameObject={name: newName, number: newNumber}
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  // nimen haku
  const personsToShow = persons.filter(person => {
    const nameLower = person.name.toLowerCase()
    const searcLower = searchQuery.toLowerCase()
    return nameLower.includes(searcLower)
  })

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter handleSearchChange={handleSearchChange}
          searchQuery={searchQuery} />
      <h2>Add a new</h2>
        <PersonForm addName={addName}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          newName={newName}
          newNumber={newNumber} />
      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App