import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // haetaan data palvelimelta
  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  },[])

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

  // nimen ja numeron lisäys ja numeron päivitys
  const addName = (event) => {
    event.preventDefault()
    const existingPerson= (persons.find(person => person.name === newName))
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...existingPerson, number: newNumber}

        personService.update(existingPerson.id, changedPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      }
      return
    }
    const nameObject={name: newName, number: newNumber}
    
    personService.create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log(returnedPerson)
    })
  }

  // nimen poisto
  const removeName=(id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id).then(setPersons(persons.filter(person => person.id !== id)))
    }
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
        <Persons personsToShow={personsToShow} removeName={removeName}/>
    </div>
  )
}

export default App