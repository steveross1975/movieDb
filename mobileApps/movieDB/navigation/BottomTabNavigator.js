import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, Text } from 'react-native'
import styles from '../constants/Styles'

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import InsertScreen from '../screens/InsertScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: 'La Filmoteca di Ross & Rachel' });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Movies"
        component={HomeScreen}
        options={{
          title: 'Movies',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="clapperboard" />,
        }}
      />
      <BottomTab.Screen
        name="Insert"
        component={InsertScreen}
        options={{
          title: 'Insert',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="add-to-list" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return <Text style={styles.welcomeText} >La Filmoteca</Text>

    case 'Links':
      return <Text style={styles.welcomeText} >La Filmoteca</Text>
  }
}
