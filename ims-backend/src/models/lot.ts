import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Product } from "./product";

export interface LotI {
  id?: number;
  product_id: number;   // FK al producto
  code: string;
  expirationDate?: Date;
  quantity: number;
  status: "AVAILABLE" | "EXPIRED" | "BLOCKED";
  readonly createdAt: Date;
}

export class Lot extends Model {
  public id!: number;
  public product_id!: number;
  public code!: string;
  public expirationDate?: Date;
  public quantity!: number;
  public status!: "AVAILABLE" | "EXPIRED" | "BLOCKED";
  public readonly createdAt!: Date;
}

Lot.init(
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
    code: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    expirationDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.ENUM("AVAILABLE", "EXPIRED", "BLOCKED"),
      allowNull: false,
      defaultValue: "AVAILABLE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Lot",
    tableName: "lots",
    updatedAt: false, // solo createdAt
  }
);

// 🔗 Relaciones
Lot.belongsTo(Product, { 
  foreignKey: "product_id", 
  targetKey: "id",
  as: "product" 
});

Product.hasMany(Lot, { 
  foreignKey: "product_id", 
  sourceKey: "id", 
  as: "lots"
});
