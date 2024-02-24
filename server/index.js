// app
const express = require('express');
const cors = require('cors');
const app = express();
app.disable('x-powered-by');
app.disable('etag');
app.use(cors());
const port = 3000;
const axios = require('axios');

// node-ssh
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

app.get('/', (req, res) => {
    access(req.hostname);
    res.send("API");
});

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
                console.log("Result available at " + new Date() + req.ip);
                res.json(containers);
            });
        })
        .catch(function() {
            res.sendStatus(500);
        });
});

app.get('//images', async (req, res) => {
    await ssh
        .connect({
            host: '10.0.0.71',
            username: 'markus',
            privateKeyPath: '/home/markus/.ssh/id_rsa'
        })
        .then(function() {
            ssh.execCommand('docker image ls --format  "{{ json . }}"', { cwd: '.'
            }).then((result) => {
                var images = [];
                result.stdout.split("\n").forEach(image => {
                    images.push(JSON.parse(image));                    
                });
                console.log("Result available at " + new Date() + req.ip);
                res.json(images);
            });
        })
        .catch(function() {
            res.sendStatus(500);
        });
});

app.get('//updates', async (req, res) => {
    var array = [];
    var currentData, localEtag = "", remoteEtag = "", resultStdout = "", dockerHubResponse, updateAvailable;
    await ssh
        .connect({
            host: '10.0.0.71',
            username: 'markus',
            privateKeyPath: '/home/markus/.ssh/id_rsa'
        })
        .then(async function() {
            await ssh.execCommand('docker container ls --format \'{ "Name": {{ json .Names }}, "Image": {{ json .Image }} }\'', { cwd: '.'
            }).then((result) => {
                resultStdout = result.stdout;
            });

            for (const containerData of resultStdout.split("\n")) {
                currentData = JSON.parse(containerData);
                
                await ssh.execCommand(`docker image inspect ${currentData.Image} --format '{{ json .RepoDigests }}'`, { cwd: '.'}).then((result2) => {
                    localEtag = result2.stdout.replace(/.*@/g, '').replace(/"]/g, '');
                });

                dockerHubResponse = await axios.get(`https://hub.docker.com/v2/namespaces/${currentData.Image.replace(/\/.*/g, "")}/repositories/${currentData.Image.replace(/.*\//g, "").replace(/:.*/g, "")}/tags/latest`);
                remoteEtag = dockerHubResponse.data.digest;

                if (localEtag !== remoteEtag) {
                    updateAvailable = true;
                } else {
                    updateAvailable = false;
                }

                currentData.UpdateAvailable = updateAvailable;
                currentData.LocalEtag = localEtag;
                currentData.RemoteEtag = remoteEtag;

                array.push(currentData);
            }
            res.json(array.reverse());
        })
        .catch(function() {
            res.sendStatus(500);
        });
});

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
});

function access(host) {    
    console.log(`API Access from ${host}`);
}