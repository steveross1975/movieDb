import React, {Component} from 'react'
import Carousel from './Carousel'
import {Text, View} from 'react-native'
import Styles from '../constants/Styles';
import SearchArea from './searchArea';

export default class MovieCarousel extends Component {

    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          moviesToShow: [],
          moviesFiltered: [],
          isDataFetched: false,
          filter: false
        }
        this.reFetch = this.reFetch.bind(this)
    }

    componentDidMount() {
      this.firstFetch()
    }

    firstFetch() {
      fetch('http://192.168.1.45:3000/movies', {method: 'GET'})
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({moviesToShow: responseJson, isDataFetched: true});
      })
    }

    reFetch(searchString) {
      console.log(this.state.moviesToShow)
      if(searchString === "") {
        this.setState({filter: false})
      }
      const moviesToBeFiltered = this.state.moviesToShow
      const moviesFiltered = moviesToBeFiltered.filter(movie => {
        console.log(movie.movieTitleLower + " include " + searchString + "? " + movie.movieTitleLower.includes(searchString.toLowerCase()))
        return (
          movie.movieTitleLower.includes(searchString.toLowerCase())
        )
      })
      console.log(moviesFiltered)
      this.setState({moviesFiltered: moviesFiltered})
      
      //filter
  
      this.setState({filter: true})
    }

    render() {
      if(this.state.isDataFetched === false) {
        return (
              <Text style={Styles.welcomeText}>Tons of movies, please be patient... </Text>
        )
      }
      if(this.state.filter === false) {
        return (
          <View style={Styles.getStartedContainer}>
            <Carousel items={ this.state.moviesToShow } />
            <SearchArea id="search" handleChange={this.reFetch}></SearchArea>
          </View>
        );
      } else {
        return (
          <View style={Styles.getStartedContainer}>
            <Carousel items={ this.state.moviesFiltered } />
            <SearchArea id="search" handleChange={this.reFetch}></SearchArea>
          </View>
        );
      }
    }
}

