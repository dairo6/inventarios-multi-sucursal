import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db";
import { Category } from "./category";
import { Supplier } from "./supplier";

export interface ProductI {
  id?: number;
  name: string;
  code: string;
  description?: string;
  price: number;
  unit: string;
  categoryId: number;
  supplierId?: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Model implements ProductI {
  public id!: number;
  public name!: string;
  public code!: string;
  public description?: string;
  public price!: number;
  public unit!: string;
  public categoryId!: number;
  public supplierId!: number;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "categories", // nombre de la tabla
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "suppliers", // nombre de la tabla
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

// 🔹 Relaciones
Product.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
Product.belongsTo(Supplier, { foreignKey: "supplierId", as: "supplier" });
