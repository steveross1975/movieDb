import React, {useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles  from '../constants/Styles';
import Modal from 'react-native-modal';
import OverlayMovie from './overlayMovie';
import styles from '../constants/Styles';
import {ScrollView} from 'react-native-gesture-handler'

export const Slide = (props) => {
    const movie = props.movie;
    const [visible, setVisible] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const scrollOffset = 0

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
      console.log("Visibile? " + isModalVisible)
    };

    const handlePress = () => {
        toggleModal()

    };
    const handleOnScroll = (event) => {
          const scrollOffset = event.nativeEvent.contentOffset.y
    };
    if(isModalVisible === true) {
        return(
            <View style={styles.welcomeContainer}>
                <Modal isVisible={isModalVisible} scrollOffset={scrollOffset} onSwipeComplete={toggleModal} onBackdropPress={toggleModal}>
                    <ScrollView onScroll={handleOnScroll}>
                        <OverlayMovie selectedMovie={movie}></OverlayMovie>
                    </ScrollView>
                </Modal>
            </View>
        )
    }

    return (
        <View style={Styles.slide}>
            <TouchableOpacity style={{width: "100%"}} onPress={() => handlePress()} key={props.title}>
                <Image style={{ ...Styles.slideImage }} source={{uri: props.poster}} />
                <Text style={{ ...Styles.slideText }}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

export default Slide;