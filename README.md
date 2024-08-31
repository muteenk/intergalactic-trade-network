# Intergalactic Trading Network

## Description

Backend System for an Intergalactic Trading Network. This system will handle trade transactions, manage space cargo, and track space station inventory. The system handles high throughput data and provides real-time updates on trade activities across multiple planets and space stations.

## Technologies in use

- TypeScript: Using TypeScript for the entire project because it is a superset of JavaScript that adds optional types to the language. It is easier to write and maintain code with TypeScript because of all the type safety features.

- Node.js: Using Node.js runtime environment for server-side scripting.

- Express.js: Using Express.js for building the RESTful API. I will be using express.js because it is a fast, unopinionated, minimalist web framework for Node.js. It makes building RESTful APIs easier and faster.

- MongoDB: Using MongoDB as the database because it is a NoSQL database and it is easy to scale and manage. It is great with handling high volume data and provides real-time features.

- Redis: Using Redis as a caching layer to store frequently accessed data. Redis is an in-memory data structure store, used as a database, cache, and message broker.


## Design Decisions and Architectural Considerations


## Installation


## Deployment Instructions


## API Documentation

### Base URL
```
http://localhost:{port}/
```

### Base Endpoints

To test if the API is working, you can send a GET request to the base endpoint.

```
GET /api/
```

If you recieve a response code '200' with the message `Welcome to the Intergalactic Trading Network API`, then the API is working.


### User Endpoints

For user related operations, you can use the following endpoints:

#### Create a new User
```
POST /api/users/register/
```
If you want to create a new user, you can send a POST request to the above endpoint with the following payload:

```json
{
    "name": "testuser",
    "password": "password",
    "email": "example@mail.com",
    "role": "admin" | "vendor" | "user",
    "location": PlanetId | SpaceStationId,
    "locationType": "planet" | "spacestation"
}
```

In the above snippet:
- `name` is the name of the users
- `password` is the password of the users
- `email` is the email of the users
- `role` is the role of the users. It can be either `admin`, `vendor`, or `user`. If you select 'user' you can access user only routes, if you select vendor you can access vendor only routes, and if you select admin you can access all (admin, vendor and user) routes.
- `location` is the location of the user. It can be either a `PlanetId` or a `SpaceStationId`.
- `locationType` is the type of location. It can be either `planet` or `spacestation`.


Possible Responses:
- 201: User created successfully
- 400: Bad request
- 403: User already exists
- 500: Internal Server Error






## Instructions for API Testing


## Limitations and Future Improvements


## Scaling the system

### Scaling Strategies
 - Large Number of Concurrent Trade Transactions & Cargo Updates
 - High Data Volume & Complex Queries
 - Optimization: Caching, Data Partitioning & Indexing
