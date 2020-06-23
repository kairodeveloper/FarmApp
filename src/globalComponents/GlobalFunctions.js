import { ICONVACA, ICONPASSARO, ICONPORCO, ICONGALINHA, ICONOVELHA, ICONSAPO, ICONCACHORRO, ICONPEIXE, ICONTARTARUGA, ICONCOWBOY, ICONCOWGIRL, ICONENGENHEIRO, ICONENGENHEIRA, ICONFAZENDEIRO, ICONFAZENDEIRA, FARMIMAGE, ZOOIMAGE, JUNGLEIMAGE, ICONHIPOPOTAMO, ICONJAGUAR, ICONCOBRA, ICONTUCANO, ICONLEAO, ICONURSO, ICONGORILA, ICONSONIC, ICONLOBO, ICONFALCAO, ICONLAGARTO, ICONPEIXE2, ICONRAPOSA, ICONSURICATE, ICONTIGRE, ICONCORUJA, ICONJACARE, ICONPREGUICA } from "../../images"
import AsyncStorage from "@react-native-community/async-storage"

export const FARM = 1
export const ZOO = 2
export const JUNGLE = 3
  

function isIn(position, list) {
    let retorno = false

    list.map((it) => {
        if (it==position) {
        retorno = true
        }
    })

    return retorno
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
            return ICONSONIC
        }
        return ICONLOBO
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

export {
    isIn,
    getImageByCode,
    maskForDate,
    getJogadorImage,
    getTheme,
    getIconByTheme
}