import { getAllFiles } from '../../../lib/Helpers';
import path from 'path';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const seeders = [];
    const seeds = [];
    const folderName = process.env.NODE_ENV;
    const basename = path.basename(__filename);
    const seedersPath = path.join(__dirname, '../../../configs/db/seeders/' + folderName);
    getAllFiles(seedersPath, [])
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (path.basename(file) !== basename) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        seeds.push(require(file));
      });
    seeds.forEach(seed => {
      console.log(seed.tableName);
      seeders.push(queryInterface.bulkInsert(seed.tableName, seed.items));
    });
    return Promise.all(seeders);
  },
  down: (queryInterface, Sequelize) => {}
};
