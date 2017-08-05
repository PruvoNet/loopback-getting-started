# loopback-getting-started

A simple tutorial for getting started with the Loopback framework
This tutrial will cover:

  - Setting up a working web applicaiton with fornend and backend
  - Set up models for the web application
  - Defining the models relations and ACLs
  - Authentication and Authrization features
  - 3rd party login support
  - Connecting the models to a real DB
  - Angular frotnend that communicate with the backend server

### Set up

Please make sure you have the following:
  - [Node.js](https://nodejs.org/)
  - [NPM](https://www.npmjs.com/)
  - loopback global npm libraries

Install the follwoing loopback dependencies

```sh
$ npm install -g loopback-cli
$ nnpm install -g strongloop
$ install -g loopback-sdk-angular-cli
```

### 1. Goal
We will create a simple web application (MyNotes) that will enable users to create and manage personal notes with the abaility to archive them once they are irelevant.

### 2. Generate the application

```sh
$ mkdir MyNotes
$ cd MyNotes
$ lb
```
