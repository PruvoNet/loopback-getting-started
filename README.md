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
? What's the name of your application? MyNotes
? Which version of LoopBack would you like to use? 3.x (current)
? What kind of application do you have in mind? api-server (A LoopBack API server with local User auth)
$ node server/server.js
```

Now we have a working server. You can explore the main page by opening http://localhost:3000/
Loopback comes with a builtin User model for handling users.
All models in loopback comes with a full REST representation out of the box.
You can explore and interact with your models at any time by opening the Swagger explorer at http://localhost:3000/explorer

Try and create a user by using the POSTthod on the /Users endpoint and giving the following object:
```json
{
    "email": "your@email.com",
    "password": "12345"
}
```
Notice that we got a valid response from the server stating the user was created.

Lets try to get all the users we have by running the GET method on the /Users endpoint.
Notice we got a 401 error code - which makes sense, as users data is sensative and and such no once can read it without the proper access - we will disucess ACLs later on.

### 2. Attach DB

Loopback comes with a in-memory DB for devloping purpuses which makes it easier to start working right away.
Connecting a real DB is as easy as a cli command.

> You can skip this step for now if you don't have a test DB set up

For the purposed of this tutrial I will connect a MSSQL DB:
```sh
$ lb datasource
? Enter the datasource name: sql
? Select the connector for sql: Microsoft SQL (supported by StrongLoop)
? Connection String url to override other settings (eg: mssql://username:password@localhost/database):
? host: testmyapp.database.windows.net
? port: 1433
? user: myapp
? password: *********
? database: testMyApp
? Install loopback-connector-mssql@^2.5 Yes
```
