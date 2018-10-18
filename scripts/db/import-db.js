const { exec } = require('child_process');
const dbVer = 'v0.0';
const sqlScriptFileName = 'kommunity.app.db.' + dbVer + '.sql';
exec('mysql -u root -p < scripts\\db\\' + dbVer + '\\' + sqlScriptFileName, (err, stdout, stderr) => {
    var resultMessage;
    if (err) {
        resultMessage = 'Import failed. (' + sqlScriptFileName + ')\n\n!!!!! => ' + err.message + '\n\n';
    } else if(stderr) {
        resultMessage = 'Import completed. (' + sqlScriptFileName + ')\n\n' + stderr + '\n\n';
    } else if(stdout) {
        resultMessage= 'Import completed. (' + sqlScriptFileName + ')\n\n' + stdout + '\n\n';
    }
    /* eslint-disable no-console */
    console.log(resultMessage)
    /* eslint-enable no-console */
});