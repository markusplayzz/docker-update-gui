# Create a `express.js` and `vue.js` app

## Prerequisites

- [`node`](./node-install.md)

## Creating directory structure

> IMPORTANT: If you want to use this as productive environment, create your directory structure in `/var/www` so that the `nginx`-webserver can access it later on.

This directory structure is needed:

- main directory (e.g. `my-app`)
  - frontend directory (will be created automatically)
  - backend directory (e.g. `server`)

- Navigate in main directory: `cd my-app`

## Set-up `vue.js`

- Init npm app: `npm init vue@latest`
- Name it for example `client`
- Only yes for the options ESLint and Prettier
- Change into app dir: `cd client`
- Install required packages: `npm install`
- (Run vue.js app: `npm run dev`)

## Make `vue.js` accessible in LAN (optional)

- Edit `client/package.json`
- In scripts part add `--host` to the dev option: `"dev": "vite --host"`

## Set-up `express.js`

- Navigate in the backend directorye (e.g. `cd server`)
- Run `npm init --y`
- `npm install express`
- Create Backend
- (Run backend `node FILENAME`)
