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

### Prerequisites

- Node.js
- Package Manager of your choice (npm, yarn, pnpm, bun etc)
- MongoDB
- Redis

### Steps

1. Clone the repository
```
git clone https://github.com/muteenk/intergalactic-trade-network.git
```

2. Install dependencies
```
cd intergalactic-trade-network
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=4000
MONGO_URI=mongodb://localhost:27017/intergalactic-trade-network
REDIS_URI=redis://localhost:6379
JWT_SECRET=your_secret_key
```

4. Start the server

In development mode:

```
npm run dev
```

In production mode:

```
npm start
```

5. The server should now be running on `http://localhost:4000/`

6. You can now test the API using Postman or any other API testing tool.



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

If you recieve a response code `200` with the message `Welcome to the Intergalactic Trading Network API`, then the API is working.


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
    "role": "user",
    "locationType": "planet"
    "location": "PlanetId", 
}
```

In the above snippet:
- `name` is the name of the users
- `password` is the password of the users
- `email` is the email of the users
- `role` is the role of the users. It can be either `admin`, `vendor`, or `user`. If you select 'user' you can access user only routes, if you select vendor you can access vendor only routes, and if you select admin you can access all (admin, vendor and user) routes.
- `locationType` is the type of location. It can be either `planet` or `spacestation`.
- `location` is the location of the user. It can be either a `PlanetId` or a `SpaceStationId` (Depending on locationType).



Possible Responses:
- 201: User created successfully
- 400: Bad request
- 403: User already exists
- 500: Internal Server Error


#### Login User
```
POST /api/users/login/
```

If you want to login a user, you can send a POST request to the above endpoint with the following payload:

```json
{
    "email": "example@mail.com",
    "password": "password"
}
```

In the above snippet:
- `email` is the email of the users
- `password` is the password of the users

Possible Responses:
- 200: User logged in successfully
- 400: Bad request
- 401: Unauthorized
- 500: Internal Server Error


#### Get User Profile
```
GET /api/users/me/
```

If you want to get the profile of the currently logged in user, you can send a GET request to the above endpoint.

Possible Responses:
- 200: User profile retrieved successfully
- 401: Unauthorized
- 500: Internal Server Error



#### Logout User
```
GET /api/users/logout/
```

If you want to logout the currently logged in user, you can send a GET request to the above endpoint.

Possible Responses:
- 200: User logged out successfully
- 500: Internal Server Error




### Planet endpoints

For planet related operations, you can use the following endpoints:

#### Create a new Planet (Admin Only)
```
POST /api/planets/admin/create/
```

If you want to create a new planet, you can send a POST request to the above endpoint with the following payload:

```json
{
    "name": "Planet Name",
    "inventory": [{
        "item": "ItemID",
        "quantity": 100
    }],
    "location": {
        "x": 101,
        "y": 202,
        "z": 303
    } 
}
```

In the above snippet:
- `name` is the name of the planets
- `inventory` is the inventory of the planets. It is an optional field. It is an array of objects with the following fields:
    - `item` is the ObjectID of item
    - `quantity` is the quantity of the item
- `location` is the location of the planet. It is an object with the following fields:
    - `x` is the x-coordinate of the planet
    - `y` is the y-coordinate of the planet
    - `z` is the z-coordinate of the planet


Possible Responses:
- 201: Planet created successfully
- 400: Bad request
- 401: Unauthorized
- 500: Internal Server Error



#### Get all Planets
```
GET /api/planets/
```

If you want to get all the planets, you can send a GET request to the above endpoint.

Possible Responses:
- 200: Planets retrieved successfully
- 500: Internal Server Error



#### Get Planet by ID
```
GET /api/planets/:id
```

If you want to get a planet by ID, you can send a GET request to the above endpoint.

Possible Responses:
- 200: Planet retrieved successfully
- 404: Planet not found
- 500: Internal Server Error






### Space Station endpoints

For space station related operations, you can use the following endpoints:

#### Create a new Space Station (Admin Only)
```
POST /api/stations/admin/create/
```

If you want to create a new space station, you can send a POST request to the above endpoint with the following payload:

```json
{
    "name": "Space Station Name",
    "inventory": [{
        "item": "ItemID",
        "quantity": 100
    }],
    "location": {
        "x": 101,
        "y": 202,
        "z": 303
    } 
}
```

In the above snippet:
- `name` is the name of the space stations
- `inventory` is the inventory of the planets. It is an optional field. It is an array of objects with the following fields:
    - `item` is the ObjectID of item
    - `quantity` is the quantity of the item
- `location` is the location of the planet. It is an object with the following fields:
    - `x` is the x-coordinate of the planet
    - `y` is the y-coordinate of the planet
    - `z` is the z-coordinate of the planet


Possible Responses:
- 201: Planet created successfully
- 400: Bad request
- 401: Unauthorized
- 500: Internal Server Error



#### Get all Space Stations
```
GET /api/stations/
```

If you want to get all the space stations, you can send a GET request to the above endpoint.

Possible Responses:
- 200: Space Stations retrieved successfully
- 500: Internal Server Error



#### Get Space Station by ID
```
GET /api/stations/:id
```

If you want to get a space station by ID, you can send a GET request to the above endpoint.

Possible Responses:
- 200: Space Station retrieved successfully
- 404: Space Station not found
- 500: Internal Server Error





### Items endpoints

For items related operations, you can use the following endpoints:

#### Create a new item (Admin Only)
```
POST /api/item/admin/create/
```

If you want to create a new item, you can send a POST request to the above endpoint with the following payload:

```json
{
    "name": "Item Name",
    "description": "Item Description",
    "value": 100
}
```

In the above snippet:
- `name` is the name of the items
- `description` is the description of the Items
- `value` is the value of the item


Possible Responses:
- 201: Planet created successfully
- 400: Bad request
- 401: Unauthorized
- 500: Internal Server Error



#### Search Items by Name

If you want to search for an item by name in Planets and Space Station Inventory, you can send a GET request to the following endpoint:

```
GET /api/items/search/:name
```

Possible Responses:
- 200: Items retrieved successfully
- 404: Item not found
- 500: Internal Server Error





## Instructions for API Testing


## Limitations and Future Improvements


## Scaling the system

### Scaling Strategies
 - Large Number of Concurrent Trade Transactions & Cargo Updates
 - High Data Volume & Complex Queries
 - Optimization: Caching, Data Partitioning & Indexing
