import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useColorScheme,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  HelperText,
  Icon,
  TextInput,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {registerUser, verifyLogin} from '../../requests/database'

// create a component

const Register = ({ navigation }: any) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#0045A4",
      flex: 1,
      justifyContent: "center",
      padding: 24,
    },
    welcomeText: {
      fontSize: 48,
      fontWeight: "bold",
      color: "#fff",
      marginBottom: 10,
      marginTop: -30,
    },
    text: {
      fontSize: 18,
      color: "#fff",
    },
    input: {
      backgroundColor: "#0062D1",
    },
    btn: {
      backgroundColor: "#0062D1",

      height: 46,
      justifyContent: "center",
      marginTop: 15,
    },
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  

  useEffect(() => {
    setIsSuccess(false);
  }, []);
  const handleLogin = async () => {
    setIsLoading(true);
    if (username === "") {
      setIsErrorName(true);
      setErrorName("El campo de usuario no puede estar vacío");
      setDisabled(true);
      setIsLoading(false);
      
    } else {
      setIsErrorName(false);
      setDisabled(false);
      
    }
    if (password === "") {
      setIsErrorPassword(true);
      setErrorPassword("El campo de contraseña no puede estar vacío");
      setDisabled(true);
      setIsLoading(false);
      
    } else {
      setIsErrorPassword(false);
      setDisabled(false);
      
    }
    try {
      
      await registerUser(username, password)
      
      
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setTimeout(() => {
        setIsSuccess(true);
      }, 900);
      setTimeout(() => {
        navigation.navigate("Login");
        setIsSuccess(false);
        setUsername("")
      setPassword("")
      }, 1600);
    } catch (e:any) {
      console.log(e)
      
      if(e.message === 'Nombre de usuario ya existe'){
        setIsErrorName(true)
        setErrorName(e.message)
      }
     
      
      setDisabled(false);
      setIsLoading(false);
    }
  };
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
     
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={require("../../assets/images/logoUmma.png")}
              style={{
                marginTop: -50,
                width: 280,
                height: 260,
                resizeMode: "contain",
                backgroundColor: "transparent",
              }}
            />
            <Text style={styles.welcomeText}>Bienvenido!</Text>
            <Text style={styles.text}>Este apartado es solo de prueba para la app</Text>
            
          </View>
          <TextInput
            textColor='#fff'
            placeholder='Usuario'
            label={<Text style={{ color: "#fff" }}> Usuario </Text>}
            value={username}
            error={isErrorName}
            onChange={(e) => {
              setUsername(e.nativeEvent.text);
              setIsErrorName(false);
              setDisabled(false);
              
            }}
            mode='outlined'
            style={styles.input}
            activeOutlineColor='#0062D1'
            underlineColorAndroid='#0062D1'
            cursorColor='#fff'
            outlineColor='transparent'
            placeholderTextColor={"#d3cfcf"}
            right={<TextInput.Icon icon='account' color={"#fff"} />}
          />
          {errorName && (
            <HelperText
              type='error'
              style={{ color: "#ea6565" }}
              visible={isErrorName}
            >
              {errorName}
            </HelperText>
          )}
          <TextInput
            textColor={"#fff"}
            placeholder='Contraseña'
            label={<Text style={{ color: "#fff" }}> Contraseña </Text>}
            value={password}
            error={isErrorPassword}
            onChange={(e) => {
              setPassword(e.nativeEvent.text);
              setIsErrorPassword(false);
              setDisabled(false);
              
            }}
            secureTextEntry={isVisible}
            mode='outlined'
            style={styles.input}
            activeOutlineColor='#0062D1'
            underlineColorAndroid='#0062D1'
            outlineColor='transparent'
            placeholderTextColor={"#d3cfcf"}
            cursorColor='#fff'
            right={
              <TextInput.Icon
                onPress={() => setIsVisible(!isVisible)}
                icon='eye'
                color={"#fff"}
              />
            }
          />
          {errorPassword && (
            <HelperText
              type='error'
              style={{ color: "#ea6565" }}
              visible={isErrorPassword}
            >
              {errorPassword}
            </HelperText>
          )}
          
          <Button
            style={styles.btn}
            mode='contained'
            onPress={handleLogin}
            disabled={disabled}
          >
            {isLoading ? (
              <ActivityIndicator animating={true} color='#fff' />
            ) : isSuccess ? (
              <Icon source='check' color='#fff' size={20} />
            ) : (
              <Text>Registrarse</Text>
            )}
          </Button>
          
        </View>
      
    </KeyboardAvoidingView>
  );
};

// define your styles

//make this component available to the app
export default Register;
