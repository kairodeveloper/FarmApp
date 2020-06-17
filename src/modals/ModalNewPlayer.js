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
import { HAPPYFACEIMAGE, NEUTRALFACEIMAGE } from '../../images'

export default class ModalNewPlayer extends Component {
  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    
    this.state = {
    }
  }

  render() {
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Adicionar novo jogador</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 18,
        color: colorPrimaryDark,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    imageFace: {
        height: 100,
        width: 100
    },
    messageText: {
        fontSize: 18,
        marginStart: 16,
        marginEnd: 16,
        textAlign: 'center'
    }
})

module.exports = ModalNewPlayer