import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/TabBarIcon';
import CheckIn from '../screens/HomeScreen';
import InFlight from '../screens/LinksScreen';
import Leaderboard from '../screens/LeaderboardScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Check In';

export default function BottomTabNavigator({ navigation, route }) {

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Check In"
        component={CheckIn}
        options={{
          title: 'Check In',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-checkbox-outline" />,
        }}
      />
      <BottomTab.Screen
        name="In Flight"
        component={InFlight}
        options={{
          title: 'In Flight',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-airplane" />,
        }}
      />
      <BottomTab.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-trophy" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

