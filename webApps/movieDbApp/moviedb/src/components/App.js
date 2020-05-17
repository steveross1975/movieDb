import React, {Component} from 'react';
import Nav from './Nav';
import SearchArea from './searchArea';
import MovieList from './movieList';
import AddAMovie from './addAMovie';
import Pagination from './pagination'

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
      currentPage: 1
    }
  }
  callbackFromList = (childDataData, childDataMovies, totalMovies) => {
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
    this.setState({pageToGo: pageNumber})
    this.movieListRef.current.getMoviesData(pageNumber);
  }

  //componentDidMount è il metodo che popola l'array data appena viene caricata la schermata 
  handleChange = (e) => {
    e.preventDefault(); 
    console.log(e.target.value)
    if(e.target.value === "") {
      this.setState({filter: false})

    }
    const moviesFiltered = this.state.moviesToFilter.filter(movie => {return(movie.movieTitleLower.includes(e.target.value.toLowerCase()))}).map((movie, i) =>
/*       <tr>
          <td><img src={movie.url2poster} alt={movie.movieTitle} height="10%" width="10%"/></td>
          <td>{movie.movieTitle}</td>
          <td>{movie.movieGenre.join(', ')}</td>
          {//For Nested Array
              movie.director.map(value => {
                  return(
                      <td key={value.name}>{value.name}</td>
                  );
              })
          }
          <td>{movie.idFromTmdb}</td>
      </tr> */
        <div className="col s12 m3 l3" key={i}>
          <div className="card">
            <div className="card-image waves-effect waves-block waves-light">
                <img src={movie.url2poster} alt={movie.movieTitle} className="responsive-img" />
                <p className="littleFont" align="center"><span><b>{movie.movieTitle}</b></span></p>
            </div>
            <div className="card-action">
                <a href="#">Movie Details</a>
            </div>
          </div>
        </div>
    )
    this.setState({moviesFiltered})
    this.setState({filter: true})
    //filter
  }

  handleInsert = () => {
    this.setState({listAfterInsert: true}) 
  }
  render() {
    if(this.state.filter === false && this.state.listAfterInsert === false ) {
      const numberOfPages = (this.state.totalResults % 2) === 0 ? this.state.totalResults / 2 : Math.floor(this.state.totalResults / 2) + 1;
      console.log("Number: " + numberOfPages)
      return (
        <div className="App">
          <Nav />
          <div className="container">
            <div className="row">
              <div className="col s6 m3 l3">
                  <SearchArea handleChange={this.handleChange}></SearchArea>
              </div>
              <div className="col m1 l1"></div>
              <div className="col m4 l4"></div>
              <div className="col s6 m4 l4">
                <AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie>
              </div>
            </div>
          </div>
          <MovieList movieCallback={this.callbackFromList} ref={this.movieListRef}></MovieList>
          { this.state.totalResults > 2 ? <Pagination pages={ numberOfPages } nextPage= {this.nextPage} currentPage={this.state.currentPage} /> : '' }
        </div>
      );
    } else if (this.state.filter === true && this.state.listAfterInsert === false) {
      return (
        <div className="App">
          <Nav />
          <div className="container">
            <div className="row">
              <div className="col s3">
                  <SearchArea handleChange={this.handleChange}></SearchArea>
              </div>
              <div className="col s1"></div>
              <div className="col s4"></div>
              <div className="col s4">
                <AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s10 offset-s1">
                {this.state.moviesFiltered}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const numberOfPages = (this.state.totalResults % 2) === 0 ? this.state.totalResults / 2 : Math.floor(this.state.totalResults / 2) + 1;
      return (
        <div className="App">
          <Nav />
          <div className="container">
            <div className="row">
              <div className="col s3">
                  <SearchArea handleChange={this.handleChange}></SearchArea>
              </div>
              <div className="col m1"></div>
              <div className="col m4"></div>
              <div className="col s4">
                <AddAMovie handleInsert={this.handleInsert} insertCallback={this.callbackFromInsert}></AddAMovie>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col s10 offset-s1">
                {this.state.moviesToShowInsert}
                { this.state.totalResults > 2 ? <Pagination pages={ numberOfPages } nextPage= {this.nextPage} currentPage={this.state.currentPage} /> : '' }
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;