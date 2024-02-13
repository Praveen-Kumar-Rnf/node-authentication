const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport){
    //Function to authenticate Users
    const authenticateUsers = async (email,password,done) => {
        //Get users by email
        const user = getUserByEmail(email)
        if (user == null){
            return done(null,false, {message: "No user found with that email"})
        }
        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField:'email'}))
    passport.serializeUser((user, done) => {})
    passport.deserializeUser((id, done) => {})
};

module.exports = initialize