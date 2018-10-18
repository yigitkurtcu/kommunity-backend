const { exec } = require('child_process');

const dbVer = 'v0.0';
const sqlScriptFileName = `kommunity.app.db.${dbVer}.sql`;

exec(`mysql -u root -p < scripts\\db\\${dbVer}\\${sqlScriptFileName}`, (err, stdout, stderr) => {
  let resultMessage;
  if (err) {
    resultMessage = `Import failed. (${sqlScriptFileName})\n\n!!!!! => ${err.message}\n\n`;
  } else if (stderr || stdout) {
    resultMessage = `Import completed. (${sqlScriptFileName})\n\n${stderr || stdout}\n\n`;
  }
  /* eslint-disable no-console */
  console.log(resultMessage);
  /* eslint-enable no-console */
});
