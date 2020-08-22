const controller = require("./controller");
const router = require("express").Router();
const passport = require("passport");
const auth = require("../../core/middleware/auth");

module.exports = ( app, model ) => {
    const user = controller( model );
    
    router.post( "/", user.createUser );
    router.post( "/login", user.login );
    router.get( 
        "/list"
        , passport.authenticate("jwt", {session: false})
        , auth( model.Auth, ["ROLE_NORMAL"])
        , user.getUserList );

    app.use( "/v1/user", router );
}