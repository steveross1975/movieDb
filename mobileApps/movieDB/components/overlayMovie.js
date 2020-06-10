import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import styles from '../constants/Styles'

export const OverlayMovie = (props) => {
    const selectedMovie = props.selectedMovie
    console.log(selectedMovie)
    return(
        <View key={selectedMovie.idFromTmdb} style={styles.scrollableModalContent1}>
            <Text style={styles.welcomeTextBoldMT}>{selectedMovie.movieTitle}</Text>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', paddingTop: 10, paddingBottom: 5 }}>
                <View style={{alignSelf: 'stretch', width: "33%" }}>
                    <Image style={{height: 150, width: 100}} source={{uri: selectedMovie.url2poster}} />
                </View>
                <View style={{ alignSelf: 'stretch', width: "67%", alignItems: "stretch", alignContent: "flex-start" }}>
                    <Text style={styles.welcomeTextBold}>Regia: {selectedMovie.director.map((dir, index) => {return <Text key={index} style={styles.tabBarInfoText}>{index < selectedMovie.director.length - 1 ? dir.name + ', ' : dir.name }</Text>})}</Text>
                    <Text style={styles.welcomeTextBold}>Uscita: <Text style={styles.tabBarInfoText}>{selectedMovie.releaseDate}</Text></Text>
                    <Text style={styles.welcomeTextBold}>Titolo Originale: <Text style={styles.tabBarInfoText}>{selectedMovie.originalTitle}</Text></Text>
                </View>
            </View>
            <Text style={styles.welcomeTextBold}>Genere: <Text style={styles.tabBarInfoText}>{selectedMovie.movieGenre.join(', ')}</Text></Text>
            <Text style={styles.welcomeTextBold}>Script: {selectedMovie.screenPlay.map((sp, index) => {return <Text key={index} style={styles.tabBarInfoText}>{index < selectedMovie.screenPlay.length - 1 ? sp.name + ', ' : sp.name }</Text>})}</Text>
            <Text style={styles.welcomeTextBold}>Sinossi: <Text style={styles.tabBarInfoText}>{selectedMovie.overview}</Text></Text>
            <Text style={styles.welcomeTextBold}>Cast</Text>
            {
                selectedMovie.cast.map((actor, index) => { 
                    return (<Text style={styles.tabBarInfoText}><Text style={{fontWeight: "bold"}}>{actor.name}</Text><Text> nel ruolo di </Text>{actor.character}</Text>)
                })
            }
            <Text style={styles.welcomeTextBold}>Produttori Esecutivi: {selectedMovie.execProducers.map((producer, index) => {return <Text key={index} style={styles.tabBarInfoText}>{index < selectedMovie.execProducers.length - 1 ? producer.name + ', ' : producer.name }</Text>})}</Text>
            <Text style={styles.welcomeTextBold}>Produttori: {selectedMovie.producers.map((producer, index) => {return <Text key={index} style={styles.tabBarInfoText}>{index < selectedMovie.producers.length - 1 ? producer.name + ', ' : producer.name }</Text>})}</Text>
            <Text style={styles.welcomeTextBold}>Musiche: {selectedMovie.musicComposer.map((composer, index) => {return <Text key={index} style={styles.tabBarInfoText}>{index < selectedMovie.musicComposer.length - 1 ? composer.name + ', ' : composer.name }</Text>})}</Text>
        </View>
    )
}

export default OverlayMovie;