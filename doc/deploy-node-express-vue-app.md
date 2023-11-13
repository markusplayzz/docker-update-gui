# Deploy a express.js and vue.js app

## Prerequisites

- [`node`](./node-install.md)
- [`express.js` and `vue.js` app](./create-express-vue-app.md)

## Install `nginx` Webserver

- Run `sudo apt update && sudo apt install nginx -y`

## Run `vue.js` and `express.js` simultaniously with `pm2`

- Install: `npm install pm2 -g`
- cd into frontend directory
- Run `vue.js` app: `pm2 start "npm start" --name "client"`

## Config `nginx` Webserver

- Edit config `nano /etc/nginx/sites-available/default`
- Change the example conf for your needs

### Example conf

``` conf
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
    charset utf-8;

    # For Frontend
    location / {
        root /var/www/new-app/client/dist;
        try_files $uri  /index.html;
    }

    # For Backend
    location /api {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://localhost:3000/;
        proxy_ssl_session_reuse off;
        proxy_set_header Host $http_host;
        proxy_cache_bypass $http_upgrade;
        proxy_redirect off;
    }
    error_log  /var/log/nginx/app-error.log;
    access_log /var/log/nginx/app-access.log;
}
```
