
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight, AsyncStorage} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  password: t.String,
});

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    }
  }
};


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render () {


  buttonPressToRegister = (e) => {
    console.log("-------------------login button")
    console.log(this.props)
    this.props.trx.updateCurrentScreen("login", "register")
  }

  submitLogin = (e) => {
    let loginInputs = this.refs.form.getValue()
    fetch(`http://172.46.0.254:3000/users/login`, {
        method: 'POST',
        headers:
          {"Accept": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${loginInputs.email}&password=${loginInputs.password}` // <-- Post parameters
    }).then(results => {

      console.log(results._bodyInit)
    if (!results._bodyInit.includes('400')) {
      console.log(results)
      var storeData = async () => {
        try {
          await AsyncStorage.setItem('swipeChefToken', results._bodyInit);
        } catch (error) {
          console.log("Error Saving Data")
        }
      }
      storeData()
      this.props.trx.updateCurrentUser(results)
      this.props.trx.updateCurrentScreen("login", "swipe")
    } else {
      console.log(results)
    }
  })
    //console.log(loginInputs.email)
  }

    return (
      <View>
      <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
       <View style={styles.container}>
        <Form type={User} options={options} ref="form" />
         <TouchableHighlight style={styles.button} onPress={submitLogin} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        <Text>Need an account? <Text onPress={buttonPressToRegister}> Sign up.</Text></Text>
      </View>
      </View>

      )

  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
    buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#FAAF08',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default Login;