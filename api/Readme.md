# Parking app backend

The parking app backend is built with Node.js + Express. Unit tests are run with Vitest. Bundling happens with Vite.

## Environment variables
Development mode variables can be found in `config/.env.local`. In production, they are supplied to the Docker container.

- `VITE_MONGO_URL: string`, Database url containing the full connection string and database. Defaults to "mongodb://127.0.0.1:27017/parking"
- `VITE_LOCATION_ID: string`, Location id to use with the app if multiple instances share the database. Defaults to "1".
- `VITE_PARKING_CAPACITY: number(integer)`, Assigns a maximum capacity for the location. Defaults to 5.
- `VITE_PARKING_BILLING_INTERVAL: number(integer)`, Minimum minute intervals to charge the customer. Eg. the value 10 means the parking rate applies for each starting 10 minutes.
- `VITE_PARKING_RATES: {minutes: [number, number|null], rate: number}[]`, The applied parking rates for each range of minutes. `minutes[0]` is the lower bound and `minutes[1]` is the upper bound where the rate is applicable. If `minutes[1]` is null, the rate applies through to the end of the parking. The value of `rate` is the number of *cents* the user is charged every billing interval. Defaults to [{"minutes":[0,180],"rate":50},{"minutes":[180,null],"rate":30}]

## Structure

`config`: Holds the local config that are loaded through dotenv. 

`src/models`: Contains the Mongoose models for the application

`src/routes`: Contains the application route handlers organized by subroute. Contains also the validation schemas to validate incoming requests with Zod and some helpers.

`src/services`: Contains much of the application business logic. The most important services here are `ConfigProvider` that provides the application configuration to its consumers, `ParkingHandler` that handles parking-related business logic and `RateCalculator` that calculates the billable amount after parking is done. This folder also contains repositories to abstract database logic from business logic.



