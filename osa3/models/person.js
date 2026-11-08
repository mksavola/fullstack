const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url, { family: 4 })

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

// skeeman määrittely ja validointi
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
        validator: function(v) {
            return /^\d{2,3}-\d+$/.test(v)
        },
        message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'User phone number required'],
    minlength: 8
  }
})

// id:n muokkaus oliosta merkkijonoksi
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// tietokannan luonti
const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)