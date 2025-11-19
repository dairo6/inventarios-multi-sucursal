import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Product } from "./product";

export interface GuaranteeI {
  id?: number;
  product_id?: number; // ✅ opcional (porque no todos los productos tendrán garantía)
  description: string;
  durationMonths: number;
  terms?: string;
  status: "ACTIVE" | "EXPIRED";
  readonly createdAt?: Date;
}

export class Guarantee extends Model implements GuaranteeI {
  public id!: number;
  public product_id?: number;
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
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true, // ✅ opcional
      unique: true, // ✅ garantiza 1:1 (solo una garantía por producto)
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
    updatedAt: false,
  }
);

// ✅ Relaciones 1:1 opcional
Product.hasOne(Guarantee, {
  foreignKey: "product_id",
  sourceKey: "id",
  as: "guarantee",
});

Guarantee.belongsTo(Product, {
  foreignKey: "product_id",
  targetKey: "id",
  as: "product",
});
