import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { View, TextInput, Keyboard, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons'; 
import styles from '../constants/Styles';

export default class InsertArea extends Component {
    constructor(props){
        super(props);
        this.state = {
          movie:'',
          moviesRetrieved: [],
          checked:[false],
          movieSelected: [],
          selectedMoviesIds: [],
          resultsReturned: false,
          appo: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        console.log(event)
        this.setState({movie: event})
    }
    resetInsertScreen() {
        this.setState({resultsReturned: false, movie: '', movieSelected: [], appo: false})
    }    
    selectDeselectMovie(id, index, newArray) {
        let select
        console.log(index)
        newArray.map((sel, ind) => {
            if(ind === index) {
                console.log("QUANTE VOLTE ENTRO QUI DENTRO? " + index)
                if(sel[index] === false) {
                    select = true
                } else {
                    select = false
                }
                newArray[index] = {[index]: select};
                this.setState({movieSelected: newArray, appo: true}, () => {Object.entries(this.state.movieSelected).map(([key, val], index) => {console.log("Key1 = " + key + ", Val1 = " + val[index])})});
            }
        })
    }
    handleSubmit(movie) {
        if(movie) {
            const moviePlus = movie.toString().replace(/ /g,"+")
            const connectString = 'https://api.themoviedb.org/3/search/movie?api_key=4f5775bb5cc4cd1ef737700d2f9ed436&query=' + moviePlus.toString() + '&language=en-US'
            console.log(connectString)
            fetch(connectString, {method: 'GET'})
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({moviesRetrieved: responseJson, resultsReturned: true});
            })
        } else {
            Alert.alert("Insert a title", "... or at least a part of it")
        }
    }
    render() {
        if(this.state.resultsReturned === false) {
            return (
                <ScrollView contentContainerStyle={styles.welcomeBanner}>
                    <TextInput style={styles.insertMovieText} type="text" value={this.state.movie} placeholder="Search on The Movie DB" onChangeText={this.handleChange} onBlur={Keyboard.dismiss}></TextInput>
                    <TouchableOpacity style={styles.saveButton} onPress={() => this.handleSubmit(this.state.movie)}>
                        <Text style={styles.saveButtonText}>Search</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        }
        let newArray = []
        return (
            <ScrollView contentContainerStyle={styles.welcomeBanner}>
                {this.state.moviesRetrieved.results.map((movieRetrieved, index) => {
                    if(this.state.appo === false) {
                        newArray.push({[index]: false})
                    } else {
                        console.log(this.state.movieSelected)
                        newArray = this.state.movieSelected
                    } 
                    return (
                            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingTop: 10, paddingBottom: 5, paddingLeft: 15, alignContent: 'center', alignItems: 'center' }} key={index.toString()}>
                                <TouchableOpacity style={{width:"95%"}} id={"Touch-" + index} ref={"Touch-" + index} onPress={() => this.selectDeselectMovie(movieRetrieved.id, index, newArray)} key={index}>
                                    {console.log(newArray[index][index])}
                                    {newArray[index][index] === false ? <View style={{ width: "100%", padding: 5}}><Image style={{height: 150, width: 100}} source={{uri: "https://image.tmdb.org/t/p/w500" + movieRetrieved.poster_path}} /><Text style={styles.welcomeTextBold}>{movieRetrieved.title}</Text></View> : <View style={styles.containerSelected}><View style={{ padding: 5}}><Image style={{height: 150, width: 100}} source={{uri: "https://image.tmdb.org/t/p/w500" + movieRetrieved.poster_path}} /><Text style={styles.welcomeTextBold}>{movieRetrieved.title}</Text></View></View>}
                                </TouchableOpacity>
                            </View>
                    )
                })}
                <TouchableOpacity style={styles.saveButton} onPress={() => this.resetInsertScreen()}>
                    <Text style={styles.saveButtonText}><AntDesign name="closesquare" size={20} color="white" />  Close</Text>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}