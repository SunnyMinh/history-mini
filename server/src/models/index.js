const sequelize = require('../config/database');

const User = require('./user.model');
const Role = require('./role.model');
const UserRole = require('./userRole.model');
const Period = require('./period.model');
const Event = require('./event.model');

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: 'user_id',
  otherKey: 'role_id',
  as: 'roles',
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: 'role_id',
  otherKey: 'user_id',
  as: 'users',
});

User.hasMany(Period, {
  foreignKey: 'created_by',
  as: 'periods_created',
});

Period.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

User.hasMany(Event, {
  foreignKey: 'created_by',
  as: 'events_created',
});

Event.belongsTo(User, {
  foreignKey: 'created_by',
  as: 'creator',
});

Period.hasMany(Event, {
  foreignKey: 'period_id',
  as: 'events',
});

Event.belongsTo(Period, {
  foreignKey: 'period_id',
  as: 'period',
});

module.exports = {
  sequelize,
  User,
  Role,
  UserRole,
  Period,
  Event,
};