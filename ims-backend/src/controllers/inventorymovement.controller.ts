import { Request, Response } from "express";
import { InventoryMovement, InventoryMovementI } from "../models/inventorymovement";
import { Product } from "../models/product";
import { Warehouse } from "../models/warehouse";
import { Lot } from "../models/lot";

export class InventoryMovementController {

    // ------------------------------------------------------------------
    // GET ALL movements
    // ------------------------------------------------------------------
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

    // ------------------------------------------------------------------
    // GET ONE movement
    // ------------------------------------------------------------------
    public async getMovementById(req: Request, res: Response) {
        try {
            const { id: pk } = req.params;

            const movement = await InventoryMovement.findOne({
                where: { id: pk },
            });

            if (!movement) {
                return res.status(404).json({ error: "Inventory movement not found" });
            }

            return res.status(200).json(movement);

        } catch (error) {
            res.status(500).json({ error: "Error fetching inventory movement" });
        }
    }

    // ------------------------------------------------------------------
    // CREATE movement
    // ------------------------------------------------------------------
    public async createMovement(req: Request, res: Response) {
        try {
            const { product_id, warehouse_id, lot_id, movementType, quantity, reference } = req.body;

            // Crear movimiento
            const movement = await InventoryMovement.create({
                product_id,
                warehouse_id,
                lot_id: lot_id ?? null,
                movementType,
                quantity,
                reference
            });

            // PRODUCTO
            const product = await Product.findByPk(product_id);
            if (!product) return res.status(404).json({ message: "Producto no encontrado" });

            // Ajustar stock del producto
            if (movementType === "IN") product.quantity += quantity;

            if (movementType === "OUT") {
                if (product.quantity - quantity < 0)
                    return res.status(400).json({ message: "No hay suficiente stock del producto" });

                product.quantity -= quantity;
            }

            if (movementType === "TRANSFER") {
                if (product.quantity - quantity < 0)
                    return res.status(400).json({ message: "Stock insuficiente para transferencia" });

                product.quantity -= quantity;
            }

            await product.save();

            // LOTE (solo si se selecciona)
            if (lot_id) {
                const lot = await Lot.findByPk(lot_id);
                if (!lot) return res.status(404).json({ message: "Lote no encontrado" });

                if (movementType === "IN") lot.quantity += quantity;

                if (movementType === "OUT") {
                    if (lot.quantity - quantity < 0)
                        return res.status(400).json({ message: "Cantidad insuficiente en este lote" });

                    lot.quantity -= quantity;
                }

                await lot.save();
            }

            return res.status(201).json({
                message: "Movimiento registrado correctamente",
                movement,
                updatedProduct: product
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error creando movimiento", error });
        }
    }

    // ------------------------------------------------------------------
    // UPDATE movement
    // ------------------------------------------------------------------
    public async updateMovement(req: Request, res: Response) {

        const { id: pk } = req.params;
        const { product_id, warehouse_id, lot_id, movementType, quantity, reference } = req.body;

        try {
            const movementExist = await InventoryMovement.findByPk(pk);
            if (!movementExist) return res.status(404).json({ error: "Movement not found" });

            // PRODUCTO ANTERIOR
            const oldProduct = await Product.findByPk(movementExist.product_id);
            if (!oldProduct) return res.status(404).json({ error: "Product not found" });

            // Revertir valores del producto
            if (movementExist.movementType === "IN") oldProduct.quantity -= movementExist.quantity;
            if (movementExist.movementType === "OUT") oldProduct.quantity += movementExist.quantity;

            await oldProduct.save();

            // Revertir valores del lote anterior (si existía)
            if (movementExist.lot_id) {
                const oldLot = await Lot.findByPk(movementExist.lot_id);
                if (oldLot) {
                    if (movementExist.movementType === "IN") oldLot.quantity -= movementExist.quantity;
                    if (movementExist.movementType === "OUT") oldLot.quantity += movementExist.quantity;
                    await oldLot.save();
                }
            }

            // PRODUCTO NUEVO
            const newProduct = await Product.findByPk(product_id);
            if (!newProduct) return res.status(404).json({ error: "New product not found" });

            // Aplicar nuevo movimiento al producto
            if (movementType === "IN") newProduct.quantity += quantity;

            if (movementType === "OUT") {
                if (newProduct.quantity - quantity < 0)
                    return res.status(400).json({ message: "Stock insuficiente del producto" });

                newProduct.quantity -= quantity;
            }

            await newProduct.save();

            // Aplicar nuevo movimiento al lote
            if (lot_id) {
                const newLot = await Lot.findByPk(lot_id);
                if (!newLot) return res.status(404).json({ error: "New lot not found" });

                if (movementType === "IN") newLot.quantity += quantity;

                if (movementType === "OUT") {
                    if (newLot.quantity - quantity < 0)
                        return res.status(400).json({ message: "Lote sin suficiente stock" });

                    newLot.quantity -= quantity;
                }

                await newLot.save();
            }

            // Actualizar movimiento
            await movementExist.update({
                product_id,
                warehouse_id,
                lot_id: lot_id ?? null,
                movementType,
                quantity,
                reference,
            });

            return res.status(200).json({
                message: "Movimiento actualizado y stock ajustado",
                movement: movementExist,
            });

        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    // ------------------------------------------------------------------
    // DELETE physical
    // ------------------------------------------------------------------
    public async deleteMovement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const movementToDelete = await InventoryMovement.findByPk(id);

            if (!movementToDelete) {
                return res.status(404).json({ error: "Movement not found" });
            }

            await movementToDelete.destroy();
            res.status(200).json({ message: "Inventory movement deleted successfully" });

        } catch (error) {
            res.status(500).json({ error: "Error deleting movement" });
        }
    }

    // ------------------------------------------------------------------
    // DELETE logical
    // ------------------------------------------------------------------
    public async deleteInventoryMovementAdv(req: Request, res: Response) {
        try {
            const { id: pk } = req.params;

            const movement = await InventoryMovement.findOne({
                where: { id: pk, status: "ACTIVE" },
            });

            if (!movement) {
                return res.status(404).json({
                    error: "Movement not found or already inactive"
                });
            }

            await movement.update({ status: "INACTIVE" });

            res.status(200).json({
                message: "Movement deactivated successfully",
                movement
            });

        } catch (error) {
            res.status(500).json({ error: "Error deactivating movement" });
        }
    }

}
