// db.js


// db.movies.insert({title:'Stroszek', year:1977, director:'Werner Herzog'});
// db.movies.insert({title:'Fitzcarraldo', year:1982, director:'Werner Herzog'});
// db.movies.insert({title:'Cave of Forgotten Dreams', year:2010, director:'Werner Herzog'});
// db.movies.insert({title:'Me and You and Everyone We Know', year:2005, director:'Miranda July'});
// db.movies.insert({title:'In the Mood for Love', year:2000, director:'Wong Kar-wai'});
// db.movies.insert({title:'Chungking Express', year:1994, director:'Wong Kar-wai'});
// db.movies.insert({title:'Enough Said', year:2013, director:'Nicole Holofcener'});
// db.movies.insert({title:'Walking and Talking', year:1996, director:'Nicole Holofcener'});
// db.movies.insert({title:'Los Abrazos Rotos', year:2009, director:'Pedro Almodova'});


const mongoose = require('mongoose') 

// Leave a placeholder for your schema…
// my schema goes here!
const Movie = new mongoose.Schema({
    title: String,
    director: String,
	year: Number
});

mongoose.model('Movie', Movie);


// connect to the local instance of MongoDB using a database called hw05 
mongoose.connect('mongodb://localhost/hw05',
{useNewUrlParser: true, useUnifiedTopology: true});