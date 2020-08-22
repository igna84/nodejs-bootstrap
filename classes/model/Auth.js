const { DataTypes } = require('sequelize');

module.exports = ( datasource ) => {
    const Auth = datasource.define('auth', {
        role: {
            type: DataTypes.STRING(100)
            , allowNull: false
        }
    });

    return Auth;
}