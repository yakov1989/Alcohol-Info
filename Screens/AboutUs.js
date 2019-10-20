import React, { Component } from "react";
import { Text, View, ImageBackground } from "react-native";
import {
  Header,
  Container,
  Icon,
  Content,
  Right,
  Body,
  Button,
  Form,
  Left
} from "native-base";

export class AboutUs extends Component {
  render() {
    return (
      <Container style={{ flex: 1, backgroundColor: "lightgrey" }}>
        <Header style={{ height: 80 }}>
          <Left />
          <Body style={{ paddingLeft: 50 }}>
            <Text
              style={{
                paddingTop: 20,
                fontSize: 26,
                color: "white",
                fontStyle: "italic"
              }}
            >
              A Bit More
            </Text>
          </Body>
          <Right>
            <Button
              style={{ paddingTop: 20 }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
              transparent
            >
              <Icon name="md-arrow-round-back" />
            </Button>
          </Right>
          {/* <ImageBackground
            style={{ flex: 1 }}
            source={require("../assets/aboutus.jpg")}
          ></ImageBackground> */}
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            paddingTop: 50,
            paddingRight: 10
          }}
        >
          <Form
            style={{
              alignItems: "center",
              alignContent: "space-between"
            }}
          >
            <View>
              <Text h2 style={{ color: "red", fontSize: 20 }}>
                Who Are We?
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "500" }}>
                So we are a relatively new app that provides information on
                cocktails and beers of all kinds. We created the app
                specifically to help out when you read so many cocktails on the
                menu and have no idea what they contain.
              </Text>
            </View>
            <View style={{ paddingTop: 30 }}>
              <Text h2 style={{ color: "red", fontSize: 20 }}>
                Funny Fact
              </Text>
              <Text style={{ fontSize: 16, paddingTop: 10, fontWeight: "500" }}>
                A Russian chimp had to go to rehab because he had developed an
                alcohol addiction after too many visitors had given him
                alcoholic “treats.”
              </Text>
            </View>
          </Form>
          <View style={{ paddingTop: 50 }}>
            <Text h2 style={{ paddingTop: 30, color: "blue" }}>
              Cant Find Something?
            </Text>
            <View
              style={{
                flexDirection: "row-reverse"
              }}
            >
              <Button
                transparent
                iconLeft
                onPress={() => {
                  this.props.navigation.navigate("AddBeer");
                }}
              >
                <Text style={{ color: "blue" }}>Add a Beer</Text>
                <Icon name="beer" />
              </Button>

              <Button
                transparent
                iconLeft
                style={{ marginRight: 20 }}
                onPress={() => {
                  this.props.navigation.navigate("AddCocktail");
                }}
              >
                <Text style={{ color: "blue" }}>Add a Cocktail</Text>
                <Icon name="wine" />
              </Button>
            </View>
            <View
              style={{
                flexDirection: "row-reverse"
              }}
            >
              <Button
                transparent
                iconLeft
                onPress={() => {
                  this.props.navigation.navigate("beerList");
                }}
              >
                <Text style={{ color: "blue" }}>My Beer List</Text>
                <Icon name="ios-list-box" />
              </Button>

              <Button
                transparent
                iconLeft
                style={{ marginRight: 20 }}
                onPress={() => {
                  this.props.navigation.navigate("cocktailList");
                }}
              >
                <Text style={{ color: "blue" }}>My Cocktail List</Text>
                <Icon name="ios-list-box" />
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

export default AboutUs;
