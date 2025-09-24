import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Product } from "./product";

export interface GuaranteeI {
  id: number;
  productId: number;   // FK al producto
  description: string;
  durationMonths: number;
  terms?: string;
  status: "ACTIVE" | "EXPIRED";
  readonly createdAt: Date;
}

export class Guarantee extends Model {
  public id!: number;
  public productId!: number;   // FK al producto
  public description!: string;
  public durationMonths!: number;
  public terms?: string;
  public status!: "ACTIVE" | "EXPIRED";
  public readonly createdAt!: Date;
}

Guarantee.init(
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
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    durationMonths: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "EXPIRED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Guarantee",
    tableName: "guarantees",
    updatedAt: false, // solo createdAt
  }
);

// 🔗 Relaciones
Product.hasMany(Guarantee, { 
  foreignKey: "productId", 
  sourceKey: "id" 
});

Guarantee.belongsTo(Product, { 
  foreignKey: "productId", 
  targetKey: "id" 
});
