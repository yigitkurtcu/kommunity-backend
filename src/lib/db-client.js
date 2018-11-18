import path from 'path';
import Sequelize, { type Options as SequelizeOptions } from 'sequelize';
import { getAllFiles } from './helpers';

export default (sequelizeOptions: SequelizeOptions): Sequelize => {
  return new Sequelize(sequelizeOptions);
};
export const importModels = (modelsPath: string, dbClient: Sequelize): AppModels => {
  const models: $Shape<AppModels> = {};
  const associates = [];

  getAllFiles(modelsPath, [])
    .filter((file: string) => {
      return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
    })
    .forEach((file: string) => {
      const model = dbClient.import(path.join(file));
      models[model.name] = model;
      associates.push(model);
    });
  associates.forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });
  return models;
};
