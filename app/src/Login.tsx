import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

// create a component


const Login = ({navigation}:any) => {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: colorScheme === 'dark' ? '#222' : '#fff',
            flex: 1,
            justifyContent: 'center',
            padding: 24,
        },
        welcomeText:{
            fontSize: 48,
                fontWeight: 'bold',
                color: colorScheme === 'dark' ? '#fff' : '#000',
                marginBottom: 10,
        },
        text:{
            fontSize: 18,
                color: colorScheme === 'dark' ? '#fff' : '#000', 
        },
        input:{
            marginBottom: 8,
            backgroundColor: colorScheme === 'dark' ? '#222' : '#fff',
        },
        btn:{
            backgroundColor: '#95BEFE',
                borderRadius: 8,
                height: 48,
                justifyContent: 'center',
                marginTop: 24,
        }

        
    });
    
    return (
        <View style={styles.container}>

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 24,
                
            }}>
                <Image source={require('../../assets/images/image.png')} style={{
                    width: 200,
                    height: 200,
                    resizeMode: 'contain',
                    backgroundColor:'transparent',
                }} />
            <Text style={styles.welcomeText}>Bienvenido!</Text>
            <Text style={styles.text}>Inicie sesión para acceder a la</Text>
            <Text style={styles.text}>app de administración</Text>
            </View>
            <TextInput textColor={colorScheme==='dark'?'#fff':'#000'} placeholder='Usuario' label="Usuario" mode="outlined" style={styles.input} activeOutlineColor='#95BEFE'  underlineColorAndroid='#95BEFE' />
            <TextInput textColor={colorScheme==='dark'?'#fff':'#000'} placeholder='Contraseña' label="Contraseña" mode="outlined" style={styles.input} activeOutlineColor='#95BEFE'  underlineColorAndroid='#95BEFE' />
            <Button style={styles.btn} mode="contained" onPress={() => navigation.navigate('home')}
            
            ><Text style={{fontSize: 18,}}>Iniciar sesión</Text></Button>
        </View>
        
    );
    
};

// define your styles


//make this component available to the app
export default Login;