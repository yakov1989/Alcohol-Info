import React, { Component } from "react";
import {
  Text,
  View,
  ListView,
  YellowBox,
  StyleSheet,
  Share,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  ListItem,
  Header,
  Right,
  Left,
  Button,
  Icon,
  Body
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";

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
      .child("MyCocktails")
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
      .child("MyCocktails")
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
      .child("MyCocktails");
    alert("Item Removed!");

    ref.child(key).remove();
    this.props.navigation.replace("AboutUs");
  };

  handleShare = name => {
    const br = "\n";
    console.log(name);
    Share.share({
      message:
        "You Have to Try this Cocktail!" +
        br +
        name +
        br +
        br +
        "Alcohol Info App"
    }).then(({ action }) => {
      if (action === Share.sharedAction) console.log("Share was successful");
      else console.log("Share was dismissed");
    });
  };
  render() {
    return (
      <Container
        contentContainerStyle={{ flex: 1 }}
        style={{ backgroundColor: "lightgrey" }}
      >
        <Header>
          <Left />
          <Body>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontStyle: "italic"
              }}
            >
              My Cocktail List
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
              <ScrollView>
                <ListItem
                  style={{
                    justifyContent: "flex-end"
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Button
                      transparent
                      onPress={() => this.DeleteItem(data.key)}
                    >
                      <Icon name="trash"></Icon>
                    </Button>
                    <TouchableOpacity
                      onPress={() => this.handleShare(data.val().name)}
                    >
                      <Icon
                        name="md-share"
                        style={{ fontSize: 20, paddingTop: 12 }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.textTitle}>Name</Text>
                    <Text style={styles.textValue}>{data.val().name}</Text>
                    <Text style={styles.textTitle}>Abv</Text>
                    <Text style={styles.textValue}>{data.val().abv}</Text>
                    <Text style={styles.textTitle}>Description</Text>
                    <Text style={styles.textValue}>
                      {data.val().description}
                    </Text>
                  </View>
                </ListItem>
              </ScrollView>
            )}
          ></ListView>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  textValue: {
    fontSize: 16
  }
});
export default FavouritesTab;
