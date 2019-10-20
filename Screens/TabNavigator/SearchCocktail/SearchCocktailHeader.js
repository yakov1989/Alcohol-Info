import React, { Component } from "react";
import { Text } from "react-native";
import { Header, Icon, Item, Input, Button, Left } from "native-base";
import * as firebase from "firebase";
import { withNavigation } from "react-navigation";
class SearchCocktailHeader extends Component {
  handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("LoginScreen");
      });
  };
  render() {


    return (
      <Header style={{ height: 100 }} searchBar rounded={true}>
        <Left>
          <Button transparent   onPress={() => {
              this.handleLogout();
            }}>
            <Icon name="ios-log-out" />
            <Text style={{ color: "lightblue", marginLeft: 5 }}>LogOut</Text>
          </Button>
        </Left>
        <Item style={{ width: 100 }}>
          <Input
            placeholder="Enter Cocktail Name"
            returnKeyType={"search"}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.CocktailSearch}
          ></Input>

          <Icon name="ios-search" />
        </Item>
      </Header>
    );
  }
}

export default withNavigation(SearchCocktailHeader) ;
