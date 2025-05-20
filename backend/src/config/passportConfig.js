const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const prisma = require('../lib/prisma').default;
const bcrypt = require('bcryptjs');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Local Strategy
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        },
      });

      if (!user) return done(null, false, { message: 'Invalid credentials.' });

      if (!user.isVerified) return done(null, false, { message: 'Invalid credentials.' });

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return done(null, false, { message: 'Invalid credentials.' });

      return done(null, user);
    } catch (err) {
      console.error('Error during authentication:', err);
      return done(err);
    }
  }
));

// JWT Strategy
passport.use(new JWTStrategy(
  {
    jwtFromRequest: (req) => {
        const token = req?.cookies?.authToken;
        return token || null;
      },
      secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: jwtPayload.id } });
      if (!user) return done(null, false);
      return done(null, user);
    } catch (err) {
      console.error('Error during JWT validation:', err);
      return done(err);
    }
  }
));

module.exports = passport;