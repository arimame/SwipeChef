import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button, TextInput, TouchableHighlight} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import t from 'tcomb-form-native'
import Navbar from "../partials/Navbar";

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
  confirmPassword: t.String
});

const options = {
  fields: {
    password: {
      password: true,
      secureTextEntry: true
    },
    confirmPassword: {
    password: true,
    secureTextEntry: true
  }
  }
};


class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {


  buttonPressToLogin = (e) => {
    console.log("-------------------login button")
    console.log(this.props)
    this.props.trx.updateCurrentScreen("register", "login")
  }

    return (
      <View>
      <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
       <View style={styles.container}>
        <Form type={User} options={options} />
         <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableHighlight>
        <Text>Already have an account? <Text onPress={buttonPressToLogin}>Login.</Text></Text>
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
    backgroundColor: '#D8A800',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default Register;