import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';
import SequelizeStore from 'connect-session-sequelize';
import UserRoute from './routes/UserRoute.js'
import ProductRoute from './routes/ProductRoute.js'

dotenv.config();

const app = express();

// Create tables
// (async () => {
//     await db.sync();
// })();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000',
    }));
app.use(express.json());
app.use(UserRoute);
app.use(ProductRoute);

// Create a new session
// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});