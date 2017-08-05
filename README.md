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

### 3. Attach DB

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

Notice that the `server/datasources.json` file has a new "sql" object that describes the DB conneciton we just set up.

Since MSSQL requires an encrypted connection, we need to declare it in the mathcing object by adding 
```json
"options": 
{
      "encrypt": true
}
```

### 4. Auto create DB schema

Loopback can auto create all the schemas that describes our models. This is very convenient for developing since we don't want to create the schemas ourselves.

To enable this feature, we need to add the following file:
`server/boot/autoupdate.js`
```javascript
'use strict';

module.exports = function (app) {
  var datasources = require('../datasources.json');

  function autoUpdateAll() {
    Object.keys(datasources).forEach(function (key) {
      var DS = app.dataSources[key];
      if (DS.connected) {
        DS.autoupdate(function (err) {
          if (err) throw err;
          console.log('DS ' + key + ' updated');
        });
      } else {
        DS.once('connected', function () {
          DS.autoupdate(function (err) {
            if (err) throw err;
            console.log('DS ' + key + ' updated');
          });
        });
      }
    });
  }

  autoUpdateAll();
};
```

> In production you should disable this feature as it changes schemas even if they alredy exists, which can lead to data loss!

Rerun the application and add the user again (it was deleted from last time as it was saved in memory)
Open your prefrence of DB explorer and notice that a lof of tables were auto created for you and that the user table has 1 entry of the user you just created.

### 5. Create models

As our application holds notes for users, we need to have a representation of a note in the DB - a loopback model:
 - A note will belong to a single user
 - A note can be archivable
 - A note will be composed of a title and text content.
 - A note will have a creation date

Lets jump right ahead and create the model:
```sh
$ lb model
? Enter the model name: note
? Select the datasource to attach note to: sql (mssql)
? Select model's base class PersistedModel
? Expose note via the REST API? Yes
? Custom plural form (used to build REST URL):
? Common model or server only? server
```

Now lets add its properties:
```sh
Let's add some note properties now.

Enter an empty property name when done.
? Property name: id
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another note property.
Enter an empty property name when done.
? Property name: username
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another note property.
Enter an empty property name when done.
? Property name: created
   invoke   loopback:property
? Property type: date
? Required? Yes
? Default value[leave blank for none]:

Let's add another note property.
Enter an empty property name when done.
? Property name: archived
   invoke   loopback:property
? Property type: boolean
? Required? Yes
? Default value[leave blank for none]: false

Let's add another note property.
Enter an empty property name when done.
? Property name: title
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:

Let's add another note property.
Enter an empty property name when done.
? Property name: content
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:
```

Notice that under `server/models` we have 2 files that represnt the Note model:
 - `note.js` - here we can customize the behaviour of the model
 - `note.json` - JSON description of the model

Notice also that the `server/model-config.js` file declares our model and connects it to the DB we created earlier

Lets connect the pre defined models in that file to our DB as well by changing the "dataSource" property to "sql"

### 6. Extned user models

As mentioned before, loopback comes with predefined models for handling users and authentication.
For purposes outside of the scope of this tutrial, we need to extend them.

```sh
$ lb model
? Enter the model name: user
? Select the datasource to attach user to: sql (mssql)
? Select model's base class User
? Expose user via the REST API? Yes
? Custom plural form (used to build REST URL):
? Common model or server only? server
Let's add some user properties now.

Enter an empty property name when done.
? Property name: email
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:
```

```sh
$ lb model
? Enter the model name: accessToken
? Select the datasource to attach accessToken to: sql (mssql)
? Select model's base class AccessToken
? Expose accessToken via the REST API? No
? Common model or server only? server
Let's add some accessToken properties now.

Enter an empty property name when done.
? Property name: id
   invoke   loopback:property
? Property type: string
? Required? Yes
? Default value[leave blank for none]:
```

Now lets remove the old model configs from `server/model-config.js` by removing the "User" and "AccessToken" keys



