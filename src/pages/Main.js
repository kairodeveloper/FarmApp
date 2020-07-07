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
  StatusBar,
  Animated
} from 'react-native'
import { colorPrimaryDark, colorPrimary, colorGreen, colorGreenDark, white } from '../../colors';
import { STARTIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE, CHANGEAMBIENT, ZOOIMAGE, JUNGLEIMAGE, THEMEFARM, THEMEZOO, THEMEJUNGLE, WITHSOUND, NOSOUND, MOUNTAIN } from '../../images'
import { removeAll } from '../../realm_services/RealmService'
import AsyncStorage from '@react-native-community/async-storage'
import { FARM, getSound, getIconByTheme, getTheme, returnScenarios } from '../globalComponents/GlobalFunctions';
import { FlatList } from 'react-native-gesture-handler';

export default class Main extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)

    let cenarios = returnScenarios()
    this.state = {
      showScenarios: false,
      setSound: true,
      currentTheme: FARM,
      currentSound: getSound(),
      cenarios: cenarios,
      bounceValue: new Animated.Value(0)
    }

    //removeAll()
  }

  async componentDidMount() {
    let a = await getTheme()

    this.setState({
      currentTheme: a
    })
  }

  _toggleSubview() {    
    var toValue = 100;

    if(this.state.showScenarios) {
      toValue = 0;
    }

    //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //100 comes from the style below, which is the height of the subview.
    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 1000,
        tension: 5,
        friction: 2,
      }
    ).start();

  }

  render() {

    return (
      <View style={styles.safeView}>
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <View style={styles.secondViewTop}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('ResultsScreen')
              }}
                style={{ marginTop: 16, justifyContent: 'center', marginStart: 10, height: 50, width: 50 }}>
                <Image source={PODIOIMAGE} style={styles.farmImageTop} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  let state = this.state.setSound ? (0) : (1)
                  try {
                    let a = JSON.stringify(state)
                    await AsyncStorage.setItem('hasSound', a)

                    this.setState({
                      setSound: !this.state.setSound
                    })
                  } catch (error) {
                    console.log(error)
                  }
                }}
                style={{ marginTop: 16, justifyContent: 'center', marginStart: 10, height: 50, width: 50 }}>
                {this.state.setSound ? (
                  <Image source={WITHSOUND} style={styles.soundImagemTop} />
                ) : (
                    <Image source={NOSOUND} style={styles.soundImagemTop} />
                  )}
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, flexDirection: 'row-reverse', alignItems: 'center', paddingTop: 16 }}>
              <TouchableOpacity onPress={() => {
                this.setState({
                  showScenarios: !this.state.showScenarios
                })
              }}
                style={{ justifyContent: 'center', marginEnd: 16, height: 50, width: 50 }}>
                <Image source={MOUNTAIN} style={styles.farmImageTop} />
              </TouchableOpacity>
              
            </View>
          </View>
          <View style={styles.firstView}>
            {this.state.showScenarios ? (
              <View style={{
                position: 'absolute',
                paddingBottom: 5,
                minHeight: 50,
                width: 50,
                borderRadius: 25,
                top: 0,
                right: 16,
                alignItems: 'center',
              }}>
                <Animated.View style={{
                  elevation: 6,
                  shadowOffset: 10,
                  backgroundColor: white
                } ,{transform: [{translateY: this.state.bounceValue}]}}>
                  <FlatList
                    style={{ flex: 1 }}
                    data={this.state.cenarios}
                    renderItem={({ item }) =>
                      <TouchableOpacity style={{ height: 40, width: 40, marginTop: 5, borderRadius: 25, backgroundColor: this.state.currentTheme == item.theme ? colorGreenDark : colorPrimaryDark, justifyContent: 'center', alignItems: 'center' }}
                        onPress={async () => {
                          try {
                            let a = JSON.stringify(item.theme)
                            await AsyncStorage.setItem('theme', a)

                            this.setState({
                              currentTheme: item.theme
                            })
                          } catch (error) {
                            console.log(error)
                          }
                        }}>
                        <Image source={item.image} style={{ height: 32, width: 32 }} />
                      </TouchableOpacity>
                    } />

                </Animated.View>
              </View>
            ) : (
                <View />
              )}
            <TouchableOpacity onPress={async () => {
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
  soundImagemTop: {
    height: 40,
    width: 40
  },
  farmImageBottom: {
    height: 50
  }
});
