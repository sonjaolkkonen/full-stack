import React from "react"

const Persons = ({ filteredPersons, deletePerson }) => {
    return (
        <div>
            {filteredPersons.map((person, index) => (
                <div key={index}>
                    {person.name} {person.number}
                    <button onClick={() => deletePerson(person.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default Persons