/**
 * # Run Many
 * It will run the script using nx command line to run them in parellel.
 */

const execSync = require('child_process').execSync;
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

eval('commands = ' + process.argv[2]);
const target = process.argv[3];
const projects = commands[target];

try {
  switch (target) {
    case 'test': {
      runTestCommand();
      break;
    }
    case 'build': {
      runBuildCommand();
      break;
    }
    default: {
      runCommand(); // lint
    }
  }
} catch (e) {
  console.log(e);
  process.exit(1);
}

/*
const commands = {
  lint: [
    'branding-logger',
    'cutepuppies-client',
    'cutepuppies-admin',
    'sales-puppy-editor',
    'sales-puppies',
    'branding-ngmaterial',
    'customers-users',
  ],
  test: [
    'branding-logger',
    'cutepuppies-client',
    'cutepuppies-admin',
    'sales-puppy-editor',
    'sales-puppies',
    'branding-ngmaterial',
    'customers-users',
  ],
  build: ['cutepuppies-client', 'cutepuppies-admin'],
  publish: ['cutepuppies-client', 'cutepuppies-admin'],
};
*/
copyIndividualCoverageReports();
// const target = 'test';

function runBuildCommand() {
  runCommand('--prod');
}

function runCommand(args = '') {
  execSync(
    `npx nx run-many --target=${target} --projects=${projects.join(
      ','
    )} --parallel ${args}`,
    {
      stdio: [0, 1, 2],
    }
  );
}

function runTestCommand() {
  execSync(
    `npx nx run-many --target=${target} --projects=${projects.join(
      ','
    )} --parallel --browsers=ChromeHeadless --codeCoverage --sourceMap=false`,
    {
      stdio: [0, 1, 2],
    }
  );

  copyIndividualCoverageReports();
}

function copyIndividualCoverageReports() {
  const coverageDir = path.resolve(__dirname, '../../coverage');
  const mergedDir = path.join(coverageDir, '/merged');
  fs.emptyDirSync(mergedDir);
  const files = glob(coverageDir + '/**/*.xml', { sync: true });

  files.forEach((f, i) => {
    const x = f.split('/coverage/')[1].replace(/\//g, '-').split('/').pop();
    fs.copySync(f, `${mergedDir}/${x}`);
  });
}
