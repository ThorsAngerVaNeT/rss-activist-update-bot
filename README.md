## Discord Bot settings

1) In `Privileged Gateway Intents` turn on `Server Member Intent`.

## DB settings

1) Create a new user

```sql
create user activist_bot with encrypted password 'mypass';
```

2) Grant him permission to select specified columns and update only `activist` column

```sql
GRANT select("id", "githubId", "discord", "activist"), UPDATE ("activist") ON "user" TO activist_bot;
```

3) Specify `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` in `.env` file
