const pa11y = require('pa11y');
const fs = require('fs');
const path = require('path');

function resolveBrowser() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    path.join(process.env.ProgramFiles || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.ProgramFiles || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['ProgramFiles(x86)'] || '', 'Microsoft', 'Edge', 'Application', 'msedge.exe')
  ].filter(Boolean);
  return candidates.find((candidate) => fs.existsSync(candidate)) || '';
}

(async () => {
  const browser = resolveBrowser();
  const result = await pa11y('http://localhost:8080/', {
    runners: ['axe'],
    standard: 'WCAG2AA',
    timeout: 120000,
    wait: 250,
    chromeLaunchConfig: {
      executablePath: browser,
      args: ['--no-sandbox', '--disable-gpu'],
    },
  });
  console.log(JSON.stringify({ issues: result.issues.map(x => ({ message: x.message, selector: x.selector, type: x.type })) }, null, 2));
})();
