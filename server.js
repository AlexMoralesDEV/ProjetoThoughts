const express = require('express');
const app = express();
const path = require('node:path');
const { engine } = require('express-handlebars');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname, 'src', 'views'));

app.use(express.static(path.resolve(__dirname, 'public', 'assets')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { layout: false });
})

app.listen(3000, () => {
    console.log('O aplicativo está no ar!');
    console.log('http://localhost:3000');
})