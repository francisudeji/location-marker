## Location Marker

### How to run

1. Clone this repository by running `git clone https://gitlab.com/francisudeji/location-marker.git` in your terminal.
2. Obtain a Google **API KEY** by visiting the [Google Maps Platform](https://cloud.google.com/maps-platform/?_ga=2.217999318.1584798621.1572112623-1130989767.1568743778#get-started). Make sure you check **Maps** and **Places** checkboxes before hitting continue.
3. Create a Mongodb account [here](https://www.mongodb.com/cloud/atlas) if you don't have one, then create an cluster and obtain a connection string specific to that cluster.
4. In the `backend` folder, create a `.env` file and paste in this snippet:

```
MONGODB_URI=YOUR_MONGO_DB_URI
GOOGLE_API_KEY=YOUR_GOOGLE_MAP_API_KEY
```

5. In the `frontend` folder, create a `.env.development` file and paste in this snippet:

```
GOOGLE_API_KEY=YOUR_GOOGLE_MAP_API_KEY
```

6. Replace all placeholder values with your actual credentials and add all `.env` files to `.gitignore`.
7. Run `yarn` in both `backend` and `frontend` folders.
8. To run the Apollo Server, `cd backend` and `yarn server`
9. To run the React Development Server, `cd frontend` and `yarn start`.
10. To access your GraphQL endpoint, visit [http://localhost:4000](http://localhost:4000).
11. To access your react front end, visit [http://localhost:3000](http://localhost:3000).

### Testing

During my testing, I used a separate MongoDB cluster and I'd recomment you do same.

To run tests, simply run `yarn test` in backend folder and frontend folder to run them individually.
