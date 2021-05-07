const config = require('./config/config');
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


require('./config/mongoose');
require('./config/express')(app);

app.use(routes);
app.use(errorHandler);



app.listen(config.PORT, () => {console.log(`Server is running on port ${config.PORT}...`)});