import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import { getUserInfo } from './utils.js';

dotenv.config();

const TOKEN = process.env.TOKEN;
const ROLE_ID = process.env.ROLE_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
  partials: [Partials.GuildMember],
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  const isRoleAdded = !oldMember.roles.cache.has(ROLE_ID) && newMember.roles.cache.has(ROLE_ID);
  const isRoleRemoved = oldMember.roles.cache.has(ROLE_ID) && !newMember.roles.cache.has(ROLE_ID);

  if (!isRoleAdded && !isRoleRemoved) {
    return;
  }

  const user = getUserInfo(newMember);

  if (isRoleAdded) {
    console.log(`${user.githubId ?? user.username} gained role`);
  }

  if (isRoleRemoved) {
    console.log(`${user.githubId ?? user.username} lost role`);
  }
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(TOKEN);
