const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise();

module.exports = {
    getDockerContainerUpdates: async function () {
        const [rows] = await pool.query(`
        SELECT name, image, update_available, local_etag, remote_etag FROM docker_container_updates
        `);
        return rows;
    },

    getDockerContainers: async function() {
        const [rows] = await pool.query(`
        SELECT name FROM docker_container_updates;
        `);
        return rows;
    },

    getDockerImages: async function() {
        const [rows] = await pool.query(`
        SELECT image FROM docker_container_updates;
        `);
        return rows;
    },
    
    createDockerUpdateContainer: async function (name, image) {
        await pool.query(`
        INSERT INTO docker_container_updates (name, image)
        VALUES (?, ?)
        `, [name, image]);
    },
    
    changeDockerUpdateEtags: async function (name, local_etag, remote_etag, update_available) {
        await pool.query(`
        UPDATE docker_container_updates
        SET local_etag = ?, remote_etag = ?, update_available = ?
        WHERE name = ?;
        `, [local_etag, remote_etag, update_available, name]);
    },
    
    deleteDockerUpdateContainer: async function (id) {
        await pool.query(`
        DELETE FROM docker_container_updates
        WHERE id = ?;
        `, [id]);
    },

    deleteDockerUpdateContainerByName: async function(name) {
        await pool.query(`
        DELETE FROM docker_container_updates
        WHERE name = ?;
        `, [name]);
    }
}