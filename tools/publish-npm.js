/**
 * publish to npm package repository
 */
const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
eval('commands = ' + process.argv[2]);
const projects = commands['publish'];
const token = commands['authNpmToken'];

publishNpmPackage();

function publishNpmPackage() {
  projects.forEach((app) => {
    const cwd = path.resolve(__dirname, '../../', `dist/apps/${app}`);

    try {
      execSync(`npm config set //registry.npmjs.org/:_authToken=${token}`, {
        cwd,
        stdio: [0, 1, 2],
      });
      execSync(`npm config set scope "@fsms-angular"`, {
        cwd,
        stdio: [0, 1, 2],
      });
      execSync(`npm publish --access public`, {
        cwd,
        stdio: [0, 1, 2],
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  });
}
