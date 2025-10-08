import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
//import { User } from "./user";
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
  user_id: number;
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
  public user_id!: number;
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
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
});
InventoryMovement.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "id",
});

// Un almacén puede tener muchos movimientos
Warehouse.hasMany(InventoryMovement, {
  foreignKey: "warehouse_id",
  sourceKey: "id",
});
InventoryMovement.belongsTo(Warehouse, {
  foreignKey: "warehouse_id",
  targetKey: "id",
});

// Un lote puede tener varios movimientos (opcional)
Lot.hasMany(InventoryMovement, {
  foreignKey: "lot_id",
  sourceKey: "id",
});
InventoryMovement.belongsTo(Lot, {
  foreignKey: "lot_id",
  targetKey: "id",
});

// Un usuario puede registrar muchos movimientos
/*User.hasMany(InventoryMovement, {
  foreignKey: "user_id",
  sourceKey: "id",
});
InventoryMovement.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "id",
});*/
