const express = require('express')
const app = express()
const port = 8000
const db = require('./config/db')
const cors = require('cors')

app.use(express.urlencoded({extended : true}))
app.use(cors())
app.use(express.json());
app.use('/',require('./routes/index'))

app.listen(port,(err) => {
    (err) ? console.log(err) && false : console.log('Server Strated...'+ port)
})