const { v4 : uuidv4} = require('uuid')
'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
    },
    role : {
      type : DataTypes.INTEGER,
      defaultValue : 0,
      allowNull : true
    }
  }, {});
  Users.associate = function(models) {
    // associations can be defined here
  };
  Users.beforeCreate((user,options)=> {
    return bcrypt.hash(user.password,10).then((hash)=> {
      user.password = hash
    }).catch((err)=> {
      throw new Error;
    })
  })
Users.beforeCreate(user => user.id = uuidv4())
Users.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}
  return Users;
};