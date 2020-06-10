import * as React from 'react';
//import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styles from '../constants/Styles'
import InsertArea from '../components/insertArea'

export default function InsertScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <InsertArea></InsertArea>
    </ScrollView>
  );
}

