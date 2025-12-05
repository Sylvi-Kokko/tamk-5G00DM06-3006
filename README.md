# PROJECT

## Setup
Copy project into your computer and then run

    npm install
    npm install sqlite3
    npm install sequelize
    npm start

## Base URL

    http://localhost:3000

## General responses and validation

- Success: 200 OK (or 201 Created for POST)
- Client error: 400 Bad Request (validation / malformed payload)
- Not found: 404 Not Found
- Conflict: 409 Conflict (id already in use)
- Server error: 500 Internal Server Error

## Data model summary

- Tram: { id, name, numberOfCars, lineId, nextStopId }
- Line: { id, name }
- Stop: { id, name }
- LineStop: { id, lineId, stopId, order } (join table between Line and Stop)

Relationships:
- Line has many Stops through LineStop (with order).
- Tram belongs to a Line and has nextStopId referencing Stop.

# Endpoints

### Stops

GET /stops
- Returns: 200 - array of Stop objects (each { id, name })
- No query parameters.

GET /stops/:id
- Path parameters:
  - id (integer, required) - stop id
- Validation: id must be integer → 400 if not.
- Responses:
  - 200 - Stop object
  - 404 - Stop not found

POST /stops
- Body (JSON):
  - name (string, required) - non-empty
  - id (integer) -must be integer and not already used → 409 if in use
- Responses:
  - 201 - created Stop object
  - 400 - validation error
  - 409 - id already in use

PUT /stops/:id
- Path parameters:
  - id (integer, required)
- Body (JSON):
  - name (string, optional) - when present must be a valid non-null string
- Responses:
  - 200 - { message: "Updated" }
  - 400 - validation error
  - 404 - if resource not found

DELETE /stops/:id
- Path parameters:
  - id (integer, required) - must be integer
- Responses:
  - 200 - { message: "Deleted" } (controller uses 200 with message)
  - 404 - if resource not found
  - 400 - validation error

GET /stops/search
- Query parameters:
  - name (string, optional) - partial match
- Validation: name validated with validateString if present
- Response: 200 - array of matching stops

---

### Lines

GET /lines
- Response: 200 - array of Line objects

GET /lines/:id
- Path parameters:
  - id (integer, required)
- Responses:
  - 200 - Line object (optionally with stops)
  - 400 - Bad request, id must be an integer
  - 404 - Not found

POST /lines
- Body (JSON):
  - name (string, required)
  - id (integer) - must be integer and unique
  - stops (array, optional) - each item: { stopId: integer, order: integer (min 1) }
- Responses:
  - 201 - created Line
  - 400 - validation error
  - 404 - referenced stop not found
  - 409 - id already in use

PUT /lines/:id
- Path parameters:
  - id (integer, required)
- Body (JSON):
  - name (string, optional)
  - stops (array, optional)
- Responses:
  - 200 - { message: "Updated" } or { message: "Line stops order updated" } when stops changed
  - 400 / 404 as above

DELETE /lines/:id
- Path parameters:
  - id (integer, required)
- Response:
  - 200 - { message: "Deleted" }
  - 400 - validation error

GET /lines/search
- Query parameters:
  - name (string, optional)
- Response: 200 - array of matching lines

---

### Trams

GET /trams
- Response: 200 - array of Tram objects

GET /trams/:id
- Path parameters:
  - id (integer, required)
- Response:
  - 200 - Tram object
  - 404 - Not found

POST /trams
- Body (JSON):
  - id (integer, required)
  - name (string, required)
  - numberOfCars (integer, required, min 3)
  - lineId (integer, required) - must reference existing Line
  - nextStopId (integer, optional) - must reference existing Stop
- Responses:
  - 201 - created Tram object (returned with included relations)
  - 400 - validation error
  - 404 - referenced resource missing

PUT /trams/:id
- Path parameters:
  - id (integer, required)
- Body (JSON):
  - name (string, optional)
  - numberOfCars (integer, optional, min 3)
  - lineId (integer, optional)
  - nextStopId (integer or null, optional)
- Responses:
  - 200 - { message: "Updated" }
  - 400 - validation error
  - 404 - referenced resource missing

DELETE /trams/:id
- Path parameters:
  - id (integer, required)
- Validation: id integer
- Response:
  - 200 - { message: "Deleted" }
  - 400 - validation error

GET /trams/search
- Query parameters (all optional):
  - name (string) - partial match
  - lineId (integer) - exact match
  - minCars (integer) - numberOfCars >= minCars
  - maxCars (integer) - numberOfCars <= maxCars
  - nextStopId (integer) - exact match
- Response: 200 - array of matching Tram objects

## Example requests

## Example queries

### Display all of a table

GET http://localhost:3000/stops

GET http://localhost:3000/lines

GET http://localhost:3000/trams

### Add a new row to table

POST http://localhost:3000/stops

    {
      "id" : 1,
      "name": "Tuulensuu"
    }


POST http://localhost:3000/lines

    {
      "id" : 1,
      "name": "Hervanta - Keskustori",
      "stops": [
          { "stopId": 1, "order": 1 },
          { "stopId": 2, "order": 2 }
      ]
    }

POST http://localhost:3000/trams

    {
        "id" : 1,
        "name": "Lyyli lajinsa ensimmäinen",
        "numberOfCars": 3,
        "lineId": 1,
        "nextStopId": 2
    }

### Update a row

PUT http://localhost:3000/stops/1

    { "name": "Tuulensuun Aukio" }


PUT http://localhost:3000/lines/1

    {
        "name": "Hervanta - Keskustori",
        "stops": [
            { "stopId": 2, "order": 1 },
            { "stopId": 1, "order": 2 }
        ]
    }

PUT http://localhost:3000/trams/1

    {
        "name": "Veera",
        "numberOfCars": 3,
        "lineId": 19,
        "nextStopId": 2
    }

### Delete a row

PUT http://localhost:3000/stops/1

PUT http://localhost:3000/lines/1

PUT http://localhost:3000/trams/1

### Search

GET http://localhost:3000/trams/search?name=Veera&lineId=2&minCars=3&maxCars=6&nextStopId=2

GET http://localhost:3000/stops/search?name=1

GET http://localhost:3000/lines/search?name=1