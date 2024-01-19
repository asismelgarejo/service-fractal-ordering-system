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
  insertOne(payload: M): any;
  deleteOne(fields: Partial<M>): Promise<number>;
  updateOne(filters: Partial<M>, fields: Partial<M>): Promise<number>;
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
  async insertOne(payload: T): Promise<any> {
    return await this.sqlz.create(payload as any);
  }
  async deleteOne(fields: Partial<T>): Promise<number> {
    const record = await this.sqlz.findOne({ where: fields as T });
    if (record) {
      await record?.destroy();
      return 1;
    }
    return 0;
  }
  async updateOne(filters: Partial<T>, fields1: Partial<T>): Promise<number> {
    return (await this.sqlz.update(fields1, { where: filters as T }))[0];
  }
}
export class CustomModel<T extends {}> extends SequelizeModel<T> {
  static associate(models: DictionaryModels) {
    // define association here
  }
}
export type DictionaryModels = Record<string, typeof CustomModel>;
//#endregion sequelize
