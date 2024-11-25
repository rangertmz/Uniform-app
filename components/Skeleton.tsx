import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonCard = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [animatedValue]);
  const interpolatedColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#454242", "#616060"],
  });
  return (
  <>
  <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, { backgroundColor: interpolatedColor }]}
      />
      
    </View>
    <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, { backgroundColor: interpolatedColor }]}
      />
      
    </View>
    <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, { backgroundColor: interpolatedColor }]}
      />
      
    </View>
    <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, { backgroundColor: interpolatedColor }]}
      />
      
    </View>
    <View style={styles.container}>
      <Animated.View
        style={[styles.skeleton, { backgroundColor: interpolatedColor }]}
      />
      
    </View>
  </> 
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginTop: 12,
    marginEnd: 12,
    marginStart: 12,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
  },
  skeleton: {
    flex: 1,
    borderRadius: 10,
  },
});

export default SkeletonCard;
