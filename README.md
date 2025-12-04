# PROJECT

##Setup
Copy project into your computer and then run
    npm install
    npm start

## Tables

### Tram
| id | name | numberOfCars | lineId | nextStopId
| ----------- | ----------- | ----------- | ----------- | ----------- |
| Integer | String | Integer | Integer | Integer


### Line
| id | name |
| ----------- | ----------- |
| Integer | String |

### Stop
| id | name |
| ----------- | ----------- |
| Integer | String |

### LineStop
| id | lineId | stopId | order |
| ----------- | ----------- | ----------- | ----------- |
| Integer | Integer | Integer | Integer |

## Example queries

### Display all of a table

GET http://localhost:3000/stops

GET http://localhost:3000/lines

GET http://localhost:3000/trams

### Add a new row to table

POST http://localhost:3000/stops

    { "name": "Tuulensuu" }


POST http://localhost:3000/lines

    {
        "name": "Hervanta - Keskustori",
        "stops": [
            { "stopId": 1, "order": 1 },
            { "stopId": 2, "order": 2 }
        ]
    }

POST http://localhost:3000/trams

    {
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

GET /trams/search?name=Veera&lineId=2&minCars=3&maxCars=6&nextStopId=2

GET /stops/search?name=1

GET /lines/search?name=1
