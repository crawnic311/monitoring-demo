const express = require('express')

const path = require('path')

const Rollbar = require('rollbar')

const app = express()
app.use(express.json())

let rollbar = new Rollbar({
    accessToken: '59e85d0baada4d618c3753a4a1ca5869',
    captureUncaught: true,
    captureUnhandledRejections: true
})



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.get('/api/style', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/style.css'))
})

let students = []

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

   const index = students.findIndex(studentName => studentName === name)

   if(index === -1 && name !== '') {
    students.push(name)
    rollbar.log('Student added successfully', {author: 'Dillon', type: 'Manual Entry'})
    res.status(200).send(students)
   } else if(name === '') {
       rollbar.error('No name given')
       res.status(400).send("must Provide a name")
   } else {
       rollbar.critical("Student already exists")
       res.status(400).send('That student already exists')
   }
})

app.use(rollbar.errorHandler())

const port = process.env.PORT ||4094

app.listen(port, () => console.log(`Unity ${port}!`))