import React from 'react';
import { Button, Image, View, AsyncStorage, Text } from 'react-native';
import { ImagePicker, FileSystem } from 'expo';

export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text onPress={this._pickImage} style={{textAlign: "right", fontFamily: "pacifico-regular", color:"#0F2F47"}}>edit</Text>
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    });

    if (!result.cancelled) {
      // image submitted to the server via multi-part form data
      var data = new FormData();

      var extension = result.uri.slice(result.uri.lastIndexOf('.'))

      randNum = Math.floor(Math.random() * 100, 0)

      //this.props.trx.setUserImage(`images/userimage${this.props.userVars.bookUser}${extension}?num=${randNum}`);
      console.log("------------------------ currentUser")
      console.log("this.props.stateVars")

      // this is where the actual image file is attached to the request
      data.append("photo", {
        uri: result.uri,
        name: `userimage${extension}`,
        type: 'multipart/form-data'
      })

      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        data.append("swipeChefToken", swipeChefToken)

        fetch('http://172.46.3.249:3000/users', {
          method: 'PATCH',
          headers: {
          //'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
          },
          body: data
        })
      }).then(() => {
        this.props.trx.setUserImage(`images/userimage${this.props.userVars.bookUser}${extension}?num=${randNum}`)
        this.props.trx.updateCurrentScreen('book', 'loading')
        setTimeout(()=> {this.props.trx.updateCurrentScreen('book', 'book')}, 1)
      })
    }
  };
}