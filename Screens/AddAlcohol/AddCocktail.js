import React, { Component } from "react";
import { Text, View, ImageBackground, TextInput } from "react-native";
import {
  Header,
  Container,
  Icon,
  Content,
  Right,
  Body,
  Button,
  Form,
  Left,
  Item,
  Label,
  Textarea,
  Input
} from "native-base";
import * as firebase from "firebase";
import "firebase/auth";

export class AddBeer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      abv: "",
      textArea: ""
    };
  }

  addToMyCocktails = async (name, abv, description) => {
    if (this.state.name.length < 1 || this.state.name == "") {
      alert("Please Enter Name");
    } else if (this.state.abv.length == "") {
      alert("Please Enter ABV");
    } else if (this.state.textArea.length < 10 || this.state.textArea == "") {
      alert("Please Enter at least 10 char");
    } else {
      //get current user id

      currentUser = await firebase.auth().currentUser;
      //get a uniqe key
      var ref = firebase
        .database()
        .ref(currentUser.uid)
        .child("MyCocktails");

      //check if item exists in favourites
      ref
        .orderByChild("name")
        .equalTo(name)
        .once("value", snaphot => {
          if (snaphot.exists()) {
            alert("Cocktail is already in MyCocktails!");
            return;
          } else {
            //update the beername at the uniqe key

            ref.push().set({
              name: name,
              abv: abv,
              description: description
            });
          }
        })
        // Fix the setstate area
        .then(
          this.setState({
            name: "",
            abv: "",
            textArea: ""
          })
        );
      alert("Cocktail added successfully!");
    }
  };
  render() {
    return (
      <Container style={{ flex: 1 }}>
        <Header style={{ height: 80 }}>
          <Left />
          <Body style={{ paddingLeft: 20 }}>
            <Text style={{ paddingTop: 20, fontSize: 20, color: "white" }}>
              Add a Cocktail
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
        </Header>
        <ImageBackground
          style={{ flex: 1 }}
          source={require("../../assets/addcocktail.jpg")}
        >
          <Content
            contentContainerStyle={{
              flex: 1,
              paddingTop: 50,
              paddingRight: 10
            }}
            padder
          >
            <Form
              style={{
                alignContent: "space-between"
              }}
            >
              <Item floatingLabel style={{ borderColor: "black" }}>
                <Label style={{ color: "white", fontWeight: "300" }}>
                  Cocktail Name
                </Label>
                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={name => this.setState({ name })}
                  style={{ color: "red" }}
                ></Input>
              </Item>

              <Item floatingLabel style={{ borderColor: "black" }}>
                <Label style={{ color: "white", fontWeight: "300" }}>ABV</Label>

                <Input
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="numeric"
                  maxLength={3}
                  onChangeText={abv => this.setState({ abv })}
                  style={{ color: "red" }}
                ></Input>
              </Item>
              <View style={{ paddingTop: 40 }}>
                <Label style={{ color: "white", fontWeight: "300" }}>
                  Description
                </Label>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Write here"
                  borderColor="black"
                  onChangeText={textArea => this.setState({ textArea })}
                  style={{ color: "red" }}
                />
              </View>
            </Form>
            <View style={{ paddingTop: 150 }}>
              <View
                style={{
                  alignItems: "center"
                }}
              >
                <Button
                  warning
                  full
                  onPress={() => {
                    this.addToMyCocktails(
                      this.state.name,
                      this.state.abv,
                      this.state.textArea
                    );
                  }}
                >
                  <Text style={{ color: "white", fontSize: 18 }}>
                    Submit for OverView
                  </Text>
                </Button>
              </View>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default AddBeer;
