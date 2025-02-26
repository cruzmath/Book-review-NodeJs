const express = require('express');
let books = require('./books');
const public_users = express.Router();
let customers = require('./customer_routes').users

public_users.post("/register", (req,res) => {
    const{ username, password} = req.body.user
    customers.push({username, password});
    if(!username || !password) res.send('No username or password provided')
    res.send("User created successfully")
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify({ books }, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    if( books[isbn] ) res.send(JSON.stringify(books[isbn], null, 4));
    else res.send('No book found');
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let filtered_books = [];
    for(let i = 1; i <= Object.keys(books).length; i++){
        book = books[i]
        if( book.author == author ){
            filtered_books.push(book);
        };
    }
    res.send(JSON.stringify(filtered_books, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title = req.params.title;
    let filtered_books = [];
    for(let i = 1; i <= Object.keys(books).length; i++){
        book = books[i]
        if(book.title == title){
            filtered_books.push(book);
        }
    }
    res.send(JSON.stringify(filtered_books, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let reviews = books[isbn].reviews;
    res.send(JSON.stringify( reviews, null, 4));
});

module.exports=public_users;
