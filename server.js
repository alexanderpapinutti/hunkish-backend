const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const config = require('./config/config');

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

mongoose.Promise = global.Promise;

mongoose.connect(config.db_dev, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', err => {
    console.log(`MongoDB connection error: ${err}`);
    process.exit(-1);
});

connection.once('open', async () => {
    console.log('Connection to database established successfully! :)');
});

app.use('/', require('./routes/register'));

app.use('/auth', require('./routes/authenticate'))

app.use('/users', require('./routes/users'));

app.listen(PORT, console.log(`Server started on port ${PORT}`));