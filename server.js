const express = require('express')

const path = require('path')
const Rollbar = require('rollbar')

let rollbar = new Rollbar({
    accessToken: '59e85d0baada4d618c3753a4a1ca5869',
    captureUncaught: true,
    captureUnhandledRejections: true
})

const app = express()


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

const port = process.env.PORT ||4094

app.listen(port, () => console.log(`Unity ${port}!`))