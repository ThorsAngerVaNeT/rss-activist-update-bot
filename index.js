import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import { getUserInfo, isRoleAdded, isRoleRemoved } from './utils';
dotenv.config();

const TOKEN = process.env.TOKEN;
const ROLE_ID = process.env.ROLE_ID;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (isRoleAdded(ROLE_ID, oldMember, newMember) || isRoleRemoved(ROLE_ID, oldMember, newMember)) {
    return;
  }

  const user = getUserInfo(newMember);

  if (isRoleAdded(ROLE_ID)) {
    console.log(`${user.nickname ?? user.username} gained role`);
  }

  if (isRoleRemoved(ROLE_ID)) {
    console.log(`${user.nickname ?? user.username} lost role`);
  }
});

client.login(TOKEN);
