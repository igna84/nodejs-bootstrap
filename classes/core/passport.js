const { logger } = require("./logger");
const config = require("./config");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

module.exports = function( User, Auth ) {
    passport.use( new JWTStrategy({
        secretOrKey : config.SECRET_OR_KEY
        , jwtFromRequest : extractJWT.fromAuthHeaderAsBearerToken()
    }, async (jwtPayload, done) => {
        const userInfo = await User.findOne({
            where: {
                username: jwtPayload.username
            }
            , include: [{
                model: Auth
                , as: 'auths'
            }]
        });
        
        if ( userInfo ) {
            done( null, {
                id: userInfo.id
                , username: userInfo.username
            });
        } else {
            done( err, null );
        }
    }));

    logger.info("Passport setting completed.");
}