# movieDB

MovieDB is a Web Single Page Application that helps people store their movies.

## Main Functionalities:
### 1- Movies Listing - Home page
  MovieDB main page features a list of movies that the user has inserted along with a searchbar and a text form to add owned movies. 
  The list is retrieved from the Data Base only on first loading and after each movie insertion. 
### 2- Live searchbar
  The searchbar dinamically filters the movies that match the words / sequence of letters that the user is typing meanwhile he's typing them.
### 3- Movie Insertion
  The user types a movie title and hits enter (or clicks on 'Submit' button), the request is sent to the backend that performs those actions:
  
  #### 3.1. Search for details on 'themoviedb.org'
  The backend receives the movie title typed on the front end by the user and searches it in themoviedb.org database in order to retrieve the following information:
  - Original Title
  - Release Date
  - Genre(s)
  - Overview
  - Cast (up to 20 actors)
  - Director
  - Producers
  - Executive Producers
  
  #### 3.2. Insert in DB
    via POST API the JSON to the DB in a table called movies  
## Technologies

### Backend

#### Server-side scripts:
##### Javascript

#### Server Engine:
##### NodeJS

#### Web Server:
##### Express

#### Database:
##### CouchDB

### FrontEnd
##### React
 
