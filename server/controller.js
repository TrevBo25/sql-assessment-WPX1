module.exports = {
    users(req, res){
        const db = req.app.get('db');
        db.get_users()
        .then( response => {
            res.status(200).json(response);
        }).catch(err => console.log(err))
    },
    vehicles(req, res){
        const db = req.app.get('db');
        db.get_vehicles()
        .then( response => {
            res.status(200).json(response);
        }).catch(err => console.log(err))
    },
    addUser(req, res){
        const db = req.app.get('db');
        const {name, email} = req.body; 
        db.create_user([name, email])
        .then( response => {
            res.status(200).json(response);
        }).catch(err => console.log(err))
    },
    addVehcile(req, res){
        const db = req.app.get('db');
        const {make, model, year, owner_id} = req.body;
        db.create_vehicle([make, model, year, owner_id])
        .then( response => {
            res.status(200).json(response);
        }).catch(err => console.log(err))
    },
    userVehicleCount(req, res){
        const db = req.app.get('db');
        const {userId} = req.params;
        db.user_vehicle_count([userId])
        .then( response => {
            res.status(200).send(response)
        }).catch(err => console.log(err))
    },
    userVehicles(req, res){
        const db = req.app.get('db');
        const {userId} = req.params;
        db.get_user_vehicles([userId])
        .then( response => {
            res.status(200).json(response);
        })
    },
    vehiclesByQ(req, res){
        console.log('bang');
        const db = req.app.get('db');
        const userEmail = req.query.userEmail || null;
        const userFirstStart = req.query.userFirstStart || null;
        if(userEmail){
            db.vehicles_by_email([userEmail])
            .then( response => {
                res.status(200).json(response);
            })
        } else if (userFirstStart){
            db.get_users_names()
            .then( response => {
                response.forEach((e, i, a) => {
                    if(e.name.startsWith(userFirstStart)){
                        db.vehicles_by_name([e.name])
                        .then( cars => {
                            res.status(200).json(cars);
                        })
                    }
                }, this);
            })
        }
    },
    newerVehicles(req, res){
        const db = req.app.get('db');
        db.newer_vehicles()
        .then( response => {
            res.status(200).json(response);
        })
    },
    newOwner(req, res){
        const db = req.app.get('db');
        const {userId, vehicleId} = req.params;
        db.new_owner([userId, vehicleId])
        .then( response => {
            res.status(200).json(response);
        })
    },
    deleteOwner(req, res){
        const db = req.app.get('db');
        const {userId, vehicleId} = req.params;
        db.delete_owner([userId, vehicleId])
        .then( response => {
            res.status(200).json(response)
        })
    },
    deleteVehicle(req, res){
        const db = req.app.get('db');
        const {vehicleId} = req.params;
        db.delete_vehicle([vehicleId])
        .then( response => {
            res.status(200).json(response)
        })
    }
}