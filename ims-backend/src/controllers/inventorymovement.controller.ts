import { Request, Response } from "express";
import { InventoryMovement, InventoryMovementI } from "../models/inventorymovement";
import { Product } from "../models/product";
import { Warehouse } from "../models/warehouse";
import { Lot } from "../models/lot";

export class InventoryMovementController {
    // Get all inventory movements
    public async getAllMovements(req: Request, res: Response) {
        try {
            const movements: InventoryMovementI[] = await InventoryMovement.findAll({
                include: [
                    { model: Product, as: "product" },
                    { model: Warehouse, as: "warehouse" },
                    { model: Lot, as: "lot" },
                ],
            });
            res.status(200).json(movements);
        } catch (error) {
            res.status(500).json({ error: "Error fetching inventory movements" });
        }
    }

    // Get a single inventory movement by ID
    public async getMovementById(req: Request, res: Response) {
        try {
            const { id: pk } = req.params;
            const movement = await InventoryMovement.findOne({
                where: { id: pk },
            });

            if (movement) {
                res.status(200).json(movement);
            } else {
                res.status(404).json({ error: "Inventory movement not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error fetching inventory movement" });
        }
    }

    // Create a new inventory movement
    public async createMovement(req: Request, res: Response) {
        const { product_id, warehouse_id, lot_id, movementType, quantity, reference } = req.body;

        try {
            const newMovement = await InventoryMovement.create({
                product_id,
                warehouse_id,
                lot_id,
                movementType,
                quantity,
                reference,
            });

            res.status(201).json(newMovement);

        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }


    // Update an inventory movement
    public async updateMovement(req: Request, res: Response) {
        const { id: pk } = req.params;
        const { product_id, warehouse_id, lot_id, movementType, quantity, reference } = req.body;

        try {
            const movementExist = await InventoryMovement.findOne({ where: { id: pk } });

            if (movementExist) {
                await movementExist.update({
                    product_id,
                    warehouse_id,
                    lot_id,
                    movementType,
                    quantity,
                    reference,
                });
                res.status(200).json(movementExist);
            } else {
                res.status(404).json({ error: "Inventory movement not found" });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    // Delete an inventory movement physically
    public async deleteMovement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const movementToDelete = await InventoryMovement.findByPk(id);

            if (movementToDelete) {
                await movementToDelete.destroy();
                res.status(200).json({ message: "Inventory movement deleted successfully" });
            } else {
                res.status(404).json({ error: "Inventory movement not found" });
            }
        } catch (error) {
            res.status(500).json({ error: "Error deleting inventory movement" });
        }
    }

    //Delete inventory movements logically (change status to INACTIVE)
    public async deleteInventoryMovementAdv(req: Request, res: Response) {
        try {
            const { id: pk } = req.params;

            const movement = await InventoryMovement.findOne({
                where: { id: pk, status: "ACTIVE" },
            });

            if (!movement) {
                return res.status(404).json({
                    error: "Inventory movement not found or already inactive"
                });
            }

            await movement.update({ status: "INACTIVE" });

            res.status(200).json({
                message: "Inventory movement deactivated successfully",
                movement
            });

        } catch (error) {
            res.status(500).json({ error: "Error deactivating inventory movement" });
        }
    }

}
