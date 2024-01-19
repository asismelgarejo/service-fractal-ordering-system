import { DBSequelize } from "constants/interfaces";
import { ProductDTO } from "modules/Product/interfaces";
import { DataTypes, Model, Sequelize } from "sequelize";

class ProductSchema extends Model {
  static associate() {}
}

export default function GetSchema(sequelize: Sequelize) {
  ProductSchema.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UnitPrice: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        validate: {
          min: {
            args: [0],
            msg: "It cannot be lower than cero",
          },
        },
      },
    },
    { sequelize, modelName: "Product", timestamps: false }
  );

  return new DBSequelize<ProductDTO>(ProductSchema);
}
