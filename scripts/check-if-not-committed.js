const { exec } = require('child_process');

exec("git status | grep 'modified:' | wc -l", (err, stdout, stderr) => {
  if (err || stderr) {
    process.exit(1);
  } else {
    const numFiles = stdout;
    if (numFiles > 0) {
      /* eslint-disable no-console */
      console.error('\n\n!!!!! => You have uncommitted files, please commit your changes!\n\n');
      /* eslint-enable no-console */
      process.exit(1);
    }
  }
});
