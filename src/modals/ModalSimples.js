import React, { Component, AsyncStorage } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Alert,
  Image,
  Dimensions,
  ToastAndroid,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar
} from 'react-native'
import { colorPrimaryDark, colorPrimary, blackSemiTransparent, white, black } from '../../colors';
import { PLUSICONGREY, PLUSICONBLUE, MINUSICONGREY, MINUSICONBLUE, DIVISIONICONGREY, DIVISIONICONBLUE, TIMESICONBLUE } from '../../images'

export default class ModalSimples extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    
    this.state = {
    }
  }

  getOperationSymbol(operation) {
    if (operation==PLUSICONGREY) {
      return PLUSICONBLUE
    } else if (operation==MINUSICONGREY) {
      return MINUSICONBLUE
    } else if (operation==DIVISIONICONGREY) {
      return DIVISIONICONBLUE
    }
    return TIMESICONBLUE
  }

  render() {
    return(
        <View style={styles.container}>
            <View style={{height: 50, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={styles.titleText}>
                {this.props.valueX}
            </Text>             

            <Image source={this.getOperationSymbol(this.props.operation)} style={styles.characterIcon} />
            
            <Text style={styles.titleText}>
                {this.props.valueY}
            </Text>
            </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 56,
        textAlign: 'center',
        fontWeight: 'bold',
        color: colorPrimaryDark
    },
    characterIcon: {
        width: 32,
        aspectRatio: 1,
        marginStart: 16,
        marginEnd: 16
    }
})

module.exports = ModalSimples