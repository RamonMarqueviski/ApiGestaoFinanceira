const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');

app.use(bodyParser.json());

const roteador = require('./routes/pessoas')
app.use('/api/pessoas',roteador)

app.listen(3000, ()=>{
    console.log('A API ESTÁ FUNCIONANDO NA PORTA: ' + 3000);
})

module.exports = app;