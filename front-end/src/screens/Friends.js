import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, AsyncStorage} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import SearchableDropdown from 'react-native-searchable-dropdown';

import Navbar from "../partials/Navbar";
import FriendList from "../partials/FriendList";


class Friends extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchString: "",
      fetchCounter: 0,
      allUsers: [],
      filteredUsers: [],
      items: [],
      friendsList: []
    }
  }

  updateSearchText = (e) => {
    lowercaseE = e.toLowerCase()
    this.setState({searchString: e})
    if (e.length >= 2) {
      usersFiltered = this.state.allUsers.filter(user => user.toLowerCase().includes(lowercaseE))
      counter = 1
      items = []
      for (username of usersFiltered) {

        items.push({  id: counter,
                    name: username})
        counter += 1
        console.log(username, "-------------- username")
        console.log(items, "------------- items")
      }
      this.setState({filteredUsers: usersFiltered,
                      items: items})
    }

  }

  selectFriend = (e) => {
    console.log(e)
    username = e.name
    this.props.trx.startVisiting(username)

  }

  componentDidMount() {
    AsyncStorage.getItem('swipeChefToken').then((swipeChefToken) => {
      fetch(`http://172.46.3.249:3000/friend_search?swipeChefToken=${swipeChefToken}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then((results) => {
        parsedResults = JSON.parse(results._bodyInit)
        console.log(parsedResults)
        this.setState({allUsers: parsedResults})
      })
    })
    AsyncStorage.getItem('swipeChefToken').then((swipeChefToken) => {
      fetch(`http://172.46.3.249:3000/friends?swipeChefToken=${swipeChefToken}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(results => {
        parsedResults = JSON.parse(results._bodyInit)
        this.setState({friendsList: parsedResults})
      })
    })

  }


  render () {
    matchingUsernames = this.state.items
    console.log(this.state.friendsList, "------------------ this state items")

    return (
      <View>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        <SearchableDropdown
          onTextChange={this.updateSearchText}
          onItemSelect={this.selectFriend}
          containerStyle={{ padding: 5 }}
          textInputStyle={{
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
          }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
          }}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 140 }}
          items={matchingUsernames}
          defaultIndex={2}
          placeholder="search for username"
          resetValue={false}
          underlineColorAndroid="transparent"
        />
        <FriendList style={{position: 'absolute', bottom: 0}}stateVars={this.props.stateVars} trx={this.props.trx} friendsList={this.state.friendsList}/>
      </View>
    )
  }

}



export default Friends;