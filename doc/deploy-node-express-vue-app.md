# Deploy a `express.js` and `vue.js` app

## Prerequisites

- [`node`](./node-install.md)
- [`express.js` and `vue.js` app](./create-express-vue-app.md)

## Install `nginx` Webserver

- Run `sudo apt update && sudo apt install nginx -y`

## Run `express.js` in background with `pm2`

- Install: `npm install pm2 -g`
- cd into backend directory
- Add the line `"start": "node ."` in the `scripts` part of your `package.lock` configuration file
- Run `vue.js` app: `pm2 start "npm start" --name "server"`
- Now the `express.js-backend` is running in background

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

## Troubleshooting

- Webserver returns error 500
  - Set directory permissions
    - Change user with: `chown -R www-data:www-data /path/to/your/app`
    - Change permissions with: `chmod -R 755 /path/to/your/app`
    - Restart Webserver: `service nginx restart`
  - Build your `vue.js` App
    - Build command: `npm run build` (Run this in your `client` directory: `path/to/your/app/client`)
    - Press `CTRL` + `F5` in your Browser to reload the website without cache
