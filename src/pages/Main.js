import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
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
import { colorPrimaryDark, colorPrimary, colorGreen, colorGreenDark } from '../../colors';
import { STARTIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE, CHANGEAMBIENT, ZOOIMAGE, JUNGLEIMAGE, THEMEFARM, THEMEZOO, THEMEJUNGLE } from '../../images'
import { removeAll } from '../../realm_services/RealmService'
import AsyncStorage from '@react-native-community/async-storage'
import { FARM, ZOO, JUNGLE, getIconByTheme, getTheme } from '../globalComponents/GlobalFunctions';

export default class Main extends Component {
  
  static navigationOptions = {
    headerShown: false
  }
  
  constructor(props) {
    super(props)

    this.state = {
      currentTheme: FARM
    }
    //removeAll()
  }

  async componentDidMount() {
    let a = await getTheme()
    
    this.setState({
      currentTheme: a
    })
  }

  render() {
    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <View style={styles.secondViewTop}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => {
                  this.props.navigation.navigate('ResultsScreen')
                }}
                style={{marginTop: 16, marginStart: 10, height: 50, width: 50}}>
                <Image source={PODIOIMAGE} style={styles.farmImageTop} />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, justifyContent: 'center', paddingTop: 16}}>
                <View style={{borderRadius: 25, height: 50, flexDirection: 'row-reverse', alignItems: 'center', paddingStart: 16}}>
                  <TouchableOpacity style={{height: 40, width: 40, borderRadius: 25, backgroundColor: this.state.currentTheme==JUNGLE ? colorGreenDark : colorPrimaryDark, justifyContent: 'center', alignItems: 'center'}}
                    onPress={ async () => {
                      try {
                        let a = JSON.stringify(JUNGLE)
                        await AsyncStorage.setItem('theme', a)
                        
                        this.setState({
                          currentTheme: JUNGLE
                        })
                      } catch (error) {
                        console.log(error)
                      }
                  }}>
                    <Image source={THEMEJUNGLE} style={{height: 32, width: 32}} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{height: 40, width: 40, marginEnd: 10, borderRadius: 25, backgroundColor: this.state.currentTheme==ZOO ? colorGreenDark : colorPrimaryDark, justifyContent: 'center', alignItems: 'center'}}
                    onPress={ async () => {
                      try {
                        let a = JSON.stringify(ZOO)
                        await AsyncStorage.setItem('theme', a)
                        
                        this.setState({
                          currentTheme: ZOO
                        })
                      } catch (error) {
                        console.log(error)
                      }
                  }}>
                    <Image source={THEMEZOO} style={{height: 32, width: 32}} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{height: 40, width: 40, marginEnd: 10, borderRadius: 25, backgroundColor: this.state.currentTheme==FARM ? colorGreenDark : colorPrimaryDark, justifyContent: 'center', alignItems: 'center'}}
                    onPress={ async () => {
                      try {
                        let a = JSON.stringify(FARM)
                        await AsyncStorage.setItem('theme', a)
                        
                        this.setState({
                          currentTheme: FARM
                        })
                      } catch (error) {
                        console.log(error)
                      }
                  }}>
                    <Image source={THEMEFARM} style={{height: 32, width: 32}} />
                  </TouchableOpacity>
                </View>
            </View>
          </View>
          <View style={styles.firstView}>
            <TouchableOpacity onPress={async () => {
              /*try {
                let a = await AsyncStorage.getItem('theme')
                alert(a)
              } catch(e) {
                // read error
              }
              */
             this.props.navigation.navigate('SetName')
            }}>
              <Image source={STARTIMAGE} style={styles.startImage} />
            </TouchableOpacity>
          </View>
          <ImageBackground source={getIconByTheme(this.state.currentTheme)} style={styles.farmImageBottom} />
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
    height: 50,
    width: 50,
  },
  farmImageBottom: {
    height: 50
  }
});
