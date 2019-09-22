const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// middleware
// app.use(logger);

// Handlebars middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//  body parser middlware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// home router
app.get('/', (req, res) => res.render('index', {
    title: "Member App",
    members
}));

// static
app.use(express.static(path.join(__dirname, 'public')));

// api route
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started On Port ${PORT}`));