const cors = require('cors')
const express = require('express')
const bcrypt = require('bcryptjs')
const knex = require('knex')
const login = require('./controllers/login')
const register = require('./controllers/register')
const image = require('./controllers/image')
const app = express()

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  }
})

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.json('hello from server')
})

app.post('/login', (req, res) => login.handleLogin(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/image', (req, res) => image.handleImageDetect(req, res, db))

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`)
})