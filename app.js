import express from 'express';
import exphbs from 'express-handlebars'
import path from "path";
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import knex from 'knex'
import router from './routes/index.js';
import orm from './orm/db.js';
import { APP_PORT, dev, __dirname, DBURI } from './config.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: DBURI,
        ssl: false
    }
})

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));

app.use((req, res, next) => {
    req.context = {
        db: new orm(db, req)
    }
    next();
});

app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', '.hbs');
// enable aggressive view caching for production
if (!dev) {
    app.enable('view cache');
}
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
router(app);

app.listen(APP_PORT, () => {
    console.log(`> App listening on port ${APP_PORT}`)
    console.log(`Dev: ${String(dev)}`);
});