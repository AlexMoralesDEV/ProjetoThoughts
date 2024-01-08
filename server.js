const express = require('express');
const app = express();
const path = require('node:path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('connect-flash');
const route = require('./routes')
const conne = require('./src/db/connection');
const { UserModel } = require('./src/models/User');
const { ThougthModel } = require('./src/models/Thought');
const { middlewareGlobal } = require('./src/middlewares/middlewares');

app.use(express.static(path.resolve(__dirname, 'public', 'assets')));
app.use(express.urlencoded({ extended: true }));

const sessionConfig = session({
    secret: 'jjguihdjklklkleidlkdjf',
    resave: false,
    saveUninitialized: false,
    store: new FileStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true
    }
})

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use(sessionConfig);
app.use(flash());
app.use(middlewareGlobal);
app.use(route);

conne.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Conectado com o DB');
            console.log('O servidor está no ar!');
            console.log('http://localhost:3000');
        })
    })
    .catch((err) => {
        console.log(err);
    });