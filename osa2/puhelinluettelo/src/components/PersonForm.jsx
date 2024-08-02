import React from "react"

const PersonForm = ({ addNewPerson, newName, newNumber, handleNewName, handleNewNumber }) => {
    return (
        <form onSubmit={addNewPerson}>
            <div>name: <input value={newName} onChange={handleNewName} /></div>
            <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    )
}

export default PersonForm