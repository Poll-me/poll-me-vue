<!-- markdownlint-disable MD033 -->
<p align="center">
  <a href="https://www.poll-me.com" target="_blank">
    <img width="192" alt="PollMe WebApp" src="static/img/favicon/android-chrome-192x192.png">
  </a>
  <a href="https://vuejs.org" target="_blank">
    <img width="192" alt="Vue JS" src="static/img/vue-logo.png">
  </a>
</p>
<!-- markdownlint-enable MD033 -->

# PollMe Vue

[![Build Status](https://travis-ci.org/Poll-me/poll-me-vue.svg?branch=develop)](https://travis-ci.org/Poll-me/poll-me-vue)
[![Uses FontAwesome](https://img.shields.io/badge/uses-fontawesome-blue.svg)](https://fontawesome.com)
[![Deploys by Netlify](https://www.netlify.com/img/global/badges/netlify-color-accent.svg)](https://www.netlify.com)

> The VueJS version of the PollMe webapp

This is the awesome app with with you be able to collect in the most easy way
any kind of opinion or preferece from anyone.

For example:

- Are you trying to know the best date to a plan with you friends?  **POLL THEM!!**
- Are you trying to decide which Star Wars movie is better?  **POLL THEM!!**
- Are you trying to find out which friend of yours knows you better? **POLL THEM!!**

This project was created using the official Webpack [vue-cli] template. For a detailed
explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/)
and [docs for vue-loader](http://vuejs.github.io/vue-loader).

- [Start working with the project](#start-working-with-the-project)
- [Development flow](#development-flow)
- [Package scripts](#package-scripts)
- [Enviroments](#enviroments)

## Start working with the project

To contribute you just need to clone the repo and install the node dependencies,
then you can run any package script.

```bash
# Clone the repo and enter inside
git clone git@github.com:Poll-me/poll-me-vue.git
# by HTTPS: https://github.com/Poll-me/poll-me-vue.git
cd poll-me-vue

# install node dependencies
npm install

# Start the dev server with a watcher running
npm start
```

## Development flow

You must follow [this](docs/dev-flow.md) guidelines in order to contribute to
the project in any way.

## Package scripts

As the project do not have a task builder like Grunt or Gulp we need to use the
npm package scripts to run the tasks that manage the workflow of the project.

``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Enviroments

This project contemplate many possible environments that are used at different parts
of the source code, for example, at webpack configuration.

- **Development** (`dev`): the environment for develop the project.
  For example at developers computers.
- **Production** (`prod`): the environment for serve the production app files.
  For example at deploy environments.

[vue-cli]: https://github.com/vuejs/vue-cli
