import { Model as MongooseModel } from "mongoose";
import { Options, Model as SequelizeModel } from "sequelize";

export type HttpResponse<T> = {
  data?: T;
  status?: number;
  message?: string;
};

export enum Environments {
  development = "development",
  production = "production",
  test = "test",
}

export type DBOptions = Options & { use_env_variable?: string };

export type DBConfigEnvs = Record<Environments, DBOptions>;

export interface DBClient<M extends {}> {
  findAll(): Promise<CustomModel<M>[]>;
  // insertOne(): void;
}

// class DBMongoose implements DBClient {
//   findAll(): void {}
//   find<>(): void {}
//   insertOne(): void {}
// }


//#region sequelize
export class DBSequelize<T extends {}> implements DBClient<T> {
  constructor(private sqlz: typeof CustomModel<T>) {}
  async findAll() {
    return await this.sqlz.findAll();
  }
}
export class CustomModel<T extends {}> extends SequelizeModel<T> {
  static associate(models: DictionaryModels) {
    // define association here
  }
}
export type DictionaryModels = Record<string, typeof CustomModel>;
//#endregion sequelize
