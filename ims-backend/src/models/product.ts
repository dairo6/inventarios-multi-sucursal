import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";
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
Category.hasMany(Product, { 
  foreignKey: "categoryId", 
  sourceKey: "id" 
});


Product.belongsTo(Category, { 
  foreignKey: "categoryId", 
  targetKey: "id" 
});


Supplier.hasMany(Product, { 
  foreignKey: "supplierId", 
  sourceKey: "id" 
});

Product.belongsTo(Supplier, { 
  foreignKey: "supplierId", 
  targetKey: "id" 
});
