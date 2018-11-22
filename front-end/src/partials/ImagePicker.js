import React from 'react';
import { Button, Image, View, AsyncStorage } from 'react-native';
import { ImagePicker, FileSystem } from 'expo';

export default class ImagePickerComponent extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
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

      this.props.trx.setUserImage(`images/userimage${this.props.stateVars.currentUser}${extension}`);

      // this is where the actual image file is attached to the request
      data.append("photo", {
        uri: result.uri,
        name: `userimage${this.props.stateVars.currentUser}${extension}`,
        type: 'multipart/form-data'
      })

      AsyncStorage.getItem('swipeChefToken').then(swipeChefToken => {
        data.append("swipeChefToken", swipeChefToken)

        fetch('http://172.46.0.254:3000/users', {
          method: 'PATCH',
          headers: {
          //'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
          },
          body: data
        })
      })






    }
  };
}