const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000
const url = process.env.DB_URL
app.use(express.json())
app.use(cors())

const client = new MongoClient(url)

app.listen(port, () => {
  console.log(`This server running on http:localhost:${port}`)
})

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = {
      username,
      password,
    }
    await client.db('oh-mypet').collection('user').insertOne(user)

    res.status(201).send({
      message: 'Sign Up Success',
      success: true,
    })
  } catch (error) {
    res.status(500).send({ success: false })
  }
})

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = {
      username,
      password,
    }
    const result = await client.db('oh-mypet').collection('user').find(user)

    console.log(result)

    res.status(200)
  } catch (error) {
    console.log(error)
  }
})
