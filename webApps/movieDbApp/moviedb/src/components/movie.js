import React, {Component} from 'react';


const Movie = (props) => {

    console.log(props)
    return (
        <div className="container">
            <div className="row" onClick={ () => props.nullMovie() } style={{cursor: "pointer", paddingTop: 50}}>
                <i className="fas fa-arrow-left"></i>
                <span style={{marginLeft: 10}}>Go back</span>
            </div>
            <div className="row">
                <div className="col s6 m6 l6">
                    <div className="col s12 m12 l12" style={{padding: 8}}>
                        <img src={ props.currentMovie[0].url2poster } alt="card image" style={{width: "100%", height: "100%"}}></img>
                    </div>
                </div>
                <div className="col s6 m6 l6">
                    <ul className="collection">
                        <li className="collection-item avatar">
                            <i className="fas fa-ticket-alt circle"></i>
                            <span className="title"><b>Title</b></span>
                                <p id="originalTitle" key={props.currentMovie[0].movieTitle}><b>{props.currentMovie[0].movieTitle}</b></p>
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-ticket-alt circle"></i>
                            <span className="title"><b>Original Title</b></span>
                                <p id="originalTitle" key={props.currentMovie[0].originalTitle}><b>{props.currentMovie[0].originalTitle}</b></p>
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-video circle"></i>
                            <span className="title"><b>Release Date</b></span>
                                <p id="overview" key={props.currentMovie[0].releaseDate}  style={{fontSize: 11}}><b>{props.currentMovie[0].releaseDate}</b></p>
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-video circle"></i>
                            <span className="title"><b>Genre(s)</b></span>
                                <p id="overview" key={props.currentMovie[0].movieGenre}  style={{fontSize: 11}}>{props.currentMovie[0].movieGenre.join(', ')}</p>
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-scroll circle"></i>
                            <span className="title"><b>Overview</b></span>
                                <p id="overview" key={props.currentMovie[0].overview}  style={{fontSize: 11}}>{props.currentMovie[0].overview}</p>
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-video circle"></i>
                            <span className="title"><b>Director</b></span>
                            {//For Nested Array
                                props.currentMovie[0].director.map(value => {
                                    return(
                                        <p id="directors" key={value.name} style={{fontSize: 11}}><b>{value.name}</b></p>
                                    );
                                })
                            }
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-theater-masks circle"></i>
                            <span className="title"><b>Cast</b></span>
                            {//For Nested Array
                                props.currentMovie[0].cast.map(value => {
                                    return(
                                    <p id="actors" key={value.name} style={{fontSize: 11}}><b>{value.name}</b> nel ruolo di <b>{value.character}</b></p>
                                    );
                                })
                            }
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-euro-sign circle"></i>
                            <span className="title"><b>Executive Producers</b></span>
                            {//For Nested Array
                                props.currentMovie[0].execProducers.map(value => {
                                    if (value.name !== null) {
                                        return(<p id="execProducers" key={value.name} style={{fontSize: 11}}>{value.name}</p>);
                                    } else {
                                        return(<p id="execProducers" style={{fontSize: 11}}>No Exec Producers threw their money away in this movie!</p>);
                                    }
                                })
                            }
                        </li>
                        <li className="collection-item avatar">
                            <i className="fas fa-dollar-sign circle"></i>
                            <span className="title"><b>Producers</b></span>
                            {//For Nested Array
                                props.currentMovie[0].producers.map(value => {
                                    return(
                                        <p id="producers" key={value.name} style={{fontSize: 11}}>{value.name}</p>
                                    );
                                })
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
    )
}

export default Movie;