const Persons = ({personsToShow, removeName}) => {
  return (
    <>
      {personsToShow.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => removeName(person.id)}>delete</button>
        </p>
      )}
    </>
  )
}

export default Persons