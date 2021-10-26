const express = require('express')

const path = require('path')

const app = express()


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

const port = process.env.PORT ||4094

app.listen(PORT, () => console.log(`Unity ${port}!`))