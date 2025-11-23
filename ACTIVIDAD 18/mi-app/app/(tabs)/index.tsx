import React, { useState } from "react";
import { Image, StyleSheet, Platform, View } from "react-native";
import { Button } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {HelloWave} from "@/components/hello-wave";

export default function HomeScreen() {
  // Estado del saludo
  const [greeting, setGreeting] = useState("¡Hola, Alumno!");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#010D1A" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! Alumno 👋</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.greetingContainer}>
        <ThemedText style={styles.greetingText}>{greeting}</ThemedText>

        <Button 
          title="CAMBIAR SALUDO"
          onPress={() => setGreeting(greeting === "¡Hola, Alumno!" ? "¡Hola, React Native con Expo!" : "¡Hola, Alumno!")}
        />
      </View>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: "cmd + d", android: "cmd + m" })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  greetingContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  greetingText: {
    fontSize: 24,
    marginBottom: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
