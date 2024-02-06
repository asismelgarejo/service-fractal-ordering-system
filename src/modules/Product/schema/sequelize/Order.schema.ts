import { DictionaryModels } from "src/constants/interfaces";
import { DataTypes, Model, Sequelize } from "sequelize";

export class ProductSchema extends Model {
  static associate(models: DictionaryModels) {
    this.belongsToMany(models.Order, { through: models.OrderProduct });
  }
}

export default function BootstrapSchema(
  sequelize: Sequelize,
  schema: typeof ProductSchema
): void {
  schema.init(
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
}
