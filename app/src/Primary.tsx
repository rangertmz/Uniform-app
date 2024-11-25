//import liraries
import CardPrimary from "@/components/Cards/CardPrimary";
import ModalPrimary from "@/components/Modals/ModalPrimary";
import SkeletonCard from "@/components/Skeleton";
import { getUniforms } from "@/requests/database";
import { getUniformsByLevel } from "@/utils/getUniformsByLevel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Button, Card, Icon, PaperProvider, Portal } from "react-native-paper";



// create a component
const Primary = ({ navigation, route }: any) => {
  const colorScheme = useColorScheme();
  // define your styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === "dark" ? "#222" : "#fff",
    },
    btn: {
      backgroundColor: "#0062D1",
      margin: 15,
    },
  });
  const {level} = route.params
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<string>("");
  const [data, setData] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  
  useEffect(() => {
    const fetchToken = async () => {
      const tkn = await AsyncStorage.getItem("token");
      if (tkn !== null) {
        setToken(tkn);
      }
    };
    fetchToken();

  }, []);
  const fetchData = async () => {
    try{
      const result = await getUniformsByLevel(level, token)
      setData(result.tallas || [])
    }catch(e){
      console.log(e)
    } finally {
       setIsLoading(false);
    }
  }
  useEffect(() => {
    if(token){
      fetchData();
    }
  }, [token]);
  

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        
        <View style={{ marginBottom: 15 }}>
          <Portal>
           <ModalPrimary visible={open} onClose={handleClose} fetchData={fetchData} level={level}  />
          </Portal>
          <Button
            style={styles.btn}
            mode='contained'
            onPress={handleOpen}
            icon={() => (
              <Icon source='plus-circle-outline' color='#fff' size={20} />
            )}
            contentStyle={{ flexDirection: "row-reverse" }}
          >
            <Text style={{ color: "#fff" }}>
              Agregar una nueva entrada de uniforme
            </Text>
          </Button>
          {isLoading ? (<SkeletonCard/>): (
            data.map((item: any, index: number) => (
              <CardPrimary key={index} data={item} level={level}  />
            ))
          )}
           
          
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

//make this component available to the app
export default Primary;


