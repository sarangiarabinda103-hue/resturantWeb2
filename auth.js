const passport = require('passport')
const LocalStrategy = require("passport-local").Strategy;
const Person = require ('./models/Person')


passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        console.log('Received credentials:', username, password);
        
        // 1. Added await here
        const user = await Person.findOne({ username: username });

        if (!user) {
            return done(null, false, { message: 'Incorrect username' });
        }

        // 2. Simple comparison (Use bcrypt.compare if passwords are hashed!)
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect password' });
        }
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;