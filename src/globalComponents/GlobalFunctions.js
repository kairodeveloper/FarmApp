import { ICONVACA, ICONPASSARO, ICONPORCO, ICONGALINHA, ICONOVELHA, ICONSAPO, ICONCACHORRO, ICONPEIXE, ICONTARTARUGA, ICONCOWBOY, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, FARMIMAGE, ZOOIMAGE, TRANSPORTIMAGE, RANDOMIMAGE,  JUNGLEIMAGE, ICONHIPOPOTAMO, ICONJAGUAR, ICONCOBRA, ICONTUCANO, ICONLEAO, ICONURSO, ICONGORILA, ICONSONIC, ICONLOBO, ICONFALCAO, ICONLAGARTO, ICONPEIXE2, ICONRAPOSA, ICONSURICATE, ICONTIGRE, ICONCORUJA, ICONJACARE, ICONPREGUICA, ICONGIRAFA, THEMEFARM, THEMEZOO, THEMEJUNGLE, THEMETRANSPORT, THEMEFRUIT, THEMERANDOM, ICONCARRO, ICONMOTO, ICONBICICLETA, ICONTREM, ICONONIBUS, ICONAVIAO, ICONPATINETE, ICONSKATE, ICONPATINS, ICONABACAXI, ICONBANANA, ICONMACA, ICONMELANCIA, ICONMORANGO, ICONUVAS, ICONTOMATE, ICONMILHO, ICONCENOURA, FRUITIMAGE, ICONARCOIRIS, ICONBOLA, ICONBOLO, ICONPIRULITO, ICONSORVETE, ICONBONECA, ICONCORACAO, ICONVIOLAO, ICONHAMBURGUER } from "../../images"
import AsyncStorage from "@react-native-community/async-storage"
import Sound from "react-native-sound"

export const FARM = 1
export const ZOO = 2
export const JUNGLE = 3
export const TRANSPORT = 4
export const FRUITS = 5
export const RANDOM = 6

function returnScenarios() {
    let cenarios = [
        {
            name: 'Farm',
            theme: FARM,
            image: THEMEFARM
        },
        {
            name: 'Zoo',
            theme: ZOO,
            image: THEMEZOO
        },
        {
            name: 'Jungle',
            theme: JUNGLE,
            image: THEMEJUNGLE
        },
        {
            name: 'Transport',
            theme: TRANSPORT,
            image: THEMETRANSPORT
        },
        {
            name: 'Fruits',
            theme: FRUITS,
            image: THEMEFRUIT
        },
        {
            name: 'Randoms',
            theme: RANDOM,
            image: THEMERANDOM
        }
    ]

    return cenarios
}

function isIn(position, list) {
    let retorno = false

    list.map((it) => {
        if (it==position) {
        retorno = true
        }
    })

    return retorno
}

function getTextByTheme(theme) {
    let prefixo1 = "Selecione seus "
    let prefixo2 = "Selecione suas "

    if (theme==FARM) {
        return prefixo1 + "animais favoritos"
    } else if (theme==ZOO) {
        return prefixo1 + "animais favoritos"
    } else if (theme==TRANSPORT) {
        return prefixo1 + "transportes favoritos"
    } else if (theme==FRUITS) {
        return prefixo2 + "frutas favoritos"
    } else if (theme==RANDOM) {
        return prefixo1 + "objetos favoritos"
    } else {
        return prefixo1 + "animais favoritos"
    }
}

