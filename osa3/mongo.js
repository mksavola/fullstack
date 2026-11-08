const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// henkilön etsintä
if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('Phonebook: ')
  result.forEach(person => {
    console.log(person.name, person.number)
  })
  mongoose.connection.close()
})
}

// henkilön tallennus
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })
  person.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})
}


