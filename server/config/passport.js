const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy


// CLIENT_ID
// 1011746929413-ll0ggad44920f1a2ikf3nrt0pln9k18e.apps.googleusercontent.com
// CLIENT_SECRET
// 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


passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function (email, password, done) {
        User.findOne({ email }).then(user => {
            if (user.password) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) { return done(err) }
                    if (result) { return done(null, user) }
                });
            } else {
                return done("Пользователь не найден")
            }
        }).catch(e => {
            return done(e)
        })
    }))

passport.use(new GoogleStrategy({
    clientID: '1011746929413-ll0ggad44920f1a2ikf3nrt0pln9k18e.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile']
},
    async function (accessToken, refreshToken, profile, cb) {
        const user = await User.find({ googleId: profile.id })
        console.log(profile)
        const newUser = await new User({
            googleId: profile.id,
            full_name: profile.displayName,
            email: profile.emails[0].value
        }).save()
        return cb(null, newUser);
    })
)


passport.serializeUser(function (user, done) {
    console.log(user);
    done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    console.log(id);
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})
