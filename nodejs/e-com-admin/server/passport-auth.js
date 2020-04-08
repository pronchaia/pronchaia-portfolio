const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('./services/UserService');
const bcrypt = require('bcrypt');
const options = { usernameField: 'email' };

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser((id, done) => {
    return UserService.getData(id)
        .then((user) => { done(null, user); })
        .catch((err) => { done(err, null); });
});

passport.use(new LocalStrategy(options, (email, password, done) => {
    console.log(email);

    UserService.getDataByEmail(email)
        .then((user) => {
            if (!user) return done(null, false);

            const matchedPassword =  bcrypt.compare(password, user.password);
            if (matchedPassword) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => { return done(err); });
}));