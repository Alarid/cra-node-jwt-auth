# Template CRA / Node / JWT Auth with MongoDB
The purpose of this repository is to provide the skeleton of a web app with the frontend in React and a backend in Node, handling out of the box user authentication with JWT tokens and a MongoDB database.

## Server
The server exposes a few routes for authentication :
* POST `/api/auth/signin`
* POST `/api/auth/signup`

...and some other routes to test user roles and access rights to various types of content :
* GET `/api/test/all` : public content, no restriction
* GET `/api/test/user` : must provide a token (be logged in)
* GET `/api/test/mod` : user must have the MODERATOR role
* GET `/api/test/admin` : restricted to admin users

There are 3 different roles :
* admin
* moderator
* user

## Client
The frontend was made with [create-react-app](https://github.com/facebook/create-react-app) using :
* axios
* bootstrap
* redux

It provides basic pages :
* Home page (public content)
* Login page
* Sign up page
* User Board (logged users content)
* Admin Board (admin content)
* Moderator Board (moderator content)

## Requirements
Things you need to install to run this project. The usual :
* npx
* npm
* node
* mongodb

By default, the react app will try to launch on port 3000, which will be used by the server. To change that, create `./client/.env.local` like so :
```
PORT=8080
```

## How to run
```sh
# Run the server (must have mongodb running in background)
cd server
npm install
npm start
# Run the client
cd client
npm install
npm start
```
I recommend using something like [Postman](https://www.postman.com/) to create a few users with different roles :

```
Request : POST http://localhost:3000/api/auth/signup
Body : Raw JSON
{
    "username": "admin",
    "email": "admin@gmail.com",
    "password": "adminpwd",
    "roles": ["admin"]
}

Request : POST http://localhost:3000/api/auth/signup
Body : Raw JSON
{
    "username": "moderator",
    "email": "moderator@gmail.com",
    "password": "moderatorpwd",
    "roles": ["moderator", "user"]
}

Request : POST http://localhost:3000/api/auth/signup
Body : Raw JSON
{
    "username": "simpleuser",
    "email": "simpleuser@gmail.com",
    "password": "userpwd",
    "roles": ["user"]
}
```

Ready to start coding !

## Resources
* [React Redux Login, Logout, Registration example with Hooks](https://bezkoder.com/react-hooks-redux-login-registration-example/?unapproved=5302&moderation-hash=435de7cd959085dbc38b9feef7fb6b53#comment-5302)
* [Node.js + MongoDB: User Authentication & Authorization with JWT](https://bezkoder.com/node-js-mongodb-auth-jwt/)