function getImageByCode(code, theme) {
    if (theme==FARM) {
        if (code==1) {
            return ICONVACA
        } else if (code==2) {
            return ICONPASSARO
        } else if (code==3) {
            return ICONPORCO
        } else if (code==4) {
            return ICONGALINHA
        } else if (code==5) {
            return ICONOVELHA
        } else if (code==6) {
            return ICONSAPO
        } else if (code==7) {
            return ICONCACHORRO
        } else if (code==8) {
            return ICONPEIXE
        }
        return ICONTARTARUGA
    } else if (theme==ZOO) {
        if (code==1) {
            return ICONHIPOPOTAMO
        } else if (code==2) {
            return ICONJAGUAR
        } else if (code==3) {
            return ICONCOBRA
        } else if (code==4) {
            return ICONTUCANO
        } else if (code==5) {
            return ICONLEAO
        } else if (code==6) {
            return ICONURSO
        } else if (code==7) {
            return ICONGORILA
        } else if (code==8) {
            return ICONGIRAFA
        }
        return ICONLOBO
    } else if (theme==TRANSPORT) {
        if (code==1) {
            return ICONCARRO
        } else if (code==2) {
            return ICONMOTO
        } else if (code==3) {
            return ICONBICICLETA
        } else if (code==4) {
            return ICONTREM
        } else if (code==5) {
            return ICONONIBUS
        } else if (code==6) {
            return ICONAVIAO
        } else if (code==7) {
            return ICONPATINETE
        } else if (code==8) {
            return ICONSKATE
        }
        return ICONPATINS
    } else if (theme==FRUITS) {
        if (code==1) {
            return ICONABACAXI
        } else if (code==2) {
            return ICONBANANA
        } else if (code==3) {
            return ICONMACA
        } else if (code==4) {
            return ICONMELANCIA
        } else if (code==5) {
            return ICONMORANGO
        } else if (code==6) {
            return ICONUVAS
        } else if (code==7) {
            return ICONTOMATE
        } else if (code==8) {
            return ICONMILHO
        }
        return ICONCENOURA
    } else if (theme==RANDOM) {
        if (code==1) {
            return ICONARCOIRIS
        } else if (code==2) {
            return ICONBOLA
        } else if (code==3) {
            return ICONBOLO
        } else if (code==4) {
            return ICONPIRULITO
        } else if (code==5) {
            return ICONSORVETE
        } else if (code==6) {
            return ICONBONECA
        } else if (code==7) {
            return ICONCORACAO
        } else if (code==8) {
            return ICONVIOLAO
        }
        return ICONHAMBURGUER
    } else {
        if (code==1) {
            return ICONFALCAO
        } else if (code==2) {
            return ICONLAGARTO
        } else if (code==3) {
            return ICONPEIXE2
        } else if (code==4) {
            return ICONRAPOSA
        } else if (code==5) {
            return ICONSURICATE
        } else if (code==6) {
            return ICONTIGRE
        } else if (code==7) {
            return ICONCORUJA
        } else if (code==8) {
            return ICONJACARE
        }
        return ICONPREGUICA
    }
}

function getJogadorImage(code) {
    if (code==1) {
        return ICONCOWBOY
    } else if (code==2) {
        return ICONCOWGIRL
    } else if (code==3) {
        return ICONENGENHEIRO
    } else if (code==4) {
        return ICONENGENHEIRA
    } else if (code==5) {
        return ICONFAZENDEIRO
    }

    return ICONFAZENDEIRA
}

function maskForDate(date) {
    let retorno = ""

    if (date.getDate()<10) {
        retorno += ("0"+date.getDate()+"/")
    } else {
        retorno += (date.getDate()+"/")
    }

    if (date.getMonth()<9) {
        retorno += ("0"+(date.getMonth()+1)+"/")
    } else {
        retorno += ((date.getMonth()+1)+"/")
    }
    retorno += date.getFullYear()   

    return retorno

}

function getIconByTheme(currentTheme) {     
    if (currentTheme==FARM) {
      return FARMIMAGE
    } else if (currentTheme==ZOO) {
      return ZOOIMAGE
    } else if (currentTheme==TRANSPORT) {
        return TRANSPORTIMAGE
    } else if (currentTheme==FRUITS) {
        return FRUITIMAGE
    } else if (currentTheme==RANDOM) {
        return RANDOMIMAGE
    } else {
      return JUNGLEIMAGE
    }
}

async function getTheme() {
    let retorno = FARM

    try {
      retorno = await AsyncStorage.getItem('theme')
    } catch(e) {
      // read error
    }

    return parseInt(retorno, 10)
}

async function getSound() {
    let retorno = 0

    return parseInt(retorno, 10)
}

async function playSound(index) {
    let soundStatus = parseInt(await AsyncStorage.getItem('hasSound'), 10)

    if (soundStatus!=0) {
        let audioList = [
            {
                title: "Correct",
                isRequire: true,
                url: require('../../sounds/correct_sound.mp3')
            },{
                title: "Incorrect",
                isRequire: true,
                url: require('../../sounds/incorrect_sound.mp3')
            },
        ]
    
        let item = audioList[index]
        let sound = new Sound(item.url, (error, souond) => {
            if (error) {
                alert('error')
                return
            }
    
            sound.play(() => {
                sound.release()
            })
    
        })    
    }
}

export {
    returnScenarios,
    isIn,
    getTextByTheme,
    getImageByCode,
    maskForDate,
    getJogadorImage,
    getTheme,
    getIconByTheme,
    getSound,
    playSound
}