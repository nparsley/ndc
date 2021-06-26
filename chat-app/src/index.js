const express = require('express')
const app = express()
const port = process.env.port || 3000
const path = require ('path')
const publicDiretoryPath = path.join(__dirname, '../public')


app.use(express.static(publicDiretoryPath))


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

