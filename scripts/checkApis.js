let fetchFn;
try {
  fetchFn = globalThis.fetch.bind(globalThis);
} catch (e) {
  try {
    // try node-fetch
    fetchFn = require('node-fetch');
  } catch (e2) {
    try {
      fetchFn = require('undici').fetch;
    } catch (e3) {
      console.error('No fetch implementation available. Please run with Node 18+ or install node-fetch/undici.');
      process.exit(1);
    }
  }
}

async function check(url) {
  try {
    const res = await fetchFn(url);
    const data = await res.json();
    if (!Array.isArray(data)) {
      console.error(`${url} did not return an array. Received:`, typeof data);
      process.exitCode = 2;
      return false;
    }
    console.log(`${url} -> OK (count: ${data.length})`);
    return data.length > 0;
  } catch (err) {
    console.error(`Failed to fetch ${url}:`, err.message);
    process.exitCode = 3;
    return false;
  }
}

async function main() {
  const base = process.env.BASE_URL || 'http://localhost:3000';
  const eventsOk = await check(`${base}/api/events`);
  const projectsOk = await check(`${base}/api/projects`);

  if (eventsOk && projectsOk) {
    console.log('Both APIs returned arrays with at least one item.');
    process.exitCode = 0;
  } else {
    console.error('One or more APIs failed the checks.');
    process.exitCode = 4;
  }
}

main();
