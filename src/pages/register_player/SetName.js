import React, { Component, AsyncStorage } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black, blackSemiTransparent, colorGreenDark, red } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE, PLUSICONBLUE } from '../../../images'

const ModalNewPlayer = require('../../modals/ModalNewPlayer')

export default class SetName extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)

    let jogadores = []

    this.state = {
      jogadores: jogadores,
      jogadorSelecionado: 0,
      name: "",
      showModalName: false
    }    
  }

  addNewJogador() {
    let jogadores = this.state.jogadores
                                  
    jogadores.map((it) => {
      it.selecionado = false
    })

    let newJogador = {}
    newJogador.mid = this.state.jogadores.length+1
    newJogador.nome = this.state.name
    newJogador.selecionado = true
    
    jogadores.push(newJogador)

    this.setState({
      jogadorSelecionado: newJogador.mid,
      jogadores: jogadores,
      showModalName: false
    })
  }

  selectJogador(mid) {
    let jogadores = this.state.jogadores
                                  
    jogadores.map((it) => {
      it.selecionado = it.mid==mid
    })

    this.setState({
      jogadores: jogadores
    })
  }

  render() {
    let modalName = <Modal    
                        animationType="slide"
                        visible={this.state.showModalName}
                        transparent>
                        <View style={styles.containerModal}>
                          <View style={styles.viewContentModal}>
                            <ModalNewPlayer numeroJogadas={this.state.numJogadas} />
                            <View style={styles.viewForTextInput}>
                              <TextInput
                                fontSize={18}
                                textColor={colorPrimaryDark}
                                baseColor={colorPrimaryDark}
                                placeholder={'Digite o nome...'}
                                onChangeText={(name) => this.setState({ name })}
                              />
                            </View>
                            <View style={styles.viewForButton}>
                              <TouchableOpacity
                                onPress={() => {
                                  this.addNewJogador()
                                }}
                                style={styles.styleButton}>
                              <Text style={styles.textButton}>SALVAR</Text> 
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity 
                              style={{alignItems: 'center', justifyContent: 'center', height: 25}}
                              onPress={() => {
                                this.setState({
                                  showModalName: false
                                })
                              }}>
                              <Text style={{color: red, fontWeight: 'bold'}}>fechar</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Modal>
    return (
      <View style={styles.safeView}>
        {modalName}
        <StatusBar barStyle="light-content" backgroundColor={colorPrimaryDark} />
        <View style={styles.container}>
          <View style={styles.secondViewTop}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.goBack()
            }}>
              <Image source={RETURNIMAGE} style={styles.farmImageTop} />
            </TouchableOpacity>
          </View>
          <View style={styles.viewMiddle}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark }}>Escolha um jogador</Text>
            { this.state.jogadores.length==0 ? (
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 18, color: colorPrimaryDark}}>Não há nenhum jogador registrado...</Text>
              </View>
            ) : (
              <FlatList
                style={{flex: 1}}
                data={this.state.jogadores}
                renderItem={({ item }) => 
                  <TouchableOpacity
                    onPress={() => {
                      this.selectJogador(item.mid)
                    }}
                    style={
                      item.selecionado ? (
                        {height: 60, borderWidth: 4, borderColor: colorPrimaryDark, marginTop: 16, justifyContent: 'center', paddingStart: 16, borderRadius: 15, backgroundColor: white} 
                      ) : (
                        {height: 50, marginTop: 16, justifyContent: 'center', paddingStart: 16, borderRadius: 15, backgroundColor: white}  
                      )}>
                    <Text style={ item.selecionado ? ( 
                      {fontSize: 18, fontWeight: 'bold', fontStyle: 'italic', color: colorPrimaryDark}
                    ) : (
                      {fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark}                    
                    )}>{item.nome}</Text>
                  </TouchableOpacity>
              }/>
          ) }
          </View>
          
          <View style={styles.firstViewTop}>
            <View style={{
              height: 50,
              width: '80%',
              justifyContent: 'center',
              alignItems: 'flex-end',
              borderRadius: 15,
              paddingStart: 16
              }}>
              <Text style={{ marginEnd: 16, fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark }}>Crie um jogador</Text>
            </View>
            <TouchableOpacity 
              style={{height: 50, width: '20%', justifyContent: 'center', alignItems: 'center', borderColor: colorPrimaryDark, borderWidth: 3, borderRadius: 15}}
              onPress={() => {
                this.setState({
                  showModalName: true
                })
              }}>
              <Image source={PLUSICONBLUE} style={{height: 32, width: 32}} />
            </TouchableOpacity>
          </View>
          
          {/*<View style={styles.firstViewBottom}>
            <TouchableOpacity onPress={() => {
              //this.props.navigation.navigate('SetCharactr')
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
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark }}>SEGUINTE</Text>

            </TouchableOpacity>
          </View>
            */}
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
    flex: 1,
    padding: 16,
    paddingTop: 6,
    flexDirection: 'row'
  },
  viewMiddle: {
    flex: 6,
    padding: 16,
    paddingTop: 6,
  },
  containerModal: {
    flex: 1,
    backgroundColor: blackSemiTransparent,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewContentModal: {
    height: 250,
    width: '75%',
    backgroundColor: white,
    borderRadius: 25,
    padding: 16
  },
  viewForTextInput: {
    flex: 2,
    padding: 10, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },        
  viewForButton: {
    flex: 1, 
    padding: 10, 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  styleButton: {
    backgroundColor: colorGreenDark,
    height: '100%',
    width: '100%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 18, 
    fontWeight: 'bold', 
    color: white
  },
  firstViewBottom: {
    flexDirection: 'column-reverse',
    flex: 2,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colorPrimary
  },
  secondViewTop: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colorPrimary,
    marginTop: 16
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
