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
    host: '127.0.0.1',
    user: 'postgres',
    password: '1234',
    database: 'smart-brain'
  }
})

app.use(express.json())
app.use(cors())


app.post('/login', (req, res) => login.handleLogin(req, res, db, bcrypt))

app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))

app.put('/image', (req, res) => image.handleImageDetect(req, res, db))

app.listen(5000)