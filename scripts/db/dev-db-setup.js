const sequelize = require('../../src/clients/sequelize').sequelize;
require('../../src/models/sql');

sequelize.sync({ force: true, match: /-development$/ }).then(() => {
  console.log('\n>>> DB SETUP IS COMPLETED\n');
  process.exit();
}).catch((err) => {
  console.log('\n>>> DB SETUP FAILED!!!\n');
  console.log(err);
  process.exit(1);
});
