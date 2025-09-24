import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { User  } from "./user";
import { Product } from "./product";
import { Warehouse } from "./warehouse";
import { Lot } from "./lot";

export interface InventoryMovementI {
  id?: number;
  productId: number;
  warehouseId: number;
  lotId?: number;
  movementType: "IN" | "OUT" | "TRANSFER";
  quantity: number;
  reference?: string;
  createdAt?: Date;
  userId: number;
}

export class InventoryMovement extends Model implements InventoryMovementI {
  public id!: number;
  public productId!: number;
  public warehouseId!: number;
  public lotId?: number;
  public movementType!: "IN" | "OUT" | "TRANSFER";
  public quantity!: number;
  public reference?: string;
  public createdAt!: Date;
  public userId!: number;
}

InventoryMovement.init(
  {
    movementType: {
      type: DataTypes.ENUM("IN", "OUT", "TRANSFER"),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "InventoryMovement",
    tableName: "inventory_movements",
    timestamps: false,
  }
);

// Relaciones
InventoryMovement.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(InventoryMovement, { foreignKey: "userId", as: "movements" });

InventoryMovement.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(InventoryMovement, { foreignKey: "productId", as: "movements" });

InventoryMovement.belongsTo(Warehouse, { foreignKey: "warehouseId", as: "warehouse" });
Warehouse.hasMany(InventoryMovement, { foreignKey: "warehouseId", as: "movements" });

InventoryMovement.belongsTo(Lot, { foreignKey: "lotId", as: "lot" });
Lot.hasMany(InventoryMovement, { foreignKey: "lotId", as: "movements" });
