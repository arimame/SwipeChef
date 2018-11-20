
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, Button} from 'react-native';
import {widthPercentageToDP, heightPercentageToDP} from 'react-native-responsive-screen';
import ToggleSwitch from 'toggle-switch-react-native'


import Navbar from "../partials/Navbar";


class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vegan: false,
      vegetarian: false,
      gluten_allergy: false,
      peanut_allergy: false,
      seafood_allergy: false,
      dairy_allergy: false,
      egg_allergy: false,
      soy_allergy: false,
      tree_nut_allergy: false,
      wheat_allergy: false
    }
  }

  render () {
    return (
      <View>
        <Navbar stateVars={this.props.stateVars} style={{height: heightPercentageToDP('10%')}} trx={this.props.trx} />
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.vegan}
                onColor='green'
                offColor='red'
                label='Vegan                '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({vegan: !this.state.vegan})}}

            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.vegetarian}
                onColor='green'
                offColor='red'
                label='Vegetarian        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({vegetarian: !this.state.vegetarian})}}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.gluten_allergy}
                onColor='green'
                offColor='red'
                label='Gluten Allergy  '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({gluten_allergy: !this.state.gluten_allergy})}}
            /></View>
        <View style={{margin: 10}}>
        <ToggleSwitch
                isOn={this.state.nut_allergy}
                onColor='green'
                offColor='red'
                label='Peanut Allergy  '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({peanut_allergy: !this.state.peanut_allergy})}}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.seafood_allergy}
                onColor='green'
                offColor='red'
                label='Seafood Allergy'
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({seafood_allergy: !this.state.seafood_allergy})}}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.dairy_allergy}
                onColor='green'
                offColor='red'
                label='Dairy Allergy      '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({dairy_allergy: !this.state.dairy_allergy})}}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.egg_allergy}
                onColor='green'
                offColor='red'
                label='Egg Allergy        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({egg_allergy: !this.state.egg_allergy})}}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.soy_allergy}
                onColor='green'
                offColor='red'
                label='Soy Allergy        '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({soy_allergy: !this.state.soy_allergy})}}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.tree_nut_allergy}
                onColor='green'
                offColor='red'
                label='Tree nut Allergy'
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({tree_nut_allergy: !this.state.tree_nut_allergy})}}
            /></View>
          <View style={{margin: 10}}>
          <ToggleSwitch
                isOn={this.state.wheat_allergy}
                onColor='green'
                offColor='red'
                label='Wheat Allergy     '
                labelStyle={{color: 'black', fontWeight: '900'}}
                size='large'
                onToggle={ (isOn) => {this.setState({wheat_allergy: !this.state.wheat_allergy})}}
            /></View>
      </View>
    )
  }
}







export default Setting;