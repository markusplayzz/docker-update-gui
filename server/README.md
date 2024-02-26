# `server`-Directory

In this directory are all the files which are important for the backend.

## `.env` file

Please note that it's essential for this app to run to create an .env file with the following entries:

- `MYSQL_HOST` -> The host of your MYSQL-Server (e.g. `127.0.0.1`)
- `MYSQL_USER` -> The user for this app on your MYSQL-Server (e.g. `dug-user`)
- `MYSQL_PASSWORD` -> The password of the user for this app on your MYSQL-Server
- `MYSQL_DATABASE` -> The database for your app on your MYSQL-Server (e.g. `dug`)
- `SSH_HOST` -> The ip of your docker server (e.g. `10.1.2.10`)
- `SSH_USER` -> The user of your docker server (only put this user in the docker group, don't grant `sudo`-rights for security reason; e.g `dug-user`)
- `SSH_PRIVATEKEYPATH` -> The location of the private-key for the login on the docker server, passwords are not allowed (e.g. `/home/USERNAME/.ssh/id_rsa`)

**IMPORTANT:** Never ever push this `.env` file to github or share it with others, this file is intended for your environment and the information it provides is not considered public!

## MYSQL-Server

This application requires a MYSQL-Server with an own database and user.

### Installation

- Run `sudo apt update` in your bash
- Run `sudo apt install mariadb`
- Run the secure installation: `sudo mysql_secure_installation`
- Open the mysql dialog as root: `mysql -u root -p`
- Create a user for the application: `CREATE USER '<USERNAME>'@'localhost' IDENTIFIED BY '<PASSWORD>';`
- Create a database: `CREATE DATABASE <DATABASE_NAME>;`
- Use this database: `USE <DATABASE_NAME>;`
- Create a table: `CREATE TABLE ...` (sql for the table and database can be found [here](scheme.sql))
- Grant the created user privileges on the database: `GRANT ALL PRIVILEGES ON <DATABASE_NAME>.* TO '<USERNAME>'@'localhost';`