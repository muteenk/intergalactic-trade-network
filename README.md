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

```json
{
    "success": true,
    "user": {
        "name": "Test",
        "email": "test@mail.com",
        "password": "$2a$10$YJ7mh/VxTg/skZ89rvKRnOKbjauT2wt6epMX9iEX58f7bgpSUV4p.",
        "role": "user",
        "location": "66d31e9e4b3daf8c1398ab24",
        "locationType": "spacestation",
        "_id": "66d3a7c8a9e174b27fb4d1c8",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDNhN2M4YTllMTc0YjI3ZmI0ZDFjOCIsImlhdCI6MTcyNTE0NzA4MCwiZXhwIjoxNzI1NTc5MDgwfQ.pgDrCsIH0X1ZkG0gRS8tULbsj30fCGQkdp0uBDGt4DQ"
}
```

Possible Responses Codes:
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

```json
{
    "success": true,
    "user": {
        "_id": "66d365f6a780b99e67a37f56",
        "name": "Test",
        "email": "test@mail.com",
        "password": "$2a$10$oY1EwVj7rQj8CQByfiA2HebLs0ultGS93EExD9gzyHO3zyUWp4vcG",
        "role": "user",
        "location": "66d31e9e4b3daf8c1398ab24",
        "locationType": "planet",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDM2NWY2YTc4MGI5OWU2N2EzN2Y1NiIsImlhdCI6MTcyNTE0NzMxNiwiZXhwIjoxNzI1NTc5MzE2fQ.yYZ8L7BE767UH-jRGVHinq8rCqiX5zSVkfl63yP4Rqc"
}
```


Possible Response Codes:
- 200: User logged in successfully
- 400: Bad request
- 401: Unauthorized
- 500: Internal Server Error


#### Get User Profile
```
GET /api/users/me/
```

If you want to get the profile of the currently logged in user, you can send a GET request to the above endpoint.


Possible responses:

```json

{
    "success": true,
    "user": {
        "_id": "66d365f6a780b99e67a37f56",
        "name": "Test",
        "email": "test@mail.com",
        "role": "user",
        "location": "66d31e9e4b3daf8c1398ab24",
        "locationType": "planet",
        "__v": 0
    }
}

```

Possible Response Codes:
- 200: User profile retrieved successfully
- 401: Unauthorized
- 500: Internal Server Error



#### Logout User
```
GET /api/users/logout/
```

If you want to logout the currently logged in user, you can send a GET request to the above endpoint.

Possible responses:

```json
{
    "success": true,
    "message": "User logged out successfully"
}
```

Possible Response Codes:
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


Possible Response:

```json
{
    "success": true,
    "planet": {
        "name": "uranus",
        "inventory": [],
        "location": {
            "x": 2000,
            "y": -1200,
            "z": 6000
        },
        "_id": "66d3aa73a9e174b27fb4d1ce",
        "__v": 0
    }
}
```

Possible Response Codes:
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

```json

{
    "success": true,
    "planets": [
        {
            "location": {
                "x": -100,
                "y": 200,
                "z": 500
            },
            "_id": "66d36653b3ecad5ed0c583e5",
            "name": "mars",
            "inventory": [],
            "__v": 0
        },
        {
            "location": {
                "x": 900,
                "y": -200,
                "z": 600
            },
            "_id": "66d367c6423301d11adda36a",
            "name": "earth",
            "inventory": [],
            "__v": 0
        },
        {
            "location": {
                "x": 2000,
                "y": -1200,
                "z": 6000
            },
            "_id": "66d3aa73a9e174b27fb4d1ce",
            "name": "uranus",
            "inventory": [],
            "__v": 0
        }
    ]
}

```


Possible Response Codes:
- 200: Planets retrieved successfully
- 500: Internal Server Error



#### Get Planet by ID
```
GET /api/planets/:id
```

If you want to get a planet by ID, you can send a GET request to the above endpoint.

Possible Response:

```json
{
    "success": true,
    "planet": {
        "location": {
            "x": -100,
            "y": 200,
            "z": 500
        },
        "_id": "66d36653b3ecad5ed0c583e5",
        "name": "mars",
        "inventory": [],
        "__v": 0
    }
}
```

Possible Response Codes:
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



Possible Response:
```json
{
    "success": true,
    "planet": {
        "name": "uss",
        "inventory": [],
        "location": {
            "x": 3000,
            "y": -1200,
            "z": 6000
        },
        "_id": "66d3aa73a9e174b27fb4d1ce",
        "__v": 0
    }
}
```



Possible Response Codes:
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

```json

{
    "success": true,
    "planets": [
        {
            "location": {
                "x": -100,
                "y": 200,
                "z": 500
            },
            "_id": "66d36653b3ecad5ed0c583e5",
            "name": "mss",
            "inventory": [],
            "__v": 0
        },
        {
            "location": {
                "x": 900,
                "y": -200,
                "z": 600
            },
            "_id": "66d367c6423301d11adda36a",
            "name": "iss",
            "inventory": [],
            "__v": 0
        },
        {
            "location": {
                "x": 2000,
                "y": -1200,
                "z": 6000
            },
            "_id": "66d3aa73a9e174b27fb4d1ce",
            "name": "uss",
            "inventory": [],
            "__v": 0
        }
    ]
}

```


Possible Response Codes:
- 200: Space Stations retrieved successfully
- 500: Internal Server Error



#### Get Space Station by ID
```
GET /api/stations/:id
```

If you want to get a space station by ID, you can send a GET request to the above endpoint.

Possible Response:

```json
{
    "success": true,
    "planet": {
        "location": {
            "x": -100,
            "y": 200,
            "z": 500
        },
        "_id": "66d36653b3ecad5ed0c583e5",
        "name": "mss",
        "inventory": [],
        "__v": 0
    }
}
```

Possible Response Codes:
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



Possible Response:
```json
{
    "success": true,
    "item": {
        "name": "uranium",
        "description": "radioactive element",
        "value": 100,
        "_id": "66d3aa73a9e174b27fb4d1ce",
        "__v": 0
    }
}
```


Possible Response Codes:
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

```json

{
    "success": true,
    "planets": [
        {
            "location": {
                "x": -100,
                "y": 200,
                "z": 500
            },
            "_id": "66d36653b3ecad5ed0c583e5",
            "name": "mars",
            "inventory": [
                {
                    "item": "66d383a7744779bfe524ec7f",
                    "name": "Food",
                    "quantity": 3,
                    "_id": "66d3b518de779f8d5e6031d8"
                },
                {
                    "item": "66d3874c744779bfe524ec88",
                    "name": "Sanitation Products",
                    "quantity": 5,
                    "_id": "66d3b518de779f8d5e6031d9"
                }
            ],
            "__v": 0
        }
    ],
    "stations": []
}

```


Possible Responses Codes:
- 200: Items retrieved successfully
- 404: Item not found
- 500: Internal Server Error


#### Search Items by ID

If you want to search for an item by ID in Planets and Space Station Inventory, you can send a GET request to the following endpoint:

```
GET /api/items/:id
```

Possible Responses:

```json

{
    "success": true,
    "planets": [
        {
            "location": {
                "x": -100,
                "y": 200,
                "z": 500
            },
            "_id": "66d36653b3ecad5ed0c583e5",
            "name": "mars",
            "inventory": [
                {
                    "item": "66d383a7744779bfe524ec7f",
                    "name": "Food",
                    "quantity": 3,
                    "_id": "66d3b518de779f8d5e6031d8"
                },
                {
                    "item": "66d3874c744779bfe524ec88",
                    "name": "Sanitation Products",
                    "quantity": 5,
                    "_id": "66d3b518de779f8d5e6031d9"
                }
            ],
            "__v": 0
        }
    ],
    "stations": []
}

```


Possible Response Codes:
- 200: Item retrieved successfully
- 404: Item not found
- 500: Internal Server Error




## Instructions for API Testing

### Unit tests

To run the unit tests, you can use the following command:

```
npm run test
```


## Limitations and Future Improvements


## Scaling the system

### Scaling Strategies
 - Large Number of Concurrent Trade Transactions & Cargo Updates
 - High Data Volume & Complex Queries
 - Optimization: Caching, Data Partitioning & Indexing
