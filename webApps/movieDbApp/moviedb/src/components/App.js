import React, {Component} from 'react';
import Nav from './Nav';
import SearchArea from './searchArea';
import MovieList from './movieList';
import MovieListFiltered from './movieListFiltered';
import MovieListInserted from './movieListInserted';
import AddAMovie from './addAMovie';
import Pagination from './pagination';
import Movie from './movie'

class App extends Component {
  constructor() {
    super()
    this.movieListRef = React.createRef();
    this.state = {
      moviesToFilter: [],
      moviesToShow: [],
      searchTerm: '',
      moviesFiltered: [],
      filter: false,
      listAfterInsert: false,
      totalResults: 0,
      currentPage: 1,
      currentMovie: null
    }
  }
  callbackFromList = (childDataData, childDataMovies) => {
    this.setState({moviesToFilter: childDataData});
    this.setState({moviesToShow: childDataMovies});
    this.setState({totalResults: childDataData.length});

  }
  callbackFromInsert = (childDataData, childDataMovies, totalMovies) => {
    this.setState({moviesToFilter: childDataData});
    this.setState({moviesToShowInsert: childDataMovies});
    this.setState({totalResults: totalMovies});
  }

  nextPage = (pageNumber) => {
    console.log(pageNumber)
    this.movieListRef.current.getMoviesData(pageNumber);
    this.state.currentPage = pageNumber;
  }

  //componentDidMount è il metodo che popola l'array data appena viene caricata la schermata 
  handleChange = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    if(e.target.value === "") {
      this.setState({filter: false})
    }
    const moviesToBeFiltered = this.state.moviesToFilter
    const moviesFiltered = moviesToBeFiltered.filter(movie => {
      console.log(movie.movieTitleLower + " include " + e.target.value + "? " + movie.movieTitleLower.includes(e.target.value.toLowerCase()))
      return (
        movie.movieTitleLower.includes(e.target.value.toLowerCase())
      )
    })
    console.log(moviesFiltered)
    this.setState({moviesFiltered: moviesFiltered})
    
    //filter

    this.setState({filter: true})
  }

  viewMovieInfo = (id) => {
    const chosenMovie = this.state.moviesToFilter.filter(movie => movie.idFromTmdb === id)
    console.log(chosenMovie)
    const newCurrentMovie = chosenMovie.length > 0 ? chosenMovie[0] : null
    this.setState({ currentMovie: chosenMovie })
  }
  nullMovie = () => {
    this.setState({ currentMovie: null })
  }
  handleInsert = () => {
    this.setState({listAfterInsert: true}) 
  }
  render() {
    if(this.state.filter === false && this.state.listAfterInsert === false ) {
      console.log("Total: " + this.state.totalResults)
      const numberOfPages = (this.state.totalResults % 20) === 0 ? this.state.totalResults / 20 : Math.floor(this.state.totalResults / 20) + 1;
      console.log("Number: " + numberOfPages)
      return (
        <div className="App">
          <Nav />
          {
            this.state.currentMovie === null ? <div><div className="container"><div className="row"><div className="col s6 m3 l3"><SearchArea id="search" handleChange={this.handleChange}></SearchArea></div><div className="col m1 l1"></div><div className="col m4 l4"></div><div className="col s6 m4 l4"><AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie></div></div></div><MovieList viewMovieInfo={this.viewMovieInfo} movieCallback={this.callbackFromList} ref={this.movieListRef}></MovieList></div> : <Movie currentMovie={this.state.currentMovie} nullMovie={this.nullMovie}/>
          }
          { this.state.totalResults > 20 ? <Pagination pages={ numberOfPages } nextPage= {this.nextPage} currentPage={this.state.currentPage} /> : '' }
        </div>
      );
    } else if (this.state.filter === true && this.state.listAfterInsert === false) {
      return(
        <div className="App">
          <Nav />
        {
          this.state.currentMovie === null ? <div><div className="container"><div className="row"><div className="col s6 m3 l3"><SearchArea id="search" handleChange={this.handleChange}></SearchArea></div><div className="col m1 l1"></div><div className="col m4 l4"></div><div className="col s6 m4 l4"><AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie></div></div></div><div className="container"><div className="row"><div className="col s10 offset-s1"><MovieListFiltered viewMovieInfo={this.viewMovieInfo} movieCallback={() => this.callbackFromList} ref={this.movieListRef} moviesAfterFilter={this.state.moviesFiltered}></MovieListFiltered></div></div></div></div> : <Movie currentMovie={this.state.currentMovie} nullMovie={this.nullMovie}/>
        }
        </div>
      );
    } else {
      const numberOfPages = (this.state.totalResults % 20) === 0 ? this.state.totalResults / 20 : Math.floor(this.state.totalResults / 20) + 1;
      return (
        <div className="App">
          <Nav />
          {
            this.state.currentMovie === null ? <div><div className="container"><div className="row"><div className="col s6 m3 l3"><SearchArea id="search" handleChange={this.handleChange}></SearchArea></div><div className="col m1 l1"></div><div className="col m4 l4"></div><div className="col s6 m4 l4"><AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie></div></div></div><div className="container"><div className="row"><div className="col s10 offset-s1"><MovieListInserted viewMovieInfo={this.viewMovieInfo} ref={this.movieListRef} moviesAfterInsert={this.state.moviesToShowInsert} pages={this.state.totalResults} currentPage={this.state.currentPage}></MovieListInserted></div></div></div></div> : <Movie currentMovie={this.state.currentMovie} nullMovie={this.nullMovie}/>
          }
          { this.state.totalResults > 20 ? <Pagination pages={ numberOfPages } nextPage= {this.nextPage} currentPage={this.state.currentPage} /> : '' }
        </div>
      );
    }
  }
}

export default App;