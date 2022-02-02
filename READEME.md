# Book Management App

## TypeScript + Mongoose + MongoDB + Express API Server

This App is setup using Docker

```
  .env.example change to .env
  docker-compose up --build (First Time)
  
  Onword after first time 
  docker-compose up
```

will start the app in docker and will be available in port 3000 in localhost

The MongoDB is exposed in local port 5002 for inspection

The API Documentation using swagger is available at
 http://localhost:3000/api-docs

```
 try out /signup
 try out /login - return token in the header

 click on Authorize -> paste the header

 try out all book endpoints
```
