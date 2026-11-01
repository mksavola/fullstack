const express = require('express')
const app = express()

app.use(express.json())

let numbers = [
    {
      "id": "1",
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": "2",
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": "3",
      "name": "Dan Abramov",
      "number": "12-43-234345",
    },
    {
      "id": "4",
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    },
    {
      "id": "5",
      "name": "Aku Ankka",
      "number": "123-456"
    }
]

// Puhelinluettelon haku
app.get('/api/persons', (request, response) => {
  response.json(numbers)
})

// Puhelinluettelon koko ja päivämäärä
app.get('/info', (request, response) => {
  const size = numbers.length
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${size} people</p>
    <p>${date}</p>
  `)
})

// Yksittäisen numeron haku
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = numbers.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

// Numeron poisto
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  numbers = numbers.filter(person => person.id !== id)

  response.status(204).end()
})

// id:n generointi
const generateId = () => {
    return String(Math.floor(Math.random() * 10000))
}

// Numeron lisäys
app.post('/api/persons', (request, response) => {
  const body = request.body

  // virheen käsittely nimen ja numeron puuttumiselle
  if (!body.name || !body.number) {
    return response.status(400).json({
        error: 'name or number is missing'
    })
  }

  // virheen käsittely luettelosta löytyvälle nimelle
  if (numbers.find(person => person.name === body.name)) {
    return response.status(400).json({
        error: 'name must be unique'
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  numbers = numbers.concat(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

