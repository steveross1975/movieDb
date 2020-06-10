import React, { Component } from 'react';
import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 0,
      marginBottom: 0,
      backgroundColor: '#fff',
    },
    containerSelected: {
      flex: 1,
      paddingBottom: 0,
      marginBottom: 0,
      backgroundColor: 'rgba(173, 216, 230, 0.3)',
      width: "100%"
    },
    developmentModeText: {
      marginBottom: 20,
      color: 'rgba(0,0,0,0.4)',
      fontSize: 14,
      lineHeight: 19,
      textAlign: 'center',
    },
    welcomeContainer: {
        alignItems: 'center',
        backgroundColor: '#e57373',
        marginBottom: 20,
        paddingTop: 0,
        marginTop: 0,
      },
    welcomeBanner: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 20,
      },
    welcomeImage: {
      width: 100,
      height: 80,
      resizeMode: 'contain',
      marginLeft: -10,
    },
    getStartedContainer: {
      alignItems: 'center',
      marginHorizontal: 50,
    },
    homeScreenFilename: {
      marginVertical: 7,
    },
    codeHighlightText: {
      color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderRadius: 3,
      paddingHorizontal: 4,
    },
    getStartedText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 24,
      textAlign: 'center',
    },    
    insertMovieText: {
      fontSize: 32,
      color: 'rgba(96,100,109, 1)',
      lineHeight: 32,
      textAlign: 'center',
    },
    tabBarInfoContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        android: {
          elevation: 20,
        },
      }),
      alignItems: 'center',
      backgroundColor: '#fbfbfb',
      paddingVertical: 20,
    },
    tabBarInfoText: {
      fontSize: 17,
      color: 'rgba(96,100,109, 1)',
      textAlign: 'left',
    },
    welcomeText: {
      fontSize: 24,
      color: '#fff',
      textAlign: 'center',
      overflow: 'visible'
    },
    welcomeTextBold: {
      fontSize: 24,
      color: '#000',
      fontWeight: "400",
      textAlign: 'left',
      overflow: 'visible',
      alignContent: "flex-start"
    },
    welcomeTextBoldMT: {
      fontSize: 36,
      color: '#000',
      fontWeight: "700",
      textAlign: 'center',
      overflow: 'visible',
      paddingBottom: 10
    },
    navigationFilename: {
      marginTop: 5,
    },
    helpContainer: {
      marginTop: 15,
      alignItems: 'center',
    },
    helpLink: {
      paddingVertical: 15,
    },
    helpLinkText: {
      fontSize: 14,
      color: '#2e78b7',
    },
    scrollView: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'visible',
    },
    bullets: {
      position: 'absolute',
      top: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      paddingHorizontal: 10,
      paddingTop: 5,
    },
    bullet: {
      paddingHorizontal: 5,
      fontSize: 20,
    },
    carouselContainer: {
      width: '100%',
      backgroundColor: '#fbfbfb',
      borderColor: '#ebebeb',
      borderWidth: 1,
      borderRadius: 8,
      shadowColor: '#fcfcfc',
      shadowOpacity: 1,
      marginTop: 10,
      shadowOffset: {
        width: 0,
        height: 5
      },
    },
    slide: {
      paddingHorizontal: 20,
      paddingBottom: 10,
      paddingTop: 30,
      flexBasis: '100%',
      flex: 1,
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      maxHeight: "100%"
    },
    slideText: {
      width: '100%',
      textAlign: 'center',
      fontSize: 20,
    },
    slideImage: {
      width: "100%",
      height: 400,
    },
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    scrollableModal: {
      height: 300,
    },
    scrollableModalContent1: {
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      padding: 20
    },
    scrollableModalText1: {
      fontSize: 20,
      color: 'white',
    },
    scrollableModalContent2: {
      height: 200,
      backgroundColor: '#A9DCD3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scrollableModalText2: {
      fontSize: 20,
      color: 'white',
    },
    saveButton: {
      borderWidth: 1,
      borderColor: '#67AAC4',
      backgroundColor: '#67AAC4',
      marginTop: 20,
      marginBottom: 10,
      width: "100%",
      padding: 10,
      margin: 5
    },
    saveButtonText: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center',
      fontWeight: "bold"
    }
  });