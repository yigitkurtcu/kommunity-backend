const { exec } = require('child_process');
const dbVer = 'v0.0';
const sqlScriptFileName = 'kommunity.app.db.' + dbVer + '.sql';
exec('mysql -u root -p < scripts\\db\\' + dbVer + '\\' + sqlScriptFileName, (err, stdout, stderr) => {
    var resultMessage;
    if (err) {
        console.error(err.message);
        resultMessage = 'Import failed. (' + sqlScriptFileName + ')';
    } else if(stderr) {
        console.log(stderr);
        resultMessage = 'Import completed. (' + sqlScriptFileName + ')';
    } else if(stdout) {
        console.log(stdout);
        resultMessage= 'Import completed. (' + sqlScriptFileName + ')';
    }
    console.log(resultMessage)
});