const express = require('express');
const customer_routes = require('./routes/customer_routes').authenticated;
const general_routes = require('./routes/general_routes');
const PORT = 8080;

const app = express();
app.use(express.json());

app.use("/customer", customer_routes);
app.use("/", general_routes);
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
