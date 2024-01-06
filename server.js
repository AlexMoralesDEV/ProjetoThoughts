const express = require('express');
const app = express();
const path = require('node:path');
const route = require('./routes');
const { middlewareGlobal, userExists } = require('./src/middlewares/middlewares');
const { engine } = require('express-handlebars');
const conne = require('./src/db/connection');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
const { ThoughtModel } = require('./src/models/Thought');
const { UserModel } = require('./src/models/User');

const sessionConfig = {
    name: 'session',
    secret: 'our_secret',
    reseva: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function() {},
        path: require('node:path').join(require('node:os').tmpdir(), 'src', 'sessions')
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 36000),
        httpOnly: true
    }
}

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use(express.static(path.resolve(__dirname, 'public', 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionConfig))
app.use(middlewareGlobal);
app.use(flash());
app.use(userExists);
app.use(route);

conne.sync({ force: true })
.then(()=>{
    app.listen(3000, () => {
        console.log('O aplicativo está no ar!');
        console.log('http://localhost:3000');
    })
}).catch((err) => {
    console.log(err);
})

