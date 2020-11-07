const express = require('express')

const app = express();

app.get('/', (req, res) => {
    console.log(req.url)
})

app.listen(3000, () => {
    console.log('Started')
})