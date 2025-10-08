import { Request, Response } from "express";
import { Location, LocationI } from "../models/location";

export class LocationController {
  // get all locations with status "ACTIVE"
  public async getAllLocations(req: Request, res: Response) {
    try {
      const locations: LocationI[] = await Location.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ locations });
    } catch (error) {
      res.status(500).json({ error: "Error fetching locations" });
    }
  }

  // get a location by ID
  public async getLocationById(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const location = await Location.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (location) {
        res.status(200).json(location);
      } else {
        res.status(404).json({ error: "Location not found or inactive" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error fetching location" });
    }
  }

  // Create a new location
  public async createLocation(req: Request, res: Response) {
    const { warehouse_id, code, description, status } = req.body;

    try {
      const body: LocationI = {
        warehouse_id,
        code,
        description,
        status,
        
      };

      const newLocation = await Location.create({ ...body });
      res.status(201).json(newLocation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Update a location
  public async updateLocation(req: Request, res: Response) {
    const { id: pk } = req.params;
    const { warehouse_id, code, description, status } = req.body;

    try {
      const locationExist = await Location.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (locationExist) {
        await locationExist.update(
          {
            warehouse_id,
            code,
            description,
            status
          });
        res.status(200).json(locationExist);
      } else {
        res.status(404).json({ error: "Location not found or inactive" });
      }
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  // Delete a location physically
  public async deleteLocation(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const locationToDelete = await Location.findByPk(id);

      if (locationToDelete) {
        await locationToDelete.destroy();
        res.status(200).json({ message: "Location deleted successfully" });
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error deleting location" });
    }
  }

  // Delete a location logically (set status to "INACTIVE")
  public async deleteLocationAdv(req: Request, res: Response) {
    try {
      const { id: pk } = req.params;
      const locationToUpdate = await Location.findOne({
        where: { id: pk, status: "ACTIVE" },
      });

      if (locationToUpdate) {
        await locationToUpdate.update({ status: "INACTIVE" });
        res.status(200).json({ message: "Location marked as inactive" });
      } else {
        res.status(404).json({ error: "Location not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Error marking location as inactive" });
    }
  }
}
