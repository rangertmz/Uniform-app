//import liraries
import CardHome from "@/components/Cards/CardHome";
import SkeletonCard from "@/components/Skeleton";
import {
  getLastUniform,
  
} from "@/requests/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Appbar, Button, Card, Icon, PaperProvider } from "react-native-paper";

// create a component
const MyComponent = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const styles = StyleSheet.create({
    bg: {
      backgroundColor: colorScheme === "dark" ? "#222" : "#fff",
    },
    container: {
      flex: 1,
    },
    cardBg: {
      backgroundColor: "#95BEFE",
      padding: 5,
    },
    cardText: {
      color: "#fff",
      marginBottom: 5,
    },
  });

  const [token, setToken] = useState<string>("");
  const [primary, setPrimary] = useState<any>([]);
  const [secondary, setSecondary] = useState<any>([]);
  const [preparatory, setPreparatory] = useState<any>([]);
  const [university, setUniversity] = useState<any>([]);
  const [sports, setSports] = useState<any>([]);
  const [teachers, setTeachers] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = async () => {
    const data = await AsyncStorage.getItem("token");
    if (data !== null) {
      setToken(data);
    }
  };
  const fetchData = async (token: string) => {
    try {
      const resultPrimary = await getLastUniform("Primary", token);
      
      if (resultPrimary) {
        setPrimary(resultPrimary);
      }
      const resultSecondary = await getLastUniform("Secondary", token);
      if (resultSecondary) {
        setSecondary(resultSecondary);
      }
      const resultPreparatory = await getLastUniform("Preparatory", token);
      if (resultPreparatory) {
        setPreparatory(resultPreparatory);
      }
      const resultUniversity = await getLastUniform("University", token);
      
      if (resultUniversity) {
        setUniversity(resultUniversity);
      }
      const resultSports = await getLastUniform("Sports", token);
      if (resultSports) {
        setSports(resultSports);
      }
      const resultTeachers = await getLastUniform("Teachers", token);
      if (resultTeachers) {
        setTeachers(resultTeachers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchToken();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        fetchData(token);
      }
    }, [token])
  )

  return (
    <PaperProvider>
      <ScrollView style={styles.bg}>
        <View style={styles.container}>
          {isLoading ? (
            <SkeletonCard key={"skeleton"} />
          ) : (
            <>
              <CardHome
                key={"primary"}
                title='Primaria'
                data={primary}
                navigation={navigation}
                level={'Primary'}
              />
              <CardHome
                key={"secondary"}
                title='Secundaria'
                data={secondary}
                navigation={navigation}
                level={'Secondary'}
              />
              <CardHome
                key={"preparatoria"}
                title='Preparatoria'
                data={preparatory}
                navigation={navigation}
                level={'Preparatory'}
              />
              <CardHome
                key={"universidad"}
                title='Universidad'
                data={university}
                navigation={navigation}
                level={'University'}
              />
              <CardHome
                key={"deportes"}
                title='Deportes'
                data={sports}
                navigation={navigation}
                level={'Sports'}
              />
              <CardHome
                key={"profesores"}
                title='Profesores'
                data={teachers}
                navigation={navigation}
                level={'Teachers'}
              />
            </>
          )}
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

//make this component available to the app
export default MyComponent;
