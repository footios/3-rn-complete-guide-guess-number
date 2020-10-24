import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  ScrollView,
  FlatList
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { ScreenOrientation } from 'expo';
import * as ScreenOrientation from "expo-screen-orientation";

import NumberContainer from "../components/NumberContainer";
import DefaultStyles from "../constants/default-styles";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

// outside because it shouldn't be recreated in every rerendering...
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min) + min);
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

// This func rendrers the list of guesses.
// The first arg is the one you pass with 'bind'.
const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{listLength - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const GameScreen = props => {
  // You can lock the orientation when the app reaches a sertain point.
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  ScreenOrientation.addOrientationChangeListener;

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
    Dimensions.get("window").width
  );
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      const rounds = pastGuesses.length;
      props.onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get("window").width);
      setAvailableDeviceHeight(Dimensions.get("window").height);
    };
    Dimensions.addEventListener("change", updateLayout);

    // Note: `return`, returns a function!!!
    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  const nextGuessHandler = direction => {
    const shouldBeLower =
      direction === "lower" && currentGuess < props.userChoice;
    const shouldBeGreater =
      direction === "greater" && currentGuess > props.userChoice;
    if (shouldBeLower || shouldBeGreater) {
      Alert.alert("Wrong hint!", "Please try again.", [
        {
          text: "Sorry",
          style: "cancel"
        }
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // currentGuess wouldn't work, because React wouldn't have updated
    // the state and rebuild the component
    // By mistake I had ...pastGuesses and it worked!
    setPastGuesses(curPastGuesses => [
      nextNumber.toString(),
      ...curPastGuesses
    ]);
  };

  let listContainerStyle = styles.listContainer;
  if (availableDeviceWidth > 350) {
    listContainerStyle = styles.listContainerBig;
  }

  // Change layout: put buttons and currentGuess in a row (for landscape).
  if (availableDeviceHeight < 500) {
    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <Text style={DefaultStyles.title}>Opponent's Guess: </Text>
        <View style={styles.controls}>
          <View style={styles.button}>
            <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove-circle" size={35} color="white" />
            </MainButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.button}>
            <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add-circle" size={35} color="white" />
            </MainButton>
          </View>
        </View>

        <View style={listContainerStyle}>
          <FlatList
            // use it if you don't know how many items...
            // It expects objs with key and value pairs
            keyExtractor={item => item} // we can do 'parseInt(item) + 1'
            data={pastGuesses}
            // renderItem expects only 1 arg, but with 'bind' we can add more....
            // The 2nd arg will be the 1st received be the func
            renderItem={renderListItem.bind(this, pastGuesses.length)}
            contentContainerStyle={styles.list}
          />
          {/* we subtract the index from pastGuesses.length to have the last index by the last guess */}
          {/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={DefaultStyles.title}>Opponent's Guess: </Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove-circle" size={35} color="white" />
          </MainButton>
        </View>
        <View style={styles.button}>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add-circle" size={35} color="white" />
          </MainButton>
        </View>
      </Card>
      <View style={listContainerStyle}>
        <FlatList
          // use it if you don't know how many items...
          // It expects objs with key and value pairs
          keyExtractor={item => item} // we can do 'parseInt(item) + 1'
          data={pastGuesses}
          // renderItem expects only 1 arg, but with 'bind' we can add more....
          // The 2nd arg will be the 1st received be the func
          renderItem={renderListItem.bind(this, pastGuesses.length)}
          contentContainerStyle={styles.list}
        />
        {/* we subtract the index from pastGuesses.length to have the last index by the last guess */}
        {/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
				</ScrollView> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center"
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
    maxWidth: "90%"
  },
  button: {
    width: "30%",
    margin: 10
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-around",
    // alignItems: 'center',
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    width: "100%"
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%"
  },
  listContainer: {
    flex: 1, // this is to scroll on android
    width: "80%"
  },
  listContainerBig: {
    flex: 1,
    width: "60%"
  },
  list: {
    // flex: 1, // does the job: starts list from bottom but is not scrollable
    flexGrow: 1,
    // alignItems: 'center', // not needed when listItem takes all of list's width
    justifyContent: "flex-end"
  }
});

export default GameScreen;
