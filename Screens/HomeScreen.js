import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Animated,
  Dimensions
} from "react-native";
const SCREEN_HEIGHT = Dimensions.get("window").height;
import * as Animatable from "react-native-animatable";
import { Button, Header } from "native-base";

export class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };

  // componentDidMount() {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword("yalhasov@gmail.com", "password")
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  // }
  componentWillMount() {
    this.loginHeight = new Animated.Value(50);
  }

  decreaseHeightOfLogin = () => {};
  render() {
    const marginTop = this.loginHeight.interpolate({
      inputRange: [70, SCREEN_HEIGHT],
      outputRange: [25, 100]
    });
    const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/mainphoto.jpg")}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Animatable.View
              animation="zoomIn"
              iterationCount={1}
              style={{
                paddingTop: 20,
                backfaceVisibility: "hidden"
              }}
            >
              <Header style={{ backgroundColor: "black" }}>
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 30,
                    fontFamily: "sans-serif",
                    textDecorationStyle: "solid",
                    fontStyle: "italic"
                  }}
                >
                  Alcohol !nfo
                </Text>
              </Header>
            </Animatable.View>
          </View>

          {/**Bottom Half */}
          <Animatable.View animation="slideInUp" iterationCount={1}>
            <Animated.View
              style={{
                height: this.loginHeight,
                justifyContent: "center",
                alignItems: "center",
                borderColor: "grey",
                borderWidth: 1
              }}
            >
              {/** Animated */}
              <Button onPress={() => navigate("LoginScreen")}>
                <View
                  style={{
                    flex: 1
                  }}
                >
                  <Animated.View
                    style={{
                      marginTop: marginTop
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontStyle: "italic",
                        fontSize: 18,
                        justifyContent: "center"
                      }}
                    >
                      Search For A Beer/Cocktail!
                    </Text>
                  </Animated.View>
                </View>
              </Button>
            </Animated.View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
