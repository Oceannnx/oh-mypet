const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
const port = process.env.PORT

const { test } = require('./controller/test/test.js')
const { authMe } = require('./controller/Auth/Auth.js')
const { Signup } = require('./controller/Signup/Signup.js')
const { Login } = require('./controller/Login/Login.js')
const { newSellPost } = require('./controller/NewSellPost/NewSellPost.js')
const { fetchSellPost } = require('./controller/FetchSellPost/FetchSellPost.js')
const { sellPost } = require('./controller/SellPost/SellPost.js')
const { Logout } = require('./controller/Logout/Logout.js')
const { navAccount } = require('./controller/navAccount/navAccount.js')

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', test)
app.get('/api/user/me', authMe)
app.post('/api/user/logout', Logout)
app.post('/signup', Signup)
app.post('/login', Login)
app.post('/api/newsellpost', newSellPost)
app.get('/api/fetchsellpost', fetchSellPost)
app.get('/api/sellpost/:id', sellPost)
app.get('/api/navaccount', navAccount)
