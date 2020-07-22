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
import { colorPrimaryDark, colorPrimary, colorGreen, white, black, blackSemiTransparent, colorGreenDark, red, yellow, greyTextColor } from '../../../colors';
import { RETURNIMAGE, FARMIMAGE, PODIOIMAGE, SETTINGSIMAGE, PLUSICONBLUE, FUNDOADDPLAYERIMAGE, ICONMENULEFT, ICONLEAO } from '../../../images'
import { findAllNotRemoved, getNextMid, saveThis, deleteThis, updateThis } from '../../../realm_services/RealmService';
import { FARM, ZOO, JUNGLE, getIconByTheme, getTheme } from '../../globalComponents/GlobalFunctions';
import Swipeout from 'react-native-swipeout';

const ModalNewPlayer = require('../../modals/ModalNewPlayer')

export default class SetName extends Component {

  static navigationOptions = {
    headerShown: false
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props

    let jogadores = findAllNotRemoved('Usuario')

    this.state = {
      currentTheme: FARM,
      jogadores: jogadores,
      jogadorSelecionado: 0,
      jogadorMidModal: 0,
      name: "",
      showModalName: false
    }
  }

  async componentDidMount() {
    let a = await getTheme()
    this.setState({
      currentTheme: a
    })
  }

  addNewJogador() {
    if (this.state.jogadorMidModal!=0) {
      let jogador = {}
      jogador.mid = this.state.jogadorMidModal
      jogador.nome = this.state.name
      updateThis('Usuario', jogador, ['nome'])

      let jogadores = findAllNotRemoved('Usuario')
      this.setState({
        jogadores: jogadores,
        name: "",
        jogadorMidModal: 0,
        showModalName: false
      })
    } else {
      let jogadores = []
      let stateJogadores = this.state.jogadores

      stateJogadores.map((it) => {
        jogadores.push(it)
      })

      let newJogador = {}
      newJogador.mid = getNextMid('Usuario')
      newJogador.nome = this.state.name
      newJogador.numeroQuestoes = 0
      this.saveUsuario(newJogador.mid)
      jogadores.push(newJogador)

      this.setState({
        jogadorSelecionado: newJogador.mid,
        jogadores: jogadores,
        showModalName: false
      })
    }
  }

  selectJogador(mid) {
    let jogadorSelecionado = 0

    if (mid!=this.state.jogadorSelecionado) {
      jogadorSelecionado = mid
    }

    this.setState({
      jogadorSelecionado: jogadorSelecionado
    })
  }

  getJogadorSelecionado() {
    let jogador = {}

    this.state.jogadores.map((it) => {
      if (it.mid == this.state.jogadorSelecionado) {
        jogador = it
      }
    })

    return jogador
  }

  saveUsuario(mid) {
    let user = {}
    user.mid = mid
    user.nome = this.state.name
    user.createdAt = new Date()
    saveThis('Usuario', user)
  }

  editUsuario(item) {
    this.setState({
      jogadorMidModal: item.mid,
      name: item.nome,
      showModalName: true
    })
  }

  deleteUsuario(mid) {
    Alert.alert('Atenção', 'Deseja realmente excluir esse usuário?', [
      {
        text: 'SIM',
        onPress: () => {
          deleteThis('Usuario', mid)
          let jogadores = findAllNotRemoved('Usuario')
      
          this.setState({
            jogadorSelecionado: 0,
            jogadores: jogadores
          })      
        }
      },
      {
        text: 'CANCELAR',
        onPress: () => {}
      }
    ])
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
              value={this.state.name}
              onChangeText={(name) => this.setState({ name })}
            />
          </View>
          <View style={styles.viewForButton}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.name.length > 0) {
                  this.addNewJogador()
                }
              }}
              style={styles.styleButton}>
              <Text style={styles.textButton}>SALVAR</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center', height: 25 }}
            onPress={() => {
              this.setState({
                showModalName: false
              })
            }}>
            <Text style={{ color: red, fontWeight: 'bold' }}>fechar</Text>
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
            {this.state.jogadores.length == 0 ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: colorPrimaryDark }}>Não há nenhum jogador registrado...</Text>
              </View>
            ) : (
                <View style={{ flex: 1 }}>
                  <FlatList
                    style={{ flex: 1, paddingTop: 16, paddingBottom: 16 }}
                    data={this.state.jogadores}
                    renderItem={({ item }) =>
                    <Swipeout right={[
                      {
                        text: 'Editar',
                        backgroundColor: greyTextColor,
                        onPress: () => {
                          this.editUsuario(item)
                        }
                      },{
                        text: 'Excluir',
                        backgroundColor: red,
                        onPress: () => {
                          this.deleteUsuario(item.mid)
                        }
                      }
                    ]} 
                    autoClose={true}
                    backgroundColor={colorPrimary} style={{marginTop: 16, height: 50, borderRadius: 15}}>
                      <TouchableOpacity
                        onPress={() => {
                          this.selectJogador(item.mid)
                        }}
                        style={
                          item.mid == this.state.jogadorSelecionado ? (
                            { height: 50, borderRightWidth: 10, flexDirection: 'row', borderColor: colorPrimaryDark, justifyContent: 'space-between', alignItems: 'center', paddingStart: 16, borderRadius: 15, backgroundColor: yellow }
                          ) : (
                              { height: 50, borderRightWidth: 10, flexDirection: 'row', borderColor: colorPrimaryDark, justifyContent: 'space-between',  alignItems: 'center', paddingStart: 16, borderRadius: 15, backgroundColor: white }
                            )}>
                        <Text style={item.mid == this.state.jogadorSelecionado ? (
                          { fontSize: 18, fontWeight: 'bold', color: white }
                        ) : (
                            { fontSize: 18, fontWeight: 'bold', color: colorPrimaryDark }
                          )}>{item.nome}</Text>
                          <Image source={ICONMENULEFT} style={{height: 24, width: 24, marginEnd: -2}} />
                      </TouchableOpacity>
                      </Swipeout>
                    } />
                </View>
              )}
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={() => {
                  this.setState({
                    showModalName: true
                  })
                }}>
                <Text style={{ marginEnd: 16, fontSize: 20, fontWeight: 'bold', color: colorPrimaryDark }}>Crie um jogador</Text>
                <Image source={PLUSICONBLUE} style={{ height: 16, width: 16 }} />
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.firstViewBottom}>
            <TouchableOpacity onPress={() => {
              if (this.state.jogadorSelecionado == 0) {
                alert('Selecione um jogador antes...')
              } else {
                let jogador = this.getJogadorSelecionado()
                this.props.navigation.replace('SetCharacter', { jogador: jogador })
              }
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
    height: 50,
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
    height: 50
  }
});
