const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

function readEnvLocal() {
  const p = path.join(__dirname, '..', '.env.local');
  if (!fs.existsSync(p)) return {};
  const txt = fs.readFileSync(p, 'utf8');
  const lines = txt.split(/\r?\n/);
  const env = {};
  for (const line of lines) {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) env[m[1].trim()] = m[2].trim().replace(/^"|"$/g, '');
  }
  return env;
}

async function measure() {
  const env = readEnvLocal();
  const uri = env.MONGODB_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found in .env.local or environment.');
    process.exit(2);
  }
  console.log('Using MONGODB_URI:', uri.replace(/(mongodb\+srv:\/\/[^:@]+:)[^@]+@/, '$1****@'));
  const start = Date.now();
  try {
    const conn = await mongoose.connect(uri, { connectTimeoutMS: 10000 });
    const ms = Date.now() - start;
    console.log('Connected in', ms, 'ms');
    await conn.disconnect();
    process.exit(0);
  } catch (err) {
    const ms = Date.now() - start;
    console.error('Connection failed after', ms, 'ms');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  }
}

measure();
