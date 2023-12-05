const allRoles = {
  user: ['get', 'manage'],
  admin: ['get', 'manage'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
