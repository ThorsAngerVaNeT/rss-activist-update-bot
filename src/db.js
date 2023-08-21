import pg from 'pg';

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const updateUser = async (discordUser, isActivist) => {
  try {
    await pool.query(`UPDATE "user" SET "activist" = $1 WHERE discord->>'id' = $2 OR "githubId" = $3`, [
      isActivist,
      discordUser.id,
      discordUser.githubId,
    ]);
  } catch (error) {
    console.log('error: ', error);
    return;
  }
};
