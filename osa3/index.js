require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

// middleware määrittelyt
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// morgan-tokenin määrittely POST-pyynnön näyttämiseen
morgan.token('body', request => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)

  }
  else {
    return ('')
  }
})

// morgan-lokituksen määrittely
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Puhelinluettelon haku
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(numbers => {
    response.json(numbers)
  })
    .catch(error => next(error))
})

// Puhelinluettelon koko ja päivämäärä
app.get('/info', (request, response, next) => {
  Person.find({}).then(numbers => {
    const size = numbers.length
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${size} people</p>
        <p>${date}</p>
      `)
  })
    .catch(error => next(error))
})

// Yksittäisen numeron haku
app.get('/api/persons/:id', (request, response,next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// Numeron poisto
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


// Numeron lisäys
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // virheen käsittely nimen ja numeron puuttumiselle
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  // uuden olion luonti
  const person = new Person({
    name: body.name,
    number: body.number
  })

  // olion tallennus tietokantaan ja tuloksen palautus selaimelle
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

// henkilön päivitys
app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body

  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// olemattomien osoitteiden käsittely
app.use(unknownEndpoint)

// virheidenkäsittely
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

