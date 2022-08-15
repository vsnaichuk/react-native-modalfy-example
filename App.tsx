import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  Easing,
  View,
  Text,
  Animated,
  Dimensions,
  Button,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  createModalStack,
  ModalProvider,
  ModalStackConfig,
  useModal,
} from "react-native-modalfy";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const modalConfig: ModalStackConfig = {
  SimpleModal: {
    modal: SimpleModal,
    backdropOpacity: 0.4,
    position: "bottom",
    animateInConfig: {
      easing: Easing.inOut(Easing.exp),
      duration: 300,
    },
    animateOutConfig: {
      easing: Easing.inOut(Easing.exp),
      duration: 300,
    },
    transitionOptions: (animatedValue: Animated.Value) => ({
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [height, 0, height],
          }),
        },
      ],
    }),
  },
};

const modalStack = createModalStack(modalConfig);

function SimpleModal() {
  const dimensions = useWindowDimensions();

  return (
    <View
      style={[
        styles.modalContainer,
        {
          width: dimensions.width,
          height: dimensions.height * 0.7,
        },
      ]}
    >
      <Text style={styles.text}>Simple Modal</Text>
    </View>
  );
}

function Screen() {
  const { openModal } = useModal();

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <Button title="Open modal" onPress={() => openModal("SimpleModal")} />

      <View>
        <Text style={styles.text} onPress={() => console.log("press")}>
          Press
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.wrapper}>
      <SafeAreaProvider>
        <ModalProvider stack={modalStack}>
          <StatusBar style="dark" />
          <Screen />
        </ModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: "space-between",
  },
  text: {
    color: "black",
    fontSize: 34,
    textAlign: "center",
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "lightgray",
  },
});
