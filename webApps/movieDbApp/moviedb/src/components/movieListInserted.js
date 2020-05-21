import React from 'react'

const MovieListInserted = (props) => {
    const newData = props.moviesAfterFilter
    if(newData !== null) {
        const newMovies = newData.map((movie, i) =>
        {
            if(props.currentPage === (Math.floor(i / 20) + 1)) {
                return(
                    <div className="col s12 m3 l3" key={i} movieid ={movie.idFromTmdb}>
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
                );
                }
        })
        console.log(newMovies)
        props.movieCallback(newData, newMovies);
        return newMovies
    } else {
        return null
    }
}

export default MovieListInserted