import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [notification, setNotification] = useState(null)

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


  const addName = (event) => {
    event.preventDefault()
    const existingPerson= (persons.find(person => person.name === newName))
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const changedPerson = {...existingPerson, number: newNumber}

        // numeron päivitys
        personService.update(existingPerson.id, changedPerson)
        .then(returnedPerson => {
          setNotification({message: `Updated ${returnedPerson.name}`, type:'success'})
          setTimeout(() => {setNotification(null)}, 5000)
          setPersons(persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          if (error.response.data && error.response.data.error) {
            setNotification({ message: error.response.data.error, type: 'error' })
          } else {  
            setNotification({ message: `Information of ${existingPerson.name} has already been removed from server`, type: 'error' })
            setPersons(persons.filter(p => p.id !== existingPerson.id))
          }
          setTimeout(() => { setNotification(null) }, 5000)
        })
      }
      return
    }
    const nameObject={name: newName, number: newNumber}
    
    //numeron lisäys
    personService.create(nameObject)
      .then(returnedPerson => {
        setNotification({message: `Added ${returnedPerson.name}`, type:'success'})
        setTimeout(() => {setNotification(null)}, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log(returnedPerson)
    })
    .catch(error => {
      setNotification({message: error.response.data.error, type: 'error'})
      setTimeout(() => {setNotification(null)}, 5000)
      console.log(error.response.data)
    })
  }

  // numeron poisto
  const removeName=(id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService.remove(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setNotification({message: `Deleted ${personToDelete.name}`, type: 'success'})
        setTimeout(() => {setNotification(null)}, 5000)
      })
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
      <Notification notification={notification} />
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