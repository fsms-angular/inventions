/**
 * Bump the npm version using build id and
 * Return new npm version
 */
const fs = require('fs');
const path = require('path');
var basePackageJson = require('../../package.json');
eval('commands = ' + process.argv[2]);
const buildId = process.argv[3];
const projects = commands['publish'];
const newNpmVersion = getNewNpmVersion();
updatePublishingPackageJsonVersion();

// log so that it can be shared to pipeline task
console.log(newNpmVersion);

function getNewNpmVersion() {
  let currentVersion = basePackageJson.version;

  return currentVersion
    .split('.')
    .map((x, i) => (i == 2 ? buildId : x))
    .join('.');
}

function updatePublishingPackageJsonVersion() {
  projects.forEach((project) => {
    updateVersion(
      path.resolve(__dirname, '../../', `dist/apps/${project}/package.json`)
    );
  });
}

function updateVersion(packageJsonFilePath) {
  var package = require(packageJsonFilePath);
  package.version = newNpmVersion;
  fs.writeFileSync(packageJsonFilePath, JSON.stringify(package, null, 2));
}
