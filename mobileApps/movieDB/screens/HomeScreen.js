import React, {Component} from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MovieCarousel from '../components/movieCarousel';

import styles from '../constants/Styles';
 
export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeIndex:0
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <MovieCarousel></MovieCarousel>
        </ScrollView>
      </View>
    );
    }
}

HomeScreen.navigationOptions = {
  header: null,
};

