import React, { Component } from "react";
import { Text, View, ListView, YellowBox } from "react-native";
import {
  Container,
  Content,
  ListItem,
  Header,
  Right,
  Left,
  Title,
  Button,
  Icon,
  Body
} from "native-base";
import * as firebase from "firebase";
YellowBox.ignoreWarnings(["ListView is deprecated"]);

var data = [];
var currentUser;

class FavouritesTab extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      listViewData: data
    };
  }
  componentDidMount() {
    this.getFavourites();
  }
  handleRemovedItem = async () => {
    currentUser = await firebase.auth().currentUser;
    var that = this;

    firebase
      .database()
      .ref(currentUser.uid)
      .child("favourites")
      .on("child_removed", function(data) {
        var newData = [...that.state.listViewData];
        newData.push(data);

        that.setState({ listViewData: newData });
      });
  };
  getFavourites = async () => {
    currentUser = await firebase.auth().currentUser;
    var that = this;

    firebase
      .database()
      .ref(currentUser.uid)
      .child("favourites")
      .on("child_added", function(data) {
        var newData = [...that.state.listViewData];
        newData.push(data);

        that.setState({ listViewData: newData });
      });
  };
  DeleteItem = async key => {
    currentUser = await firebase.auth().currentUser.uid;

    var ref = firebase
      .database()
      .ref(currentUser)
      .child("favourites");
    alert("Item Removed!");

    ref.child(key).remove();
    this.props.navigation.replace("SearchTabNavigator");
  };
  render() {
    return (
      <Container contentContainerStyle={{ flex: 1 }}>
        <Header>
          <Left />
          <Body>
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontStyle: "italic"
              }}
            >
              Favourites
            </Text>
          </Body>
          <Right>
            <Button onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Right>
        </Header>
        <Content>
          <ListView
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data => (
              <ListItem
                style={{
                  justifyContent: "flex-end",
                  justifyContent: "space-between"
                }}
                // onPress={() =>
                //   this.props.navigation.navigate("SearchTab", {
                //     beerName: data.val().name
                //   })
                // }
              >
                <Button transparent onPress={() => this.DeleteItem(data.key)}>
                  <Icon name="trash"></Icon>
                </Button>
                <Text>{data.val().name}</Text>
              </ListItem>
            )}
          ></ListView>
        </Content>
      </Container>
    );
  }
}

export default FavouritesTab;
