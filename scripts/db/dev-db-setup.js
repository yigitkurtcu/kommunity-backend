import '../../src/models/sql';
import { sequelize } from '../../src/clients/sequelize';

sequelize.sync({ force: true, match: /-development$/ }).then(() => {
  console.log('\n>>> DB TABLE SETUP IS COMPLETED\n');
  process.exit();
}).catch((err) => {
  console.log('\n>>> DB TABLE SETUP FAILED!!!\n');
  console.log(err);
  process.exit(1);
});
