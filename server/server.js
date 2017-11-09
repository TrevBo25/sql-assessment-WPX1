require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive');

const app = express();
app.use(cors());
app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then( db => {
    app.set('db', db);

    db.init_tables.user_create_seed().then( response => {
        console.log('User table init');
        db.init_tables.vehicle_create_seed().then( response => {
          console.log('Vehicle table init');
        }).catch(err => console.log('vehicle table', err))
      }).catch( err => console.log('user table', err))
}).catch('err', err => console.log(err))

const PORT = 3000;
app.listen(PORT, () => console.log("I hear ya brotha' on port ", PORT));