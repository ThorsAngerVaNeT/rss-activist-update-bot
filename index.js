import { Client, GatewayIntentBits, Partials } from 'discord.js';
import 'dotenv/config';
import { getUserInfo } from './utils.js';
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
  const activist = isRoleAdded;
  await updateUser(user, activist);
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
