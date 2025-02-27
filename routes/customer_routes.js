const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./books.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

//only registered users can login
// For some reason this doen't work with me, but it should
// regd_users.use("/customer/login", (req, res, next) => {
//     const { username, password } = req.body.user;
//     let valid_users = users.filter(user => user.username == username)
//     if(password !== valid_users[0].password) {
//         return res.json({ message: "Invalid username or password" });
//     }
//     // Generate JWT access token
//     let accessToken = jwt.sign({ username }, 'access', { expiresIn: 300 });

//     return res.status(200).send("User successfully logged in " + accessToken);
// });

// Middleware to verify token for authenticated routes
regd_users.use("/", (req, res, next) => {
    if (req.path === '/customer/login') {
        return next();
    }
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, 'access', (err, decoded) => {
        if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.', err });
        next();
    });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
// module.exports.isValid = isValid;
module.exports.users = users;
