const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const dotenv = require("dotenv");
const User = require("./models/users");

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ googleId: profile.id });
      const payload = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        imageUrl: profile.photos[0].value,
        registerDate: new Date(),
      };

      try {
        if (user) {
          done(null, user);
        } else {
          user = await User.create(payload);
          done(null, user);
        }
      } catch (e) {
        console.log(e);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, (err, user) => done(err, user));
});
