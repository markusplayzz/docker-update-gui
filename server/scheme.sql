CREATE DATABASE docker_update_gui;
USE docker_update_gui;

CREATE TABLE docker_container_updates (
    id integer PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(511) NOT NULL,
    image VARCHAR(511) NOT NULL,
    update_available BOOLEAN,
    local_etag VARCHAR(511),
    remote_etag VARCHAR(511),
    last_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    created TIMESTAMP DEFAULT NOW()
);