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

For this project - "Intergalactic Trading Network", I decided to go with the MVC (Model, View, Controller) architecture. This architecture is a software design pattern that separates the application into three main logical components: the model, the view, and the controller. Each of these components are built to handle specific development aspects of an application. This helps in improving the modularity of the API Service while keeping in mind the DRY (Don't Repeat Yourself) principle.

### Model

The model is responsible for managing the data and the schema of the application. It responds to the request from the view and to the instructions from the controller to update itself.

### View

The view is responsible for displaying the data that is received from the controller. It is the user interface that the user interacts with. Although, i haven't implemented this particular part yet. But, it is important to keep in mind that the view is responsible for displaying the data to the user.

### Controller

The controller is responsible for handling the request from the user and sending the response back to the user. It is the intermediary between the model and the view. It receives the request from the user, processes the request, and sends the response back to the user.


### Tech Stack Decision

- **Node.js**: I chose Node.js because it is a runtime environment that allows you to run JavaScript on the server. It is fast, scalable, and easy to use. It is also great for building RESTful APIs.

- **Express.js**: I chose Express.js because it is a fast, unopinionated, minimalist web framework for Node.js. It makes building RESTful APIs easier and faster.

- **MongoDB**: I chose MongoDB because it is a NoSQL database which is a great choice when dealing with high throughput or high volume data, as it is horizontally scalable. Also, MongoDB among NoSQL databases is the best when dealing with Real-Time Data, thus making it the perfect database for this project.

- **TypeScript**: I chose TypeScript because it is a superset of JavaScript that adds optional types to the language. It is easier to write and maintain code with TypeScript because of all the type safety features.

- **Socket.io**: I chose Socket.io because it is a real-time engine that enables real-time, bidirectional, and event-based communication. It is great for building real-time applications like chat applications, real-time analytics, and real-time games.



### Diagrams

## Schema Diagram
![Schema Diagrams](https://github.com/muteenk/intergalactic-trade-network/blob/main/assets/proposed_schema.png)

## User Flow Diagram
![User Flow Diagram](https://github.com/muteenk/intergalactic-trade-network/blob/main/assets/request_diagrams.png)



### Database Schema

#### User Schema

```
    name: string,
    email: string,
    password: string,
    role: "admin" | "vendor" | "user",
    location: ObjectID, // PlanetID or SpaceStationID
    locationType: "planet" | "spacestation",

```

#### Planet Schema

```
    name: string,
    inventory: [
        {
            item: ObjectID,
            quantity: number
        }
    ],
    location: {
        x: number,
        y: number,
        z: number
    }

```

#### Space Station Schema

```
    name: string,
    inventory: [
        {
            item: ObjectID,
            quantity: number
        }
    ],
    location: {
        x: number,
        y: number,
        z: number
    }

```

#### Item Schema

```
    name: string,
    description: string
```

#### Transaction Schema

```
    trade: ObjectID,
    currentLocation: ObjectID, // PlanetID or SpaceStationID
    currentLocationType: "planet" | "spacestation",
    destination: ObjectID, // PlanetID or SpaceStationID
    destinationType: "planet" | "spacestation",
    status: "pending" | "in-transit" | "completed" | "cancelled",
    estimatedDelivery: Date
```

#### Trade Schema

```
    sender: ObjectID, // PlanetID | SpaceStationID
    senderType: "planet" | "spacestation",
    senderItem: {
        item: ObjectID,
        quantity: Number
    },
    receiver: ObjectID, // PlanetID | SpaceStationID
    receiverType: "planet" | "spacestation",
    receiverItem: {
        item: ObjectID,
        quantity: Number,
    },
    createdAt: Date,
```








## Installation

### Prerequisites

- Node.js
- Package Manager of your choice (npm, yarn, pnpm, bun etc)
- MongoDB
- Socket.io
- TypeScript

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





#### Update Planet Inventory (Admin & Vendor Only)
```
PUT /api/planets/inventory/add/:id'
```

`:id` is the ObjectID of the planet.

If you want to update the inventory of a planet, you can send a PUT request to the above endpoint with the following payload:

```json
{
    "item": "66d383a7744779bfe524ec7f",
    "quantity": 100
}
```


In the above snippet:

- `item` is the ObjectID of items
- `quantity` is the quantity of the items


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
        "inventory": [
            {
                "item": "66d383a7744779bfe524ec7f",
                "name": "Food",
                "quantity": 103,
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
}
```


Possible Response Codes:

- 200: Inventory updated successfully
- 400: Bad request
- 401: Unauthorized
- 404: Planet not found/Item not found
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



#### Update Space Station Inventory (Admin & Vendor Only)
```
PUT /api/stations/inventory/add/:id'
```

`:id` is the ObjectID of the space station.

If you want to update the inventory of a space station, you can send a PUT request to the above endpoint with the following payload:

```json
{
    "item": "66d383a7744779bfe524ec7f",
    "quantity": 100
}
```

In the above snippet:

- `item` is the ObjectID of Items
- `quantity` is the quantity of the items


Possible Response:

```json
{
    "success": true,
    "station": {
        "location": {
            "x": -100,
            "y": 200,
            "z": 500
        },
        "_id": "66d36653b3ecad5ed0c583e5",
        "name": "mss",
        "inventory": [
            {
                "item": "66d383a7744779bfe524ec7f",
                "name": "Food",
                "quantity": 103,
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
}
```

Possible Response Codes:

- 200: Inventory updated successfully
- 400: Bad request
- 401: Unauthorized
- 404: Space Station not found/Item not found
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



#### Get all Items
```
GET /api/items/all
```

If you want to get all the items, you can send a GET request to the above endpoint.


Possible Responses:
```json
{
    "success": true,
    "items": [
        {
            "_id": "66d383a7744779bfe524ec7f",
            "name": "Food",
            "description": "2kg Potato",
            "value": 1000,
            "__v": 0
        },
        {
            "_id": "66d38689744779bfe524ec82",
            "name": "Space Suits",
            "value": 100000,
            "__v": 0
        },
        {
            "_id": "66d386a2744779bfe524ec85",
            "name": "Computer Components",
            "value": 10000,
            "__v": 0
        },
        {
            "_id": "66d3874c744779bfe524ec88",
            "name": "Sanitation Products",
            "value": 500,
            "__v": 0
        }
    ]
}
```

Possible Response Codes:

- 200: Items retrieved successfully
- 500: Internal Server Error







### Trade & Transaction Endpoints

For trade related operations, you can use the following endpoints:


#### Create a new Trade Transaction 
```
POST /api/transactions/new
```

If you want to create a new trade transaction, you can send a POST request to the above endpoint with the following payload:

```json
{
    "sender": "66d36653b3ecad5ed0c583e5",
    "senderType": "planet",
    "senderItem": {
        "item": "66d383a7744779bfe524ec7f",
        "quantity": 2
    },
    "receiverItem": {
        "item": "66d3874c744779bfe524ec88",
        "quantity": 3
    },
    "estimatedDelivery": "05-09-2024"
}
```


In the above snippet:
- `sender` is the ObjectID of the other party
- `senderType` is the type of the sender. It can be either `planet` or `spacestation`
- `senderItem` is the item to be sent by the sender. It is an object with the following fields:
    - `item` is the ObjectID of the item
    - `quantity` is the quantity of the item
- `receiverItem` is the item to be received by the you (your planet / space station). It is an object with the following fields:
    - `item` is the ObjectID of the item
    - `quantity` is the quantity of the item
- `estimatedDelivery` is the estimated delivery date of the trade transaction



Possible Response:

```json
{
    "success": true,
    "trade": {
        "sender": "66d36653b3ecad5ed0c583e5",
        "senderType": "planet",
        "senderItem": {
            "item": "66d383a7744779bfe524ec7f",
            "quantity": 2
        },
        "receiver": "66d3742e088a2b8e1ddcc052",
        "receiverType": "spacestation",
        "receiverItem": {
            "item": "66d3874c744779bfe524ec88",
            "quantity": 3
        },
        "_id": "66d4e161103d1f38f2b8dfbf",
        "createdAt": "2024-09-01T21:49:21.252Z",
        "__v": 0
    },
    "transaction": {
        "trade": "66d4e161103d1f38f2b8dfbf",
        "currentLocation": "66d36653b3ecad5ed0c583e5",
        "currentLocationType": "planet",
        "destination": "66d3742e088a2b8e1ddcc052",
        "destinationType": "spacestation",
        "status": "pending",
        "estimatedDelivery": "2024-05-08T18:30:00.000Z",
        "_id": "66d4e161103d1f38f2b8dfc1",
        "__v": 0
    }
}
```

Possible Response Codes:
- 201: Trade transaction created successfully
- 400: Bad request
- 401: Unauthorized
- 500: Internal Server Error



#### Get all Trade Transactions
```
GET /api/transactions/track/all
```

If you want to get all the trade transactions, you can send a GET request to the above endpoint.


Possible Responses:

```json
{
    "success": true,
    "transactions": [
        {
            "_id": "66d4e161103d1f38f2b8dfc1",
            "trade": "66d4e161103d1f38f2b8dfbf",
            "currentLocation": "66d36653b3ecad5ed0c583e5",
            "currentLocationType": "planet",
            "destination": "66d3742e088a2b8e1ddcc052",
            "destinationType": "spacestation",
            "status": "pending",
            "estimatedDelivery": "2024-05-08T18:30:00.000Z",
            "__v": 0
        }
    ]
}
```


Possible Response Codes:
- 200: Trade transactions retrieved successfully
- 500: Internal Server Error





#### Get Trade Transaction by ID
```
GET /api/transactions/track/:id
```

If you want to get a trade transaction by ID, you can send a GET request to the above endpoint.


Possible Response:

```json
{
    "success": true,
    "transaction": {
        "_id": "66d4e161103d1f38f2b8dfc1",
        "trade": "66d4e161103d1f38f2b8dfbf",
        "currentLocation": "66d36653b3ecad5ed0c583e5",
        "currentLocationType": "planet",
        "destination": "66d3742e088a2b8e1ddcc052",
        "destinationType": "spacestation",
        "status": "pending",
        "estimatedDelivery": "2024-05-08T18:30:00.000Z",
        "__v": 0
    }
}
```

Possible Response Codes:
- 200: Trade transaction retrieved successfully
- 404: Trade transaction not found
- 500: Internal Server Error



#### Update Transactions (Vendor & Admin only)
```
PUT /api/transactions/update/:id
```

`:id` is the ObjectID of the transaction.


If you want to update details of a transaction as a vendor or an admin, you can send a PUT request to the above endpoint with the following payload:

```json
{ 
    "currentLocation": ObjectID, 
    "currentLocationType": "planet" | "spacestation",
    "status": "in-transit", 
    "estimatedDelivery": "2024-05-08"
}
```


In the above snippet:
- `currentLocation` is the ObjectID of the current location
- `currentLocationType` is the type of the current location. It can be either `planet` or `spacestation`
- `status` is the status of the transaction. It can be either `pending`, `in-transit`, `completed`, or `cancelled`
- `estimatedDelivery` is the estimated delivery date of the transaction


Possible Response:

```json
{
    "success": true,
    "transaction": {
        "_id": "66d4e161103d1f38f2b8dfc1",
        "trade": "66d4e161103d1f38f2b8dfbf",
        "currentLocation": "66d36653b3ecad5ed0c583e5",
        "currentLocationType": "planet",
        "destination": "66d3742e088a2b8e1ddcc052",
        "destinationType": "spacestation",
        "status": "in-transit",
        "estimatedDelivery": "2024-05-08T18:30:00.000Z",
        "__v": 0
    }
}
```


Possible Response Codes:
- 200: Transaction updated successfully
- 400: Bad request
- 401: Unauthorized
- 404: Transaction not found
- 500: Internal Server Error




## Instructions for API Testing

### Unit tests

To run the unit tests, you can use the following command:

```
npm run test
```


## Limitations and Future Improvements

### Limitations

- Doesn't have caching implemented yet
- The Database real-time updations are not fully enabled yet
- The system is not fully optimized for high throughput data
- It is deployed on the a free tier server

### Future Improvements

- Implement caching to store frequently accessed data using Redis
- Enable all the Real-Time Database Features of MongoDB
- Implementation of PUB/SUBS for message queueing so that it is able to manage high volume data in real-time
- Extended Features like Ratings, Planet & SpaceStation Data 



## Scaling the system

### Scaling Strategies
 - Large Number of Concurrent Trade Transactions & Cargo Updates
 - High Data Volume & Complex Queries
 - Optimization: Caching, Data Partitioning & Indexing
 - Real-Time Notifications
 - High Availability & Fault Tolerance
