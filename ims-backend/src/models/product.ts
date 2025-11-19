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
  stock: number;
  unit: string;
  category_id: number;
  supplier_id?: number;
  status: "ACTIVE" | "INACTIVE";
}

export class Product extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public description?: string;
  public price!: number;
  public stock!: number;
  public unit!: string;
  public category_id!: number;
  public supplier_id?: number;
  public status!: "ACTIVE" | "INACTIVE";
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El nombre no puede estar vacío" },
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "El código no puede estar vacío" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: { msg: "El precio debe ser un número válido" },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "El stock debe ser un número entero" },
        min: {
          args: [0],
          msg: "El stock no puede ser negativo",
        },
      },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La unidad no puede estar vacía" },
      },
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Supplier,
        key: "id",
      },
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
    timestamps: false, // igual que el profe
  }
);

// 🔹 Relaciones
Category.hasMany(Product, {
  foreignKey: "category_id",
  sourceKey: "id",
  as: "products"
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  targetKey: "id",
  as: "category"
});

Supplier.hasMany(Product, {
  foreignKey: "supplier_id",
  sourceKey: "id",
  as: "products"
});

Product.belongsTo(Supplier, {
  foreignKey: "supplier_id",
  targetKey: "id",
  as: "supplier"
});
