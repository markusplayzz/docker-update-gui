# Add `bootstrap 5` to a `vue.js 3` project

## Prerequisites

- [`express.js` and `vue.js` app](./create-express-vue-app.md) (only the vue.js part)

## Install modules

Install commands:

- Bootstrap: `npm install --save bootstrap`
- PropperJS `npm install --save @popperjs/core`

## Import modules in `<VUE-APP-NAME>/src/main.js`

Add following to the top-lines:

``` js
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// ...
```

> Source: https://stackoverflow.com/questions/65547199/using-bootstrap-5-with-vue-3
