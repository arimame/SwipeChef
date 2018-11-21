
import React, { Component } from 'react';
import {ScrollView, StyleSheet, Text, View, Image, Button} from 'react-native';
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
      editTagline: false
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
      fetch('http://172.46.3.249:3000/users/2', {
        method: 'PATCH',
        headers: {
        //'Accept': 'application/json',
        'Content-Type': 'multipart/form-data'
        },
        body: `tagline=${text}`
      })
    }

    // removes item from book
    removeItem = (itemId) => {
      fetch(`http://172.46.3.249:3000/users/2/books/${itemId}`, {
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
//   fetch('http://172.46.3.249:3000/books', {
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

    // fetchBooks()
    //   .then(books => {
    //      // debugger
    //     this.setState({books: books })
    // })

    console.log("FETCH--------------------");
    fetch('http://172.46.3.249:3000/users/2/books', {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    }).then(results => {
      const parsedResults = JSON.parse(results._bodyInit);
      this.setState({bookItems: parsedResults})
    }).then(results => {
      fetch('http://172.46.3.249:3000/users/2', {
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
          userName: userInfoParsed.username
        })

      })
    })


  }
  render () {

    const userVars = {
      userImage: this.state.userImage,
      userTagline: this.state.userTagline,
      username: this.state.username,
      editTagline: this.state.editTagline
    }

    const bookItemsRender = this.state.bookItems ? (<List recipeItems={this.state.bookItems} stateVars={this.props.stateVars} trx={this.trx} />) : <Text></Text>

    const imagePickerRender = this.state.imagePicker ? (<ImagePickerComponent trx={this.trx} stateVars={this.props.stateVars} />) : <Text></Text>

    console.log("----------------------USER VARS")
    console.log(userVars)

    return (
      <View style={{flex:1}}>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.trx} />
        <ScrollView>
          <View style={{flex:1}}>
            <Userinfo stateVars={this.props.stateVars}  trx={this.trx} userVars={userVars}/>
          </View>
          {imagePickerRender}
          <Text>book</Text>
          {bookItemsRender}
        </ScrollView>
      </View>
    )
  }
}


export default Book;