import { Router, Application } from "express";
import { LocationController } from "../controllers/location.controller";
import { authMiddleware } from "../middleware/auth";
export class LocationRoutes {
  public locationController: LocationController = new LocationController();

  public routes(app: Application): void {

    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/ubicaciones")
      .get(this.locationController.getAllLocations) // Get all locations
      .post(this.locationController.createLocation); // Create a new location

    app.route("/ubicaciones/:id")
      .get(this.locationController.getLocationById) // Get a location by ID
      .patch(this.locationController.updateLocation) // Update a location by ID
      .delete(this.locationController.deleteLocation); // Delete a location by ID

    app.route("/ubicaciones/:id/logic")
      .delete(this.locationController.deleteLocationAdv); // Advanced delete location


    // ================== RUTAS CON AUTENTICACIÓN ==================
        // Si se requieren rutas protegidas, se pueden agregar aquí:
    
    app.route("/api/ubicaciones")
      .get(authMiddleware, this.locationController.getAllLocations) // Get all locations
      .post(authMiddleware, this.locationController.createLocation); // Create a new location

    app.route("/api/ubicaciones/:id")
      .get(authMiddleware, this.locationController.getLocationById) // Get a location by ID
      .patch(authMiddleware, this.locationController.updateLocation) // Update a location by ID
      .delete(authMiddleware, this.locationController.deleteLocation); // Delete a location by ID

    app.route("/api/ubicaciones/:id/logic")
      .delete(authMiddleware, this.locationController.deleteLocationAdv); // Advanced delete location
  }
}   