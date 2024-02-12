const express = require('express');
require('dotenv').config()
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    access(req.hostname);
    res.send("API");
})

app.get('//test/[id]', (req, res) => {
    access(req.hostname + req.id);
    res.send("schlecht");
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})

function access(host) {    
    console.log(`API Access from ${host}`);
}