import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";

export interface SupplierI {
  id?: number;
  name: string;
  taxId: string; // NIT, RUT, RFC...
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Supplier extends Model {
  public id!: number;
  public name!: string;
  public taxId!: string;
  public contactName?: string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Name cannot be empty" },
      },
    },
    taxId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Tax ID cannot be empty" },
      },
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: { args: [7, 15], msg: "Phone must be between 7 and 15 characters" },
      // },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: { msg: "Email must be valid" },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Supplier",
    tableName: "suppliers",
    timestamps: true, // createdAt y updatedAt automáticos
  }
);
