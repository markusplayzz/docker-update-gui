// app
const express = require('express');
const app = express();
const port = 3000;

// node-ssh
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

app.get('/', (req, res) => {
    access(req.hostname);
    res.send("API");
})

app.get('//containers', async (req, res) => {
    await ssh
        .connect({
            host: '10.0.0.71',
            username: 'markus',
            privateKeyPath: '/home/markus/.ssh/id_rsa'
        })
        .then(function() {
            ssh.execCommand('docker container ls --format  "{{ json . }}"', { cwd: '.'
            }).then((result) => {
                var containers = [];
                result.stdout.split("\n").forEach(container => {
                    containers.push(JSON.parse(container));                    
                });
                console.log("Result available at " + new Date());
                res.json(JSON.stringify(containers));
            });
        })
        .catch(function() {
            res.sendStatus(500);
        });
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})

function access(host) {    
    console.log(`API Access from ${host}`);
}