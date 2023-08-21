const githubUsernameRegex = /@\s?[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}/i;

const getGithubIdFromDiscordNickname = nickname => {
  if (!nickname) {
    return;
  }

  return nickname.match(githubUsernameRegex)?.[0].replace('@', '') ?? nickname.replace(' ', '');
};

export const getUserInfo = member => {
  return {
    id: member.user.id,
    username: member.user.username,
    discriminator: member.user.discriminator,
    githubId: getGithubIdFromDiscordNickname(member.nickname) ?? member.user.username,
  };
};

export const synchronize = async client => {
  try {
    const guilds = client.guilds.cache;
    const guildActivists = await Promise.all(
      guilds.map(async guild => {
        const members = await guild.members.fetch();
        return members.filter(member => member.roles.cache.has(ROLE_ID));
      })
    );
    const mergedCollections = new Map(guildActivists.reduce((accumulator, members) => [...accumulator, ...members], []));
    const activists = Array.from(mergedCollections).map(([, member]) => getUserInfo(member));
    await Promise.all(activists.map(activist => updateUser(activist, true)));
  } catch (error) {
    console.log('error: ', error);
  }
};
