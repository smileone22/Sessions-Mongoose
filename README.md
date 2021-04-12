# Sessions and Storing Data Using Mongoose 

## Overview
### Two main parts to this assignment
1. Session Management / Handling Cookies (Part 1)
* build your own middleware to parse cookies
* build your own middleware to create an in-memory session store
2. Storing and Retrieving Data (Parts 2 - 6)
* use the commandline mongodb client to create a database, collection and several documents
* use mongoose to read data from mongodb
* use mongoose to write data to mongodb
* use pre-built session middleware (Part 6)

## PART2 Description
### File outline 
\src\movies
  - app.js
  - public
    - image
    - css
      - `main.css`
  - views
    - `layout.hbs`
    - `add.hbs`
    - `movies.hbs`
    - `mymovies.hbs`
    
    
### WebApp Info: Movies
![Main](/src/movies/main.png)
![Main2](/src/movies/main2.png)
![Add a Document](/src/movies/Add_movies.png)
![View all added movies during the session](/src/movies/MyMovies.png)
