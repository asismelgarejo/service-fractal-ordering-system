import { DictionaryModels } from "src/constants/interfaces";
import { DataTypes, Model, Sequelize } from "sequelize";

export class OrderProductSchema extends Model {
  static associate(models: DictionaryModels) {}
}

export default function BootstrapSchema(
  sequelize: Sequelize,
  schema: typeof OrderProductSchema
) {
  schema.init(
    {
      ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      OrderCode: {
        type: DataTypes.STRING,
        references: {
          model: "Orders",
          key: "Order",
        },
      },
      ProductID: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "ID",
        },
      },
      Qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "It cannot be lower than cero",
          },
        },
      },
      TotalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "It cannot be lower than cero",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "OrderProduct",
      timestamps: false,
      freezeTableName: true,
    }
  );
}
