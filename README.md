# Todo app (BE)
A todo app BE built with NodeJS, Express, PostgreSQL 

## How to start

Prerequisite:
- Node v16 
- Docker 
- Postman (for testing API routes)
- Create a local DB env file as `.env.local` with the following config
```
JWT_SECRET=yourSecretToken
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=todolist

```
- Copy `env.local` to `.env` in your local 
---
To run the application:

- Start the local PostgreSQL DB:
````
docker-compose up -d
````
- Install all dependencies 

````
npm install 
````

- Then start the server with:
````
cd src 
nodemon app.js or node app.js 
````

## Technology
- NodeJS v16 
- Express
- PostgreSQL
- Docker 

