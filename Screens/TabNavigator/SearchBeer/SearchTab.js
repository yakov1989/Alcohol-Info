import React, { Component } from "react";
import { Container, Content } from "native-base";
import { Keyboard, YellowBox, Text } from "react-native";
import SearchHeader from "./SearchHeader";
import SearchBody from "./SearchBody";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
YellowBox.ignoreWarnings(["@firebase/database"]);

class SearchTab extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    searchBeer: "",
    beerData: {},
    beerFound: false,
    error: ""
  };
  componentDidMount() {
    if (this.props.navigation.state.params !== undefined) {
      this.setState(
        {
          searchBeer: this.props.navigation.state.params.beerName
        },
        () => this.beerSearch()
      );
    }
  }
  beerSearch = () => {
    Keyboard.dismiss();
    const beerName = this.state.searchBeer.toLowerCase();
    if (beerName.length == 0) {
      alert("Please Enter valid Beer Name!");
    } else {
      const query =
        "https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=" +
        beerName +
        "&facet=style_name&facet=cat_name&facet=name_breweries&facet=country";

      axios
        .get(query)
        .then(response => {
          var data = response.data.records[0].fields
            ? response.data.records[0].fields
            : false;

          if (data) {
            this.setState({
              beerData: data,
              beerFound: true
            });
          }
        })
        .catch(error => {
          this.setState({
            beerFound: false,
            error: "Beer Not Found"
          });
          console.log(error);
        });
    }
  };
  renderContent = () => {
    if (this.state.beerFound) {
      return (
        <SearchBody
          beerName={this.props.beerName}
          beerData={this.state.beerData}
        />
      );
    } else {
      // console.log("Cocktail not Found");
    }
  };

  render() {
    return (
      <Container>
        <SearchHeader
          value={this.state.searchBeer}
          onChangeText={searchBeer => this.setState({ searchBeer })}
          beerSearch={this.beerSearch}
        ></SearchHeader>
        <ScrollView>
          {this.state.beerFound ? (
            this.renderContent()
          ) : (
            <Text style={{ color: "red", fontSize: 16 }}>
              {this.state.error}
            </Text>
          )}
        </ScrollView>
      </Container>
    );
  }
}

export default SearchTab;
