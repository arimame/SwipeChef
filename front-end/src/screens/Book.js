
import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button, AsyncStorage} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import {Permissions} from 'expo';

import SwipeCards from "../partials/SwipeCards";
import Navbar from "../partials/Navbar";
import List from "../partials/List";
import Userinfo from "../partials/UserInfo";
import ImagePickerComponent from "../partials/ImagePicker";

class Book extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bookItems: null,
      userImage: null,
      userTagline: null,
      userName: null,
      imagePicker: false,
      editTagline: false,
      areFriends: false,
      bookUser: null
    }




    // This runs the image picker
    getUserImage = () => {
      this.setState({imagePicker: true})
      Permissions.askAsync(Permissions.CAMERA_ROLL)
    }

    // sets the image in state. The database patch is completed in image picker
    setUserImage = (image) => {
      this.setState({userImage: image})
    }

    //This opens the text input for tagline
    editTagline = () => {
      this.setState({editTagline: true})
    }

    // this submits the tagline to the database
    submitTagline = (text) => {
      this.setState({ userTagline: text,
                      editTagline: false})

      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://172.46.0.254:3000/users?swipeChefToken=${swipeChefToken}`, {
          method: 'PATCH',
          headers: {
          //'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
          },
          body: `tagline=${text}`
        })
      })
    }

    // removes item from book
    removeItem = (itemId) => {
      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://172.46.0.254:3000/books/${itemId}?swipeChefToken=${swipeChefToken}`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
        }).then(results => {
          console.log(results._bodyInit)
          const newBookItems = this.state.bookItems.filter(function(item) {
            return item.id !== itemId
          });
          this.setState({bookItems: newBookItems})
        })
      })
    }
    this.trx = props.trx;
    this.trx['removeItem'] = removeItem
    this.trx['getUserImage'] = getUserImage
    this.trx['setUserImage'] = setUserImage
    this.trx['editTagline'] = editTagline
    this.trx['submitTagline'] = submitTagline



  }

// function fetchBooks() {
//   const token = AsyncStorage.get("token")
//   fetch('http://172.46.0.254:3000/books', {
//       method: "GET",
//       headers: {
//         "Accept": "application/json",
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//       }
//     }).then(res => res.json())
//     .then(data => data)
// }

//       const parsedResults = JSON.parse(results._bodyInit);
//       this.setState({bookItems: parsedResults})



  componentDidMount() {

    usernameToVisit = this.props.stateVars.usernameToVisit

    console.log("FETCH--------------------");

    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
      fetch(`http://172.46.0.254:3000/books?swipeChefToken=${swipeChefToken}&usernameToVisit=${usernameToVisit}`, {

        method: "GET",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(results => {
       console.log("---------------------------------------GET BOOKS")
       console.log(results)
       const parsedResults = JSON.parse(results._bodyInit)
          this.setState({bookItems: parsedResults.user_book_recipes, areFriends: parsedResults.are_friends})
      }).then(results => {
        fetch(`http://172.46.0.254:3000/users?swipeChefToken=${swipeChefToken}&usernameToVisit=${usernameToVisit}`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          }
        }).then (results => {
          const userInfoParsed = JSON.parse(results._bodyInit);
          console.log("------------------user info parsed")
          console.log(userInfoParsed)
          this.setState({
            userImage: userInfoParsed.photo,
            userTagline: userInfoParsed.tagline,
            username: userInfoParsed.username,
            bookUser: userInfoParsed.bookUser
          })

        })
      })
    })


  }

  onFriendsPress = (e) => {
    this.props.trx.updateCurrentScreen("book", "friends")
  }

  addToFriendsPress = (e) => {
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://172.46.0.254:3000/friend_add?swipeChefToken=${swipeChefToken}`, {
          method: 'POST',
          headers: {
          "Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `usernameToVisit=${this.props.stateVars.usernameToVisit}`
      }).then(results => {
        parsedResults = JSON.parse(results._bodyInit)
        console.log(parsedResults)
        this.setState({areFriends: true})

      })
    })
  }

  removeFromFriendsPress = (e) => {
    AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        fetch(`http://172.46.0.254:3000/friend_remove?swipeChefToken=${swipeChefToken}`, {
          method: 'DELETE',
          headers: {
          "Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `usernameToVisit=${this.props.stateVars.usernameToVisit}`
      }).then(results => {
        parsedResults = JSON.parse(results._bodyInit)
        console.log(parsedResults)
        this.setState({areFriends: false})

      })
    })
  }

  render () {

    const userVars = {
      userImage: this.state.userImage,
      userTagline: this.state.userTagline,
      username: this.state.username,
      editTagline: this.state.editTagline,
      imagePicker: this.state.imagePicker,
      bookUser: this.state.bookUser
    }



    const bookItemsRender = this.state.bookItems ? (<List recipeItems={this.state.bookItems} stateVars={this.props.stateVars} trx={this.trx} />) : <Text></Text>

    const imagePickerRender = this.state.imagePicker && !this.props.stateVars.visitor ? (<ImagePickerComponent trx={this.trx} stateVars={this.props.stateVars} />) : <Text></Text>

    const friendsButton = this.props.stateVars.visitor ? <View></View> : <Button onPress={this.onFriendsPress} title="My Favourite Chefs" color="blue" />

    const addToFriendsButton = this.props.stateVars.visitor ? (this.state.areFriends ? <Button onPress={this.removeFromFriendsPress} title="Unfollow" color="red" /> : <Button onPress={this.addToFriendsPress} title="Follow" color="green" />) : <View></View>

    console.log("----------------------USER VARS")
    console.log(userVars)

    return (
      <View style={{flex:1}}>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.trx} />
        <ScrollView>
          <View style={{flex:1, marginTop: 25}}>
            <Userinfo stateVars={this.props.stateVars}  trx={this.trx} userVars={userVars}/>
          </View>
          {imagePickerRender}
          {friendsButton}
          {addToFriendsButton}
          {bookItemsRender}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default Book;