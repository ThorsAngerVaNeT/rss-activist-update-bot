import { Client, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';
import { getUserInfo, synchronize } from './utils.js';
import { updateUser } from './db.js';

const TOKEN = process.env.TOKEN;
const ROLE_ID = process.env.ROLE_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember],
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
  const isRoleAdded = !oldMember.roles.cache.has(ROLE_ID) && newMember.roles.cache.has(ROLE_ID);
  const isRoleRemoved = oldMember.roles.cache.has(ROLE_ID) && !newMember.roles.cache.has(ROLE_ID);

  if (!isRoleAdded && !isRoleRemoved) {
    return;
  }

  const user = getUserInfo(newMember);
  await updateUser(user, isRoleAdded);
});

client.on('ready', async discordClient => {
  console.log(`Logged in as ${client.user.tag}!`);
  if (process.env.SYNCHRONIZE === 'true') {
    await synchronize(discordClient);
  }
});

client.login(TOKEN);
