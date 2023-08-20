const githubUsernameRegex = /@\s?[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}/i;

const getGithubIdFromDiscordNickname = nickname => {
  if (!nickname) {
    return;
  }

  return nickname.match(githubUsernameRegex)[0].replace('@', '') ?? nickname.replace(' ', '');
};

export const getUserInfo = member => {
  return {
    id: member.user.id,
    username: member.user.username,
    discriminator: member.user.discriminator,
    githubId: getGithubIdFromDiscordNickname(member.nickname) ?? member.user.username,
  };
};
