import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
import { Branch } from "./branch";

export interface WarehouseI {
  id?: number;
  branchId: number;
  name: string;
  code: string;
  description?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Warehouse extends Model implements WarehouseI {
  public id!: number;
  public branchId!: number;
  public name!: string;
  public code!: string;
  public description?: string;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Warehouse.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    branchId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "branches", // tabla Branch
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Code cannot be empty" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Warehouse",
    tableName: "warehouses",
    timestamps: true, // createdAt y updatedAt automáticos
  }
);

// 🔹 Relación con Branch
Warehouse.belongsTo(Branch, { foreignKey: "branchId", as: "branch" });
Branch.hasMany(Warehouse, { foreignKey: "branchId", as: "warehouses" });