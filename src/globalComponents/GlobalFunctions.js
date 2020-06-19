import { ICONVACA, ICONPASSARO, ICONPORCO, ICONGALINHA, ICONOVELHA, ICONSAPO, ICONCACHORRO, ICONPEIXE, ICONTARTARUGA } from "../../images"

function isIn(position, list) {
    let retorno = false

    list.map((it) => {
        if (it==position) {
        retorno = true
        }
    })

    return retorno
}

function getImageByCode(code) {
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
}

export {
    isIn,
    getImageByCode
}