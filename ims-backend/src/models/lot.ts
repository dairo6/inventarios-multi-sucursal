import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Product } from "./product";

export class Lot extends Model {
  public id!: number;
  public productId!: number;   // FK al producto
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
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Product,
        key: "id",
      },
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
Lot.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(Lot, { foreignKey: "productId", as: "lots" });
