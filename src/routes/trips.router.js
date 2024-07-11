"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tripsRouter = void 0;
var trips_controller_1 = require("../controllers/trips.controller");
var tripsRouter = function (app, _opts, done) {
    var tripController = new trips_controller_1.TripsController();
    app.post('/', tripController.createTrip);
    app.get('/:tripId', tripController.confirmTrip);
    done();
};
exports.tripsRouter = tripsRouter;
