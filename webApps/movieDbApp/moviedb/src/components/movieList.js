import React, { Component } from 'react'
import axios from '../axios'

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Movies: []
        };
    
    }
    getMoviesData = (page) => {
        axios
            .get(`/movies`, {})
            .then(res => {
                const data = res.data
                const numberOfMovies = data.length;
                const movies = data.map((movie, i) =>
                {
                    if(page === (Math.floor(i / 20) + 1)) {
                        return(
                            <div className="col s12 m3 l3" key={i} page={ page } movieid ={movie.idFromTmdb}>
                                <div className="card">
                                    <div className="card-image waves-effect waves-block waves-light">
                                        <img src={movie.url2poster} alt={movie.movieTitle} className="responsive-img" />
                                        <p className="littleFont" align="center"><span><b>{movie.movieTitle}</b></span></p>
                                    </div>
                                    <div className="card-action">
                                        <a href="#" onClick={() => this.props.viewMovieInfo(movie.idFromTmdb)}>Movie Details</a>
                                    </div>
                                </div>
                            </div>
                            )
                    }
                }
/*                     <tr>
                        <td id="posterImage"><img src={movie.url2poster} alt={movie.movieTitle} height="10%" width="10%"/></td>
                        <td id="movieTitle">{movie.movieTitle}</td>
                        <td id="movieGenre">{movie.movieGenre.join(', ')}</td>
                        {//For Nested Array
                            movie.director.map(value => {
                                return(
                                    <td id="directors" key={value.name}>{value.name}</td>
                                );
                            })
                        }
                        <td id="idTmdb">{movie.idFromTmdb}<input type="hidden" value={movie.movieTitleLower}/></td>
                    </tr> */
                )
                this.setState({movies})
                this.setState({data})
                this.setState({numberOfMovies})
                this.sendMovies()
            })
            .catch((error) => {
                console.log(error)
            })
    }
    componentDidMount(){
        this.getMoviesData(1)
    }
    sendMovies = () => {
        this.props.movieCallback(this.state.data, this.state.movies, this.state.numberOfMovies);
    }
    render() {
/*         return (
            <div className="container">
                <div className="row">
                    <div className="col s10 offset-s1">
                        <table className="highlight responsive-table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Director</th>
                                    <th>idFromTmdb</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.movies}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )   */ 
        return (
            <div className="container">
                <div className="row">
                    <div className="col s10 offset-s1">
                        {this.state.movies}
                    </div>
                </div>
            </div>
        )
    }
}