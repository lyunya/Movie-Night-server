# Movie Night Server

### Movie Night App was developed to help you and your friends decide what movie to watch together.

## Server Hosted here:
https://floating-mountain-13173.herokuapp.com/

## API Documentation

### Routes
#### Login
'/api/auth/login'
Method: Post
Required:
    email=[string],
    string=[string]
Success Response:
Code: 200
Sample Data: {
        "authToken": [string]
        "userId": 1
    }
Error Response:
Code: 400
Content: { error: "Incorrect email or password }

#### Movie List endpoint
'/api/lists'

Method: Get
Returns all lists
Success Response:
Code: 200
Sample Data: {
        "id": 2
        "name": "Monday Morning"
        "user_id": 1
    }

Method: Post
Inserts new movie list
Required:
        name=[string]
Success Response: 
Code: 201
Content: Movie list in JSON
Error Response:
Code: 400
Content: { message: "Must have a list name" }

Method: Delete
Deletes movie list object from database
Required:
        id=[integer]
Success Response: 
Code: 204

#### Movies endpoint
'/api/movies'

Method: Get
Returns all movies
Success Response:
Code: 200
Sample Data: {
        "id": 40,
        "title": "Enemy",
        "overview": "A mild-mannered college professor discovers a look-alike actor and delves into the other man's private affairs.",
        "poster_path": "/coJzyPTkSp4RMRGdgE7pXmJbCiG.jpg",
        "movielist_id": 37,
        "votes": 41
    }

Method: Post
Inserts new movie object
Required:
        title=[string],
        overview=[string]
        poster_path=[string]
        movielist_id=[integer]
        votes=[integer]
Success Response: 
Code: 201
Content: Movie object in JSON
Error Response:
Code: 400
Content: { error: "Missing ${key} in request body" }

Method: Put
Updates vote count in movie object
Required:
        id=[integer]
        title=[string]
        overview=[string]
        poster_path=[string]
        movielist_id=[integer]
        votes=[integer]
Success Response: 
Code: 204

#### Users endpoint
'/api/users'
Method: Post
Inserts new user
Required:
        email=[string],
        password=[string]

Success Response: 
Code: 201
Content: user object in JSON { "id": [integer], "email": [string]}
Error Response:
Code: 400
Content: { error: "Missing ${field} in request body" }
or
Code: 400
Content: { error: "Email already taken" }


## Technology Used
* Node.js
* Express
* Mocha
* Chai
* Postgres
* JWT
* Knex.js

## Security
Application uses JWT authentication