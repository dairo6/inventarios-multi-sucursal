import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/connection";


export interface BranchI {
  id?: number;
  name: string;
  code: string; // código único de sucursal
  address: string;
  phone?: string;
  email?: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: Date;
  updatedAt?: Date;
}

export class Branch extends Model {
  public id!: number;
  public name!: string;
  public code!: string;
  public address!: string;
  public phone?: string;
  public email?: string;
  public status!: "ACTIVE" | "INACTIVE";
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Branch.init(
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
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Address cannot be empty" },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: { args: [7, 10], msg: "Phone must be between 7 and 10 characters" },
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
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      defaultValue: "ACTIVE",
    },
  },
  {
    sequelize,
    modelName: "Branch",
    tableName: "branches",
    timestamps: true, // createdAt y updatedAt automáticos
  }
);
