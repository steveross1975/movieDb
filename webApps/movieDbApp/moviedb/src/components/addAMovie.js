import React, { Component } from 'react'
import axios from '../axios'
 
export default class AddAMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Movies: [],
            movieTyped: ""
        };
    }
    //Aggiungere qui la query e effettuare il filtro non su DB, ma dal document? 
    insertMovie = (movieTitleTyped) => {
        console.log(movieTitleTyped)
        axios
        .post(`/movies`, {movieTitle: movieTitleTyped})
        .then(function () {
            axios
            .get(`/movies`, {})
            .then(res => {
                const data = res.data
                console.log(data);
                const numberOfMovies = data.length;
                const movies = data.map((movie, i)=>
                    <div className="col s12 m3 l3" key={i} movieid ={movie.idFromTmdb}>
                        <div className="card">
                            <div className="card-image waves-effect waves-block waves-light">
                                <img key={i} src={movie.url2poster} alt={movie.movieTitle} className="responsive-img" />
                                <p className="littleFont" align="center"><span><b>{movie.movieTitle}</b></span></p>
                            </div>
                            <div className="card-action">
                                <a href="#">Movie Details</a>
                            </div>
                        </div>
                    </div>
                )
                console.log(movies)
                this.setState(() => ({movies: movies}))
                this.setState({data})
                this.setState({numberOfMovies})
                this.sendMovies()
            })
            .catch((error) => {
                console.log(error)
            })
          })
        .catch((error) => {
            console.log(error)
        })
    }
    handleButtonPress = (e) => {
        this.insertMovie(this.state.movieTyped);
        console.log(e.target.value)
      };
    handleChange = (e) => {
        this.setState({movieTyped: e.target.value});
        if(e.keyCode === 13) {
            this.insertMovie(this.state.movieTyped);
        }
    }

    render () {
        return (
            <form action="">
                <div className="valign-wrapper">
                    <div className="col s6 m6 l6">
                        <div className="input-field">
                            <input type="text" placeholder="Add a Movie" value={this.state.movieTyped} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="col s6 m4 l4">
                        <button className="btn waves-effect waves-light" name="action" type="submit" onClick={this.handleButtonPress}>Submit
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}