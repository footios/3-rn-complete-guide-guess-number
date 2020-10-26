This is a Udemy course
[React Native - The Practical Guide](https://www.udemy.com/react-native-the-practical-guide/)

Sections:

# 4. Components, Styling, Layouts...

# 5. Responsive & Adaptive Use Interfaces...

It's a small app, you set a number and the app tries to guess it.

- expo install expo-screen-orientation
- import { ScreenOrientation } from 'expo' -> import \* as ScreenOrientation from 'expo-screen-orientation'

### Notes:

[71]

- [Why we don't call `Font.loadAsync` in a `useEffect()` ?](https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15420160#questions/8012416): I was just checking the docs of expo where they call Font.loadAsync() in the componentDidMount()( in our case useEffect()).

```js
class App extends React.Component {
  async componentDidMount() {
    await Font.loadAsync({
      "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
    });

    this.setState({ fontLoaded: true });
  }

  // ...
}
```

As we know from React docs, " If you need to load data from a remote endpoint, this (see componentDidMount()) is a good place to instantiate the network request."

1. So why we didn't use it and what's the difference between the two ways?
   BTW here is the alternative way (calling Font.loadAsync in useEffect
   without <Apploading /> ).

App.js

```js
 useEffect(() => {
        (async () => {
          await Font.loadAsync({
            'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
          });
          setDataLoaded(true);
        })()
      }, []);
...

let content
	if (dataLoaded) {
		content = <StartGameScreen onStartGame={startGameHandler} />;
	}

	if (userNumber && guessRounds <= 0 && dataLoaded) {
		content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
	} else if (guessRounds > 0 && dataLoaded) {
		content = (
			<GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
		);
	}
...
```

- [!Q) Loading fonts without <AppLoading />](https://www.udemy.com/course/react-native-the-practical-guide/learn/lecture/15420160#questions/7986182)

- [102]

```js
  style={{
        ...styles.headerBase,
        ...Platform.select({
          ios: styles.headerIOS,
          android: styles.headerAndroid
        })
      }}
```
