export const isRoleAdded = (role, oldMember, newMember) => !oldMember.roles.cache.has(role) && newMember.roles.cache.has(role);

export const isRoleRemoved = (role, oldMember, newMember) => oldMember.roles.cache.has(role) && !newMember.roles.cache.has(role);

export const getUserInfo = member => {
  return {
    nickname: member.nickname,
    username: member.user.username,
    discriminator: member.user.discriminator,
    id: member.user.id,
  };
};
