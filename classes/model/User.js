const { DataTypes } = require('sequelize');

module.exports = ( datasource ) => {
    const User = datasource.define('User', {
        username: {
            type: DataTypes.STRING(255)
            , allowNull: false
            , unique: true
        }
        , password: {
            type: DataTypes.STRING(255)
            , allowNull: false
        }
    });

    return User;
}