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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED } from '../../../images'

export default class SelectAnimals extends Component {

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
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={RETURNIMAGE} style={styles.farmImageTop} />
            </TouchableOpacity>
          </View>
          <View style={styles.firstViewTop}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark}}>SELECIONE SEUS ANIMAIS FAVORITOS</Text>
                <View style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: white,
                    borderRadius: 15,
                    marginTop: 16,
                    padding: 6
                }}>
                    <View style={styles.lineCharacterView}>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={ICONCOWBOY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={ICONCOWGIRL} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={ICONENGENHEIROLOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineCharacterView}>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={ICONENGENHEIRALOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}>
                            <Image source={ICONFAZENDEIROLOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}>
                            <Image source={ICONFAZENDEIRALOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lineCharacterView}>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={ICONENGENHEIRALOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}>
                            <Image source={ICONFAZENDEIROLOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}>
                            <Image source={ICONFAZENDEIRALOCKED} style={styles.characterIcon} />
                        </TouchableOpacity>
                    </View>

                </View>
          </View>
          <View style={styles.firstViewBottom}>
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('SelectOperations')
              }} 
              style={{
                    height: 50,
                    width: '60%',
                    backgroundColor: white,
                    borderRadius: 15,
                    marginBottom: 56,
                    borderWidth: 1,
                    borderColor: colorPrimaryDark,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark}}>SEGUINTE</Text>
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
  firstViewTop: {
    flex: 4,
    padding: 16,
    paddingTop: 6,
    backgroundColor: colorPrimary
  },
  firstViewBottom: {
    flexDirection: 'column-reverse',
    flex: 1,
    alignItems: 'center',
    padding: 16,
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
    height: 100,
    width: 100
  },
  lineCharacterView: {
      flex: 1, 
      flexDirection: 'row'
    },
  characterView: {
    flex: 1, 
    margin: 6,
    borderRadius: 15, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#DFDFDF'
  },
  characterIcon: {
    height: '75%',
    aspectRatio: 1
  },
  farmImageTop: {
    height: 32,
    width: 32,
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
