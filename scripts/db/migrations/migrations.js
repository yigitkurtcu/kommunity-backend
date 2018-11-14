import { getAllFiles } from '../../../lib/Helpers';
import path from 'path';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const migrations = [];
    const migrates = [];
    const folderName = process.env.NODE_ENV;
    const basename = path.basename(__filename);
    const migrationsPath = path.join(__dirname, '../../../configs/db/migrations/' + folderName);
    getAllFiles(migrationsPath, [])
      .filter((file) => {
        return (file.indexOf('.') !== 0) && (path.basename(file) !== basename) && (file.slice(-3) === '.js');
      })
      .forEach((file: string) => {
        migrates.push(require(file));
      });
    migrates.forEach(migrate => {
      console.log('Migrations not not implemented!');
    });
    return Promise.all(migrations);
  },
  down: (queryInterface, Sequelize) => {}
};
