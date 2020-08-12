const passport = require("passport");
const passportJWT = require("passport-jwt");
const localStrategy = require("passport-local").Strategy;
const strategyJWT = passportJWT.Strategy;
const extractJWT = passportJWT.ExtractJwt;

module.exports = function() {
    
}