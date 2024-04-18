// app
const express = require("express");
const cors = require("cors");
const app = express();
app.disable("x-powered-by");
app.disable("etag");
app.use(cors());
const port = 3000;
const axios = require("axios");
const cron = require("node-cron");
const database = require("./database.js");

// node-ssh
const { NodeSSH } = require("node-ssh");
const ssh = new NodeSSH();

app.get("/", (req: any, res: any) => {
  access(req.hostname);
  res.send("API");
});

app.get("//containers", async (req: any, res: any) => {
  var array = await database.getDockerContainers();

  res.json(array.reverse());
});

app.get("//images", async (req: any, res: any) => {
  var array = await database.getDockerImages();

  res.json(array.reverse());
});

app.get("//updates", async (req: any, res: any) => {
  var array = await database.getDockerContainerUpdates();

  res.json(array.reverse());
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});

function access(host) {
  console.log(`API Access from ${host}`);
}

async function compareDockerAndDatabaseUpdateEntries() {
  const databaseEntries: any = await database.getDockerContainerUpdates();
  const dockerEntries: any = await getDockerContainerUpdateEntries();
  var dockerMissing: any[] = [],
    databaseMissing: any[] = [];

  // check for new docker containers
  for (var i = 0; i < dockerEntries.length; i++) {
    if (!databaseEntries.some((e) => e.name === dockerEntries[i].name)) {
      databaseMissing.push(dockerEntries[i]);
    }
  }

  // check if docker containers are deleted
  for (var i = 0; i < databaseEntries.length; i++) {
    if (!dockerEntries.some((e) => e.name === databaseEntries[i].name)) {
      dockerMissing.push(databaseEntries[i]);
    }
  }

  // add new docker containers to db
  for (var i = 0; i < databaseMissing.length; i++) {
    await database.createDockerUpdateContainer(
      databaseMissing[i].name,
      databaseMissing[i].image
    );
  }

  // delete old docker entries from db
  for (var i = 0; i < dockerMissing.length; i++) {
    await database.deleteDockerUpdateContainerByName(dockerMissing[i].name);
  }
}

async function getDockerContainerUpdateEntries() {
  var array = [],
    resultStdout: string;

  await ssh
    .connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USER,
      privateKeyPath: process.env.SSH_PRIVATEKEYPATH,
    })
    .then(async function () {
      await ssh
        .execCommand(
          'docker container ls --format \'{ "name": {{ json .Names }}, "image": {{ json .Image }} }\'',
          { cwd: "." }
        )
        .then((result: any) => {
          resultStdout = result.stdout;
        });

      for (const containerData of resultStdout.split("\n")) {
        array.push(JSON.parse(containerData));
      }
    })
    .catch(function () {
      console.log("SSH Error");
    });

  return array;
}

async function checkForImageUpdates() {
  var local_etag: string,
    remote_etag: string,
    update_available: boolean,
    dockerHubResponse: any,
    changes: boolean = false;
  const dockerContainerUpdateEntries =
    await database.getDockerContainerUpdates();

  await ssh
    .connect({
      host: process.env.SSH_HOST,
      username: process.env.SSH_USER,
      privateKeyPath: process.env.SSH_PRIVATEKEYPATH,
    })
    .then(async function () {
      for (var i = 0; i < dockerContainerUpdateEntries.length; i++) {
        await ssh
          .execCommand(
            `docker image inspect ${dockerContainerUpdateEntries[i].image} --format '{{ json .RepoDigests }}'`,
            { cwd: "." }
          )
          .then((result: any) => {
            local_etag = result.stdout.replace(/.*@/g, "").replace(/"]/g, "");
          });

        dockerHubResponse = await axios.get(
          `https://hub.docker.com/v2/namespaces/${dockerContainerUpdateEntries[
            i
          ].image.replace(
            /\/.*/g,
            ""
          )}/repositories/${dockerContainerUpdateEntries[i].image
            .replace(/.*\//g, "")
            .replace(/:.*/g, "")}/tags/latest`
        );
        remote_etag = dockerHubResponse.data.digest;

        if (local_etag !== remote_etag) {
          update_available = true;
        } else {
          update_available = false;
        }

        if (
          dockerContainerUpdateEntries[i].local_etag !== local_etag ||
          dockerContainerUpdateEntries[i].remote_etag !== remote_etag ||
          dockerContainerUpdateEntries[i].update_available !== update_available
        ) {
          await database.changeDockerUpdateEtags(
            dockerContainerUpdateEntries[i].name,
            local_etag,
            remote_etag,
            update_available
          );
          changes = true;
        }
      }
    })
    .catch(function () {
      console.log("SSH Error");
    });
}

// Compares the database with docker, every 10 minutes and in the hours 4-3
cron.schedule("*/10 4-23,0-2 * * *", async () => {
  console.log("JOB");
  await compareDockerAndDatabaseUpdateEntries();
});

// Checks if there is an update for the image availible, every day at 3 o'clock
cron.schedule("0 3 * * *", async () => {
  await compareDockerAndDatabaseUpdateEntries();
  await checkForImageUpdates();
});

async function main() {
  await compareDockerAndDatabaseUpdateEntries();
  await checkForImageUpdates();
}

main();
