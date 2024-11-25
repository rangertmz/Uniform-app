import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Home from "../../app/src/Home";
import History from "../../app/src/History";
import { StyleSheet } from "react-native";
import { Icon } from "react-native-paper";

const Tab = createMaterialTopTabNavigator();

export default function MyTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
      key='home'
        name='home'
        component={Home}
        options={{ 
            tabBarStyle: styles.container,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#000',
            title: 'Resumen General',
            tabBarIcon: ({ color, size }:any) => {
                return <Icon source={'home'} size={25} color={color} />;
              },

         }}
      />
      <Tab.Screen
        key='history'
        name='History'
        component={History}
        options={{ 
            tabBarStyle: styles.container,
            tabBarActiveTintColor: '#fff',
            tabBarInactiveTintColor: '#000',
            title: 'Historial',
            tabBarIcon: ({ color, size }:any) => {
              return <Icon source={'history'} size={25} color={color} />;
            },
        }}
      />
    </Tab.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0062D1",
  },
});
