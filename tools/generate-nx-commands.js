const execSync = require('child_process').execSync;
const isMaster = process.argv[2] === 'False';
const baseSha = isMaster ? 'origin/master~1' : 'origin/releases/11.0';
const isSkipCache = process.argv[3] === 'True';

const cmd = JSON.stringify({
  ...commands('lint'),
  ...commands('test'),
  ...commands('build'),
  ...affectedApps('publish'), // publish command for the apps
});

console.log(cmd.replace(/"/g, '\\"'));

function commands(target) {
  let script = `npx nx print-affected --base=${baseSha} --target=${target}`;

  const array = JSON.parse(execute(script).toString().trim()).tasks.map(
    (t) => t.target.project
  );

  return { [target]: array };
}

function affectedApps(command) {
  let script = `npx nx affected:libs --base=${baseSha}`;

  const x = execute(script).toString().trim();

  let apps = x ? x.split('\n\n')[1].split(' - ').slice(1) : [];
  apps = apps.map((t) => t.replace('\n', '').trim());

  return { [command]: apps };
}

function execute(script) {
  if (isSkipCache) {
    script = `${script} --skip-nx-cache`;
  }
  return execSync(script);
}
