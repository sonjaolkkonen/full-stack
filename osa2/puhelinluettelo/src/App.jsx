import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
 

  const addNewPerson = (event) => {
    event.preventDefault()
    const personFound = persons.find(person => person.name === newName)
    if (personFound) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...personFound, number: newNumber }
        personService
          .update(updatedPerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : returnedPerson))
            setErrorMessage(false)
            setMessage(
              `Updated ${newName}'s number`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(true)
            setMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
      setNewName('')
      setNewNumber('')
    }
    else {
    const nameObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setErrorMessage(false)
        setMessage(`Added ${newName}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id))
        setErrorMessage(false)
        setMessage(`Deleted ${personToDelete.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        alert(`Person could not be deleted`)
      })
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
  person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage}/>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <h2>add a new</h2>
        <PersonForm 
          newName={newName}
          newNumber={newNumber}
          handleNewName={handleNewName}
          handleNewNumber={handleNewNumber}
          addNewPerson={addNewPerson}
        />
      <h2>Numbers</h2>
        <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )

}

export default App