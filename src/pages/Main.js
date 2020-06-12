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
import { colorPrimaryDark, colorPrimary, colorGreen } from '../../colors';
import { STARTIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE, CHANGEAMBIENT } from '../../images'

export default class Main extends Component {
  
  static navigationOptions = {
    headerShown: false
  }
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <View style={styles.secondViewTop}>
            <Image source={PODIOIMAGE} style={styles.farmImageTop} />
            <Image source={SETTINGSIMAGE} style={styles.farmImageTop} />
            <Image source={CHANGEAMBIENT} style={styles.farmImageTop} />
          </View>
          <View style={styles.firstView}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('SetName')
            }}>
              <Image source={STARTIMAGE} style={styles.startImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.secondViewBottom}>
            <Image source={FARMIMAGE} style={styles.farmImageBottom} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safeView: {
    paddingTop: Platform.OS === 'ios' ? 44 : 0,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent"
  },
  container: {
    flex: 1,
    backgroundColor: colorPrimary
  },
  firstView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
    backgroundColor: colorPrimary
  },
  secondViewTop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colorPrimary
  },
  secondViewBottom: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: colorGreen
  },
  startImage: {
    height: 150,
    aspectRatio: 1
  },
  farmImageTop: {
    aspectRatio: 1,
    width: '10%',
    marginTop: 10,
    marginStart: 16
  },
  farmImageBottom: {
    marginEnd: 32,
    marginTop: -32,
    height: '90%',
    aspectRatio: 1
  }
});
