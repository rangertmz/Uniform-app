import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import Login from "./src/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useColorScheme } from "@/hooks/useColorScheme";
import MyTab from "@/components/navigation/TabNav";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import Primary from "./src/Primary";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "./src/Register";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [user, setUser] = useState<string | null>(null);
  const fetchUser = async () => {
    const data = await AsyncStorage.getItem("user");
    if (data !== null) {
      setUser(data);
      
    }
  };
  useEffect(() => {
    
    fetchUser();
  }, []);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  const tileLevel = (level: string) => {
    if (level === "Primary") {
      return "Primaria";
    } else if (level === "Secondary") {
      return "Secundaria";
    } else if (level === "Preparatory") {
      return "Preparatoria";
    } else if (level === "University") {
      return "Universidad";
    } else if (level === "Sports") {
      return "Deportes";
    } else if (level === "Teachers") {
      return "Profesores";
    }
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen
          
            name='Login'
            options={{ headerShown: false }}
          >{({navigation})=><Login setUser={setUser} navigation={navigation} />}</Stack.Screen>
          <Stack.Screen
            name='tab'
            
            component={MyTab}
            options={{
              header: ({ navigation }) => {
                return <AppBar user={user} setUser={setUser} navigation={navigation} />;
              },
            }}
          />
          <Stack.Screen
            name='Primary' 
            component={Primary}
            options={({route}:any)=>({
              
              title: "Más Información - "+ tileLevel(route.params.level),
              headerStyle: { backgroundColor: "#0062D1" },
              headerTintColor: "#fff",
            })}
          />
          <Stack.Screen
            name='Register'
            
            component={Register}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const AppBar = ({ navigation, user, setUser }: any) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    setUser(null);
    navigation.goBack();
  };
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Action icon='account' color='#fff' />
      <Appbar.Content title={user} color='#fff' />
      <Appbar.Action
        icon='logout'
        color='#fff'
        onPress={() => handleLogout()}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#0062D1",
  },
});
