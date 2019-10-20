import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Header,
  Form,
  Input,
  Item,
  Button,
  Label
} from "native-base";
import * as firebase from "firebase";

export class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
      }
    });
  }
  signUpUser = (email, password) => {
    try {
      if (this.state.email.length == "") {
        alert("Wrong Email Address");
        return;
      } else if (this.state.password.length < 6) {
        alert("Please Enter at Least 6 characters");
        return;
      } else {
        firebase.auth().createUserWithEmailAndPassword(email, password);
        alert("User Signed up Succsfully!");
      }
    } catch (error) {
      console.log(error.toString());
    }
  };
  LoginUser = (email, password) => {
    if (this.state.email == "" || this.state.password == "") {
      alert("Please Enter Email And Password");
    } else {
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => this.props.navigation.navigate("SearchTabNavigator"));
      } catch (error) {
        alert(error.toString());
      }
    }
  };
  handlePassword = email => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function(user) {
        alert("Please check your email...");
      })
      .catch(function(e) {
        alert(e.toString());
      });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontStyle: "italic",
            fontWeight: "bold"
          }}
        >
          Login Page
        </Text>

        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={email => this.setState({ email })}
            ></Input>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={password => this.setState({ password })}
            ></Input>
          </Item>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            success
            onPress={() =>
              this.LoginUser(this.state.email, this.state.password)
            }
          >
            <Text style={{ color: "white" }}>Login</Text>
          </Button>
          <Button
            style={{ marginTop: 10 }}
            full
            rounded
            primary
            onPress={() => {
              this.signUpUser(this.state.email, this.state.password);
            }}
          >
            <Text style={{ color: "white" }}>SignUp</Text>
          </Button>
          <TouchableOpacity
            style={{ paddingTop: 30 }}
            onPress={() => {
              this.handlePassword(this.state.email);
            }}
          >
            <Text style={{ color: "blue", fontSize: 18 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </Form>
      </Container>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10
  }
});
