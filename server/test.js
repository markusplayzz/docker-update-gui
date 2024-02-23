const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();
const axios = require('axios');

var array = [];
var currentData, localEtag, remoteEtag, resultStdout;
ssh
    .connect({
        host: '10.0.0.71',
        username: 'markus',
        privateKeyPath: '/home/markus/.ssh/id_rsa'
    })
    .then(function() {
        ssh.execCommand('docker container ls --format \'{ "name": {{ json .Names }}, "image": {{ json .Image }} }\'', { cwd: '.'
        }).then((result) => {
            resultStdout = result.stdout;
        });
    })
    .catch(function() {
    });


resultStdout.split("\n").forEach(containerData => {
    currentData = JSON.parse(containerData);

    // get local etag
    ssh
        .connect({
            host: '10.0.0.71',
            username: 'markus',
            privateKeyPath: '/home/markus/.ssh/id_rsa'
        })
        .then(function() {
            ssh.execCommand(`docker image inspect ${currentData.Image} --format '{{ json .RepoDigests }}'`, { cwd: '. '}).then((result2) => {
                console.log(result2.stdout);
            });
        });
    
    array.push(JSON.parse(containerData));
});
console.log(array);




/*var test = "[\"jc21/nginx-proxy-manager@sha256:5b2d87d3c060e4a364df0109d8188d816ec07273697ad350aa4beeab63529f74\"]";



test = test.replace(/.*@/g, '').replace(/"]/g, '');
console.log(test);*/