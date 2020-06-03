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
import { colorPrimaryDark, colorPrimary, colorGreen, white, blackSemiTransparent, colorGreenDark } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, ICONCOWBOY, SETTINGSIMAGE, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, ICONCOWBOYLOCKED, ICONENGENHEIROLOCKED, ICONENGENHEIRALOCKED, ICONFAZENDEIROLOCKED, ICONFAZENDEIRALOCKED, PLUSICONGREY, MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY, ICONCAMARAO } from '../../../images'

const BUTTON_A_TAG = 'a-btn'
const BUTTON_B_TAG = 'b-btn'
const BUTTON_C_TAG = 'c-btn'

const ModalCorrect = require('../../modals/ModalCorrect')
const ModalIncorrect = require('../../modals/ModalIncorrect')

export default class QuestionScreen extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)

    this.state = {
        statusButtonA: false,
        statusButtonB: false,
        statusButtonC: false,
        answerCorrect: false,
        answerIncorrect: true,
        numJogadas: 0,
        numErradas: 0,
        numberX: 0,
        numberY: 0,
        operation: 0,
        result: 0,
        values: []
    }
  }

  componentDidMount() {
    this.checkCorrection(0)
  }

  checkCorrection(value) {
    let numJogadas = this.state.numJogadas
    let numErradas = this.state.numErradas
    let correct = false
    if (value==this.state.result) {
      correct = true
    } 

    if (value>0) {
      if (correct) {
        numJogadas++
      } else {
        numErradas++
      }
    }

    if (numJogadas==5) {
      this.props.navigation.goBack()
    }

    let newData = this.generateData()

    this.setState({
      numJogadas: numJogadas,
      numErradas: numErradas,
      numberX: newData.numberX,
      numberY: newData.numberY,
      operation: newData.operation,
      result: newData.result,
      values: newData.values
    })
  }

  generateData() {
    let operation = this.getRandomInt(0, 64)
    let symbol = this.getOperationSymbol(operation)
    
    let numbers = this.getRandomIntForOperation(1, 11, symbol)
    let numberX = numbers.x
    let numberY = numbers.y

    let result = this.getResult(numberX, numberY, symbol)
    let values = this.getShuffle([result.result, result.option1, result.option2])

    return({
      numberX: numberX,
      numberY: numberY,
      operation: symbol,
      result: result.result,
      values: values
    })
  }

  getShuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  getResult(valueX, valueY, operation) {
    let result = 0
    let retorno = {
      result: 0,
      option1: 0, 
      option2: 0
    }

    if (operation==PLUSICONGREY) {
      result = valueX+valueY
    
    } else if (operation==MINUSICONGREY) {
      result = valueX-valueY
    
    } else if (operation==DIVISIONICONGREY) {
      result = (valueX/valueY).toFixed(1)
    
    } else if (operation==TIMESICONGREY) {
      result = valueX*valueY
    }

    result = parseInt(result, 10)

    let option1 = 0
    let option2 = 0

    let limitX1 = 0
    let limitX2 = 0
    let limitY1 = 0
    let limitY2 = 0
    
    if (result<=3) {
      limitX1 = result+1
      limitX2 = result+5
      limitY1 = result+5
      limitY2 = result+10

      option1 = this.getRandomInt(limitX1,limitX2)
      option2 = this.getRandomInt(limitY1, limitY2)
    } else {
      limitX1 = result+1
      limitX2 = result+5
      limitY1 = result-3
      limitY2 = result-1
      
      option1 = this.getRandomInt(limitX1,limitX2)
      option2 = this.getRandomInt(limitY1, limitY2)
    }    
    
    retorno.result = result
    retorno.option1 = option1
    retorno.option2 = option2

    return retorno
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomIntForOperation(min, max, operation) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let x = 0
    let y = 0
    if (operation==MINUSICONGREY) {
      //minus
      do {
        x = Math.floor(Math.random() * (max - min)) + min;
        y = Math.floor(Math.random() * (max - min)) + min;
      } while (x-y<=0 || x==y);
    
    } else if (operation==DIVISIONICONGREY) {
      //divide
      do {
        x = Math.floor(Math.random() * (max - min)) + min;
        y = Math.floor(Math.random() * (max - min)) + min;
      } while (x%y!=0 || x/y<1 || x==y);
    } else {
      //plus AND times

      x = Math.floor(Math.random() * (max - min)) + min;
      y = Math.floor(Math.random() * (max - min)) + min;
    }

    return {
      x: x,
      y: y
    }
  }

  getOperationSymbol(number) {
      let symbols = [PLUSICONGREY, MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,
                        MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,PLUSICONGREY, 
                        TIMESICONGREY, DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, 
                        DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, TIMESICONGREY,
                        PLUSICONGREY, MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,
                        MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,PLUSICONGREY, 
                        TIMESICONGREY, DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, 
                        DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, TIMESICONGREY,
                        PLUSICONGREY, MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,
                        MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,PLUSICONGREY, 
                        TIMESICONGREY, DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, 
                        DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, TIMESICONGREY,
                        PLUSICONGREY, MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,
                        MINUSICONGREY, TIMESICONGREY, DIVISIONICONGREY,PLUSICONGREY, 
                        TIMESICONGREY, DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, 
                        DIVISIONICONGREY, PLUSICONGREY, MINUSICONGREY, TIMESICONGREY
                    ]
      return symbols[number]
  }

  getColumnsAndLines(number) {
        let rows = []
        let a = "\n"

        if (number>5) {
            let anotherNumber = number-5
            for (let index = 0; index < 5; index++) {
                if (index < anotherNumber) {
                    rows.push(
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, padding: 6, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={ICONCAMARAO} style={{flex: 1, aspectRatio: 1}} />
                            </View>
                            <View style={{flex: 1, padding: 6, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={ICONCAMARAO} style={{flex: 1, aspectRatio: 1}} />
                            </View>
                        </View>
                    )
                } else {
                    rows.push(
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, padding: 6, justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={ICONCAMARAO} style={{flex: 1, aspectRatio: 1}} />
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} />
                        </View>
                    )
                }
            }
        } else {
            for (let index = 0; index < number; index++) {
                rows.push(
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, padding: 6, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{aspectRatio: 1.5, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                                <Image source={ICONCAMARAO} style={{height: '75%', aspectRatio: 1}} />
                            </View>
                        </View>
                    </View>
                )
            }
        }

        return rows
  }

  render() {
    let modalCorrect = <Modal    
                        animationType="slide"
                        visible={/*this.state.answerCorrect*/true}
                        transparent>
                        <View style={styles.containerModal}>
                          <View style={styles.viewContentModal}>
                            <ModalCorrect numeroJogadas={this.state.numJogadas} />
                            <View style={{flex: 1, padding: 10, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                              <TouchableOpacity
                                onPress={() => {

                                }}
                                style={{
                                  backgroundColor: colorGreenDark,
                                  height: '100%',
                                  width: '100%',
                                  borderRadius: 15,
                                  justifyContent: 'center',
                                  alignItems: 'center'
                                }}
                              >
                               <Text style={{fontSize: 18, fontWeight: 'bold', color: white}}>CONTINUAR</Text> 
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Modal>

    let modalIncorrect = <Modal    
                        animationType="slide"
                        visible={/*this.state.answerIncorrect*/false}
                        transparent>
                        <View style={styles.containerModal}>
                          <View style={styles.viewContentModal}>
                            <ModalIncorrect numeroJogadas={this.state.numJogadas} />
                            <View style={{flex: 1, borderWidth: 1}}>
                              
                            </View>
                          </View>
                        </View>
                      </Modal>

    return (
      <View style={styles.safeView}>
        {modalCorrect}
        {modalIncorrect}
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
                <Text style={{fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark}}>MOSTRE SEU CONHECIMENTO ^^</Text>
                <View style={{
                    flex: 1,
                    width: '100%',
                    backgroundColor: white,
                    borderRadius: 20,
                    marginTop: 16,
                    padding: 16
                }}>
                    <View style={styles.lineCharacterView}>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            {this.getColumnsAndLines(this.state.numberX)}
                        </View>
                        <View style={{flex: 1, padding: 16}}>
                            <TouchableOpacity style={styles.characterView}> 
                                <Image source={this.state.operation} style={styles.characterIcon} />
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 2, flexDirection: 'column'}}>
                            {this.getColumnsAndLines(this.state.numberY)}
                        </View>
                    </View>

                </View>
          </View>
          <View style={styles.firstViewBottom}>
                <TouchableOpacity
                  onPress={() => {
                    this.checkCorrection(this.state.values[0])
                  }}
                  style={{
                    height: 50,
                    flex: 1,
                    backgroundColor: white,
                    borderRadius: 15,
                    marginBottom: 56,
                    borderWidth: 1,
                    marginEnd: 3,
                    borderColor: colorPrimaryDark,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark}}>{this.state.values[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.checkCorrection(this.state.values[1])
                  }}
                  style={{
                      height: 50,
                      flex: 1,
                      marginStart: 3,
                      marginEnd: 3,
                      backgroundColor: white,
                      borderRadius: 15,
                      marginBottom: 56,
                      borderWidth: 1,
                      borderColor: colorPrimaryDark,
                      justifyContent: 'center',
                      alignItems: 'center'
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark}}>{this.state.values[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.checkCorrection(this.state.values[2])
                  }}
                  style={{
                    height: 50,
                    flex: 1,
                    marginStart: 3,
                    backgroundColor: white,
                    borderRadius: 15,
                    marginBottom: 56,
                    borderWidth: 1,
                    borderColor: colorPrimaryDark,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark}}>{this.state.values[2]}</Text>
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

/*
<View style={styles.lineCharacterView}>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={PLUSICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={MINUSICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={TIMESICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.characterView}> 
                            <Image source={DIVISIONICONGREY} style={styles.characterIcon} />
                        </TouchableOpacity>
                    </View>

*/

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
    flexDirection: 'row',
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
    padding: 16,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  characterIcon: {
    width: '50%',
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
  },
  containerModal: {
    flex: 1,
    backgroundColor: blackSemiTransparent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContentModal: {
    height: '45%',
    width: '75%',
    backgroundColor: white,
    borderRadius: 25,
    padding: 16
  }
});
