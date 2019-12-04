import {NetworkType} from "nem2-sdk"
import {defaultNetworkConfig} from "@/config"

export const copyTxt = (txt) => {
    return new Promise((resolve) => {
        const input = document.createElement('input')
        input.setAttribute('readonly', 'readonly')
        input.setAttribute('value', txt)
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)
        resolve()
    })
}

export const localSave = (key, value) => {
    localStorage.setItem(key, value)
}

export const localRead = (key) => {
    return localStorage.getItem(key) || ''
}

export const localRemove = (key) => {
    localStorage.removeItem(key)
}

export const sessionSave = (key, value) => {
    sessionStorage.setItem(key, value)
}

export const sessionRead = (key) => {
    return sessionStorage.getItem(key) || ''
}

export const getObjectLength = (targetObject) => {
    return Object.keys(targetObject).length
}


export const isRefreshData = function (localStorageName, refreshTime, borderlineTime) {
    if (localRead(localStorageName) === '') {
        return true
    }
    const currentTime = new Date()
    const currentTimestamp = currentTime.getTime()
    const marketPriceDataList = JSON.parse(localRead(localStorageName))
    const timeDifference = Number(currentTimestamp) - Number(marketPriceDataList.timestamp)
    if (refreshTime < timeDifference || borderlineTime == 0) {
        return true
    }
    return false
}

export const cloneData = object => JSON.parse(JSON.stringify(object))

export const getTopValueInObject = (object: any): any => {
    return Object.values(object)[0]
}

/**
 * Flattens an array that can have elements nested up to 2 levels
 * @param array
 */
export const flattenArrayOfStrings = (array: any[]): any[] => {
    const step1 = [].concat(...array).map(item => item)
    return [].concat(...step1).map(item => item)
}

export function getDefaultAccountNetworkType(): NetworkType {
    const accountMap = localRead('accountMap')
    if (accountMap === '') return defaultNetworkConfig.DEFAULT_NETWORK_TYPE
    const networkList = Object.values(JSON.parse(accountMap)).map((item: any) => item.networkType)
    return [
        {
            length: networkList.filter(networkType => networkType == NetworkType.MIJIN_TEST).length,
            type: NetworkType.MIJIN_TEST
        },
        {
            length: networkList.filter(networkType => networkType == NetworkType.TEST_NET).length,
            type: NetworkType.TEST_NET
        },
        {
            length: networkList.filter(networkType => networkType == NetworkType.MIJIN).length,
            type: NetworkType.MIJIN
        },
        {
            length: networkList.filter(networkType => networkType == NetworkType.MAIN_NET).length,
            type: NetworkType.MAIN_NET
        }
    ].sort((a, b) => b.length - a.length)[0].type
}
