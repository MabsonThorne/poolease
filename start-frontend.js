const { exec } = require('child_process');

exec('npm run start', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting frontend: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
