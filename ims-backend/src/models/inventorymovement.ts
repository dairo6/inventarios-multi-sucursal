import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Product } from "./product";
import { Warehouse } from "./warehouse";
import { Lot } from "./lot";

export interface InventoryMovementI {
  id?: number;
  product_id: number;
  warehouse_id: number;
  lot_id?: number;
  movementType: "IN" | "OUT" | "TRANSFER";
  quantity: number;
  reference?: string;
  createdAt?: Date;
  status?: "ACTIVE" | "INACTIVE";
}

export class InventoryMovement extends Model {
  public id!: number;
  public product_id!: number;
  public warehouse_id!: number;
  public lot_id?: number;
  public movementType!: "IN" | "OUT" | "TRANSFER";
  public quantity!: number;
  public reference?: string;
  public createdAt!: Date;
  public status!: "ACTIVE" | "INACTIVE";
  
}

InventoryMovement.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    warehouse_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    lot_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },

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

    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
      allowNull: false
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


//
// 🔗 Relaciones
//

// Un producto puede tener muchos movimientos
Product.hasMany(InventoryMovement, {
  foreignKey: "product_id",
  sourceKey: "id",
  as: "movements",
});
InventoryMovement.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "id",
  as: "product",
});

// Un almacén puede tener muchos movimientos
Warehouse.hasMany(InventoryMovement, {
  foreignKey: "warehouse_id",
  sourceKey: "id",
  as: "movements",
});
InventoryMovement.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  targetKey: "id",
  as: "warehouse",
});

// Un lote puede tener varios movimientos (opcional)
Lot.hasMany(InventoryMovement, {
  foreignKey: "lot_id",
  sourceKey: "id",
  as: "movements",
});
InventoryMovement.belongsTo(Lot, {
  foreignKey: "lot_id",
  targetKey: "id",
  as: "lot",
});

