const express = require('express');
const jwt = require('jsonwebtoken');
const customer_routes = require('./routes/customer_routes').authenticated;
const general_routes = require('./routes/general_routes');
let users = require('./routes/customer_routes').users;
const PORT = 8080;

const app = express();
app.use(express.json());

app.use("/customer/login", (req, res, next) => {
    const { username, password } = req.body.user;
    let valid_users = users.filter(user => user.username == username)
    if(password !== valid_users[0].password) {
        return res.json({ message: "Invalid username or password" });
    }
    let accessToken = jwt.sign({ username }, 'access', { expiresIn: 300 });

    return res.status(200).send("User successfully logged in and has the following access token " + accessToken);
});

app.use("/customer", customer_routes);
app.use("/", general_routes);
app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));
