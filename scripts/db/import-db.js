const { exec } = require('child_process');

const dbVers = [
    'v0.0' // First version.
    // , 'v0.1'
    // , 'v0.2'
    // etc.
  ];
let dbVer = dbVers.slice(-1)[0];
const verArg = process.argv.slice(2)[0];

if (verArg) {
  if (dbVers.indexOf(verArg) === -1) {
    throw new Error(`Invalid db schema version. (${verArg})`);
  } else {
    dbVer = verArg;
  }
}
const sqlScriptFileName = `kommunity.app.db.${dbVer}.sql`;
exec(`mysql -u root -p < scripts\\db\\${dbVer}\\${sqlScriptFileName}`, (err, stdout, stderr) => {
  if (err) {
    resultMessage = `Import failed. (${sqlScriptFileName})\n\n!!!!! => ${err.message}\n\n`;
  } else if (stderr || stdout) {
    resultMessage = `Import completed. (${sqlScriptFileName})\n\n${stderr || stdout}\n\n`;
  }
  /* eslint-disable no-console */
  console.log(resultMessage);
  /* eslint-enable no-console */
});
