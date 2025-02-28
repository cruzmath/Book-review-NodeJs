const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./books.js");
const regd_users = express.Router();

let users = [];

// only registered users can login
regd_users.use("/login", (req,res,next) => {
    const { username, password } = req.body.user;
    let valid_users = users.filter(user => user.username.includes(username));
    if(password !== valid_users[0].password) {
        return res.json({ message: "Invalid username or password" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({ username }, 'access', { expiresIn: 3600 });
    return res.status(200).send("User successfully logged in " + accessToken);
});

// Verify user's token before proceding
regd_users.use("/", (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    jwt.verify(token, 'access', (err, decoded) => {
        if(err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.', err });
        next();
    });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, 'access');
    let username = decoded.username;
    const review = req.query.review;
    const isbn = req.params.isbn;

    if(!books[isbn]) res.send('No book found');
    let valid_users = books[isbn].reviews.filter(book => Object.keys(book).includes(username))[0];
    if(!valid_users) { // Create a new review
        const user = {};
        user[username] = review;
        books[isbn].reviews.push(user);
        res.send(`${username} review's added for ${books[isbn].title}`);
    } else { // Modify an existing review
        review_index = books[isbn].reviews.indexOf(valid_users);
        books[isbn].reviews[review_index][username] = review;
        res.send(`${username} review's updated for ${books[isbn].title}`)
    }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    const token = req.headers['authorization'];
    const decoded = jwt.verify(token, 'access');
    let username = decoded.username;
    const isbn = req.params.isbn;

    if(!books[isbn]) res.send('No book found');
    let valid_users = books[isbn].reviews.filter(book => Object.keys(book).includes(username))[0];
    review_index = books[isbn].reviews.indexOf(valid_users);
    if(!valid_users) {
        res.send(`No review found for ${username} in ${books[isbn].title}`);
    } else {
        books[isbn].reviews.splice(review_index, 1);
        res.send(`${username} review's deleted for ${books[isbn].title}`);
    }
});

module.exports.authenticated = regd_users;
module.exports.users = users;
