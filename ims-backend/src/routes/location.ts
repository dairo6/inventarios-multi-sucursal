import { Router, Application } from "express";
import { LocationController } from "../controllers/location.controller";

export class LocationRoutes {
  public locationController: LocationController = new LocationController();

  public routes(app: Application): void {
    app.route("/ubicaciones").get(this.locationController.getAllLocations); // Get all locations

    app.route("/ubicaciones/:id").get(this.locationController.getLocationById); // Get a location by ID

    app.route("/ubicaciones").post(this.locationController.createLocation); // Create a new location

    app.route("/ubicaciones/:id").put(this.locationController.updateLocation); // Update a location by ID

    app.route("/ubicaciones/:id").delete(this.locationController.deleteLocation); // Delete a location by ID

    app.route("/ubicaciones/id/:logic").get(this.locationController.deleteLocationAdv); // Advanced delete location

  }
}   