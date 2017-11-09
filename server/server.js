require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      massive = require('massive')
      ctrl = require('./controller');

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

app.get('/api/users', ctrl.users);
app.get('/api/vehicles', ctrl.vehicles);
app.post('/api/users', ctrl.addUser);
app.post('/api/vehicles', ctrl.addVehcile);
app.get('/api/user/:userId/vehiclecount', ctrl.userVehicleCount);
app.get('/api/user/:userId/vehicle', ctrl.userVehicles);
app.get('/api/vehicle', ctrl.vehiclesByQ);
app.get('/api/newervehiclesbyyear', ctrl.newerVehicles);
app.put('/api/vehicle/:vehicleId/user/:userId', ctrl.newOwner);
app.delete('/api/user/:userId/vehicle/:vehicleId', ctrl.deleteOwner);
app.delete('/api/vehicle/:vehicleId', ctrl.deleteVehicle);


const PORT = 3000;
app.listen(PORT, () => console.log("I hear ya brotha' on port ", PORT));