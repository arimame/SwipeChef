
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
      secureTextEntry: true,
      error: "email and password do not match"
    }
  }
};


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  text: 'Useless Placeholder',
                    errorMessage: null };
  }

  render () {


  buttonPressToRegister = (e) => {
    console.log("-------------------login button")
    console.log(this.props)
    this.props.trx.updateCurrentScreen("login", "register")
  }

  submitLogin = (e) => {
    let loginInputs = this.refs.form.getValue()
    fetch(`http://192.168.0.20:3000/users/login`, {
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
      this.setState({errorMessage: "Password and email do not match."})
    }
  })
    //console.log(loginInputs.email)
  }

  errorMessageText = this.state.errorMessage ? <Text style={{color: 'red'}}>{this.state.errorMessage}</Text> : <Text></Text>

    return (
      <View>
      <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
       <View style={styles.container}>
        <Form type={User} options={options} ref="form" />
         <TouchableHighlight style={styles.button} onPress={submitLogin} underlayColor="#f46969">
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
        {errorMessageText}
        <Text>Need an account? <Text style={{fontWeight: 'bold'}} onPress={buttonPressToRegister}> Sign up.</Text></Text>
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
    color: "#E9E2BB",
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#C53A32',
    borderColor: '#C53A32',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default Login;