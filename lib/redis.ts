import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

const redis = new Redis(redisUrl, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

redis.on('connect', () => {
  console.log('Redis connecté');
});

redis.on('error', (err) => {
  console.error('Erreur Redis:', err);
});

export default redis;

export const GAME_STATE_PREFIX = 'game:';
export const USER_SESSION_PREFIX = 'user:';
export const SOCKET_META_PREFIX = 'socket:';

export async function getGameState(gameCode: string) {
  const key = `${GAME_STATE_PREFIX}${gameCode}:state`;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setGameState(gameCode: string, state: any, ttl: number = 3600 * 24) {
  const key = `${GAME_STATE_PREFIX}${gameCode}:state`;
  await redis.setex(key, ttl, JSON.stringify(state));
}

export async function deleteGameState(gameCode: string) {
  const key = `${GAME_STATE_PREFIX}${gameCode}:state`;
  await redis.del(key);
}

export async function getUserSession(userId: number) {
  const key = `${USER_SESSION_PREFIX}${userId}:session`;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setUserSession(userId: number, session: any, ttl: number = 3600 * 24 * 7) {
  const key = `${USER_SESSION_PREFIX}${userId}:session`;
  await redis.setex(key, ttl, JSON.stringify(session));
}

export async function deleteUserSession(userId: number) {
  const key = `${USER_SESSION_PREFIX}${userId}:session`;
  await redis.del(key);
}

export async function getSocketMeta(socketId: string) {
  const key = `${SOCKET_META_PREFIX}${socketId}:meta`;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

export async function setSocketMeta(socketId: string, meta: any, ttl: number = 3600) {
  const key = `${SOCKET_META_PREFIX}${socketId}:meta`;
  await redis.setex(key, ttl, JSON.stringify(meta));
}

export async function deleteSocketMeta(socketId: string) {
  const key = `${SOCKET_META_PREFIX}${socketId}:meta`;
  await redis.del(key);
}

