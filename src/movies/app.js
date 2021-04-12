// app.js
require('./db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');
const app = express();

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
const staticPath = path.resolve(__dirname, 'public');
app.use(express.static(staticPath));

const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
app.use(session(sessionOptions));

app.get('/movies', function(req, res){
    Movie.find({}, function(err,movies, count){
        if(err) {
            console.log(err); 
        } else if (req.query.searchDirector==='' ||req.query.searchDirector===undefined){
            //no search input 
            res.render('movies',{movies:movies ,filterInput:false});
        } else{//search input 
            res.render('movies',{
                movies:movies.filter(
                    movie=> movie.director ===req.query.searchDirector),
                filterInput:true, 
                outputDirector: req.query.searchDirector});
            }
    });
});

app.get('/',function(req,res) {
    res.redirect('/movies');
});

app.get('/movies/add',function(req,res) {
    res.render('add')
});


movieAdded =[]; //global variable 
//your request handler that deals with POSTs will create a new movie in the database
app.post('/movies/add',function(req,res) {
    console.log('-------------NEW MOVIE ADDED-----------------')
    console.log(req.body.title);
    console.log(req.body.director);
    console.log(req.body.year);
    

    // new Movie({
    //     title: req.body.title,
    //     director:req.body.director,
    //     year: req.body.year
    // }).save(function(err, movie, count){
    //     res.redirect('/movies/add');
    // })
    let newRow= {
        title: req.body.title,
        director:req.body.director,
        year: req.body.year
    };
    movieAdded.push(newRow);

    new Movie({
        title: req.body.title,
        director:req.body.director,
        year: req.body.year
    }).save(function(err, movie, count){
        if (err){
            console.log(err);
        } else if (req.session.movieAdded!==undefined){ //already exists
            req.session.movieAdded.push({
                title:req.body.title,
                director:req.body.director,
                year: req.body.year
            });
        } else { //new session myMovie
            req.session.movieAdded=[];
            req.session.movieAdded.push({
                title:req.body.title,
                director:req.body.director,
                year: req.body.year
            });
        }
        res.redirect('/movies/add');
    })
});

//showing all of the movies that have been added by the user during their session (it can be as simple as an unordered list)
//you link to /mymovies from both of the existing pages
app.get('/mymovies', function(req,res){
    const mymovies = req.session.movieAdded || [];
    res.render('mymovies',{addedMovies: mymovies});
});

app.listen(3000);
