const { exec } = require('child_process');

exec('npx electron .', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting electron: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
