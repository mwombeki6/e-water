import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import React from "react";
import { useAssets } from "expo-asset";
import { router } from "expo-router";

export default function Index() {
  const video = React.useRef(null)
  const [assets] = useAssets([require("@/assets/videos/intro.mp4")])

  return (
    <View style={styles.container}>
      {
        assets && <Video ref={video} style={styles.video} source={{ uri: assets[0].uri }} resizeMode={ResizeMode.COVER} shouldPlay isLooping />
      }
      <View style={styles.overlay}>
        <Text style={styles.mainText}>e~water</Text>
        <Text style={styles.subText}>electronic water</Text>
        <Text style={styles.subText}>Fetch water, fetch electronic</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/register")}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  mainText: {
    color: "white",
    fontSize: 68,
    fontWeight: "bold",
    textAlign: "center",
  },
  subText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  tagline: {
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    backgroundColor: "#6200ea",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3, // Adds a shadow effect on Android
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
