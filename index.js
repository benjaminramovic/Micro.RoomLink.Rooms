const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())

const server = http.createServer(app)


server.listen(8000, () => {
    console.log('Server is running on port 8000')
})

app.get('/', (req, res) => {    
    res.send('Hello Benjamin!!!')
})