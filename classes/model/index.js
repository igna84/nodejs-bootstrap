const user = require("./User");
const auth = require("./Auth");

module.exports = function( datasource ) {
    const User = user( datasource );
    const Auth = auth( datasource );

    User.hasMany( Auth, {
        foreignKey: 'user_id'
    });

    return {
        User
        , Auth
    };
}