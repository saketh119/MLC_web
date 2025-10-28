// Lightweight cache abstraction with in-memory fallback.
// If REDIS_URL is provided and 'ioredis' is installed, it will attempt to use Redis.
let redisClient = null;
let useRedis = false;
const TTL_MS_DEFAULT = 30 * 1000;

async function tryInitRedis() {
  if (redisClient !== null || !process.env.REDIS_URL) return;
  try {
    // dynamic import to avoid hard dependency
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const IORedis = require('ioredis');
    redisClient = new IORedis(process.env.REDIS_URL);
    useRedis = true;
    redisClient.on('error', () => { useRedis = false; });
  } catch (e) {
    // ignore — fallback to in-memory
    redisClient = null;
    useRedis = false;
  }
}

const memoryCache = global.__mlc_cache__ || (global.__mlc_cache__ = new Map());

export async function getCache(key) {
  await tryInitRedis();
  if (useRedis && redisClient) {
    try {
      const v = await redisClient.get(key);
      return v ? JSON.parse(v) : null;
    } catch (e) {
      return null;
    }
  }
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    return null;
  }
  return entry.value;
}

export async function setCache(key, value, ttlMs = TTL_MS_DEFAULT) {
  await tryInitRedis();
  if (useRedis && redisClient) {
    try {
      await redisClient.set(key, JSON.stringify(value), 'PX', ttlMs);
      return;
    } catch (e) {
      // fallback to memory
    }
  }
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlMs });
}

export async function delCache(key) {
  await tryInitRedis();
  if (useRedis && redisClient) {
    try { await redisClient.del(key); return; } catch (e) { /* ignore */ }
  }
  memoryCache.delete(key);
}

export default { getCache, setCache, delCache };
