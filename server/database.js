const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

async function getDockerContainerUpdates() {
    const [rows] = await pool.query("SELECT * FROM docker_container_updates");
    return rows;
}

async function getDockerContainerUpdate(id) {
    const [rows] = await pool.query("SELECT * FROM docker_container_updates WHERE id = ?", [id]);
    return rows;
}

async function createDockerUpdateContainer(name, image) {
    await pool.query("INSERT INTO docker_container_updates (name, image) VALUES (?, ?)", [name, image]);
}

async function changeDockerUpdateEtags(id, localEtag, remoteEtag) {
    await pool.query(`
    UPDATE docker_container_updates
    SET local_etag = ?, remote_etag = ?
    WHERE id = ?;
    `, [localEtag, remoteEtag, id]);
}

async function deleteDockerUpdateContainer(id) {
    await pool.query(`
    DELETE FROM docker_container_updates
    WHERE id = ?;
    `, [id]);
}

async function main() {
    var rows = await getDockerContainerUpdates();
    console.log(rows);
    await changeDockerUpdateEtags(1, "20", "1250");
    await deleteDockerUpdateContainer(2);
    rows = await getDockerContainerUpdates();
    console.log(rows);
}

main();