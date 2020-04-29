

const express = require('express');
const repository = require('./pokemodRepository');
const bodyParser = require('body-parser');
const path = require('path');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');
const routes = require('./routes');
const passport = require('passport');
const session = require('express-session');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const ews = require('express-ws')(app);
const WS = require ('ws');

const userRepo = require('./userRepository.js');

if (false) {

    app.use(cors());
}

function init(app) {
    ews = express_ws(app);

    app.ws('/', function (socket, req) {
        console.log('Established a new WS connection');

        broadcastCount();

        socket.on('close', () => {
            broadcastCount();
        });
    });
}

app.use(
    session({
        secret: 'a secret used to encrypt the session cookies',
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.static('public'));

passport.use(
    new LocalStrategy(
        {
            usernameField: 'userId',
            passwordField: 'password',
        },
        function (userId, password, done) {
            const ok = userRepo.verifyUser(userId, password);

            if (!ok) {
                return done(null, false, { message: 'Invalid username/password' });
            }

            const user = userRepo.getUser(userId);
            return done(null, user);
        }
    )
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    const user = userRepo.getUser(id);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
require("./routes/pokeRoutes.js")(app);


app.get("", (req, res) => {
  res.send("")
});

userRepo.initUser();

app.use((req, res, next) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = { app };
