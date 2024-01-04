const express = require('express');

const app = express();

app.get('/', (req, res) => {
    access(req.hostname);
    res.send("Hallo");
})

app.get('//test', (req, res) => {
    access(req.hostname);
    res.send("schlecht");
})

const port = 3000;

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})

function access(host) {    
    console.log(`API Access from ${host}`);
}