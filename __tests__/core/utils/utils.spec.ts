import * as utils from '@/core/utils/utils.ts'
import {defaultNetworkConfig} from "@/config"
import {NetworkType} from "nem2-sdk"

describe('utils', () => {
    it('should return default network type while local storage null', () => {
        expect(utils.getDefaultAccountNetworkType()).toBe(defaultNetworkConfig.DEFAULT_NETWORK_TYPE)
    })
    it('should return TEST_NET', () => {
        utils.localSave('accountMap', JSON.stringify({
            test5: {networkType: NetworkType.MAIN_NET},
            test1: {networkType: NetworkType.TEST_NET},
            test2: {networkType: NetworkType.TEST_NET},
            test3: {networkType: NetworkType.TEST_NET},
            test6: {networkType: NetworkType.MIJIN},
            test7: {networkType: NetworkType.MIJIN_TEST},
            test4: {networkType: NetworkType.TEST_NET},
        }))
        expect(utils.getDefaultAccountNetworkType()).toBe(NetworkType.TEST_NET)
    })
    it('should return not TEST_NET', () => {
        utils.localSave('accountMap', JSON.stringify({
            test5: {networkType: NetworkType.MAIN_NET},
            test1: {networkType: NetworkType.TEST_NET},
            test2: {networkType: NetworkType.TEST_NET},
            test3: {networkType: NetworkType.TEST_NET},
            test6: {networkType: NetworkType.MIJIN},
            test4: {networkType: NetworkType.TEST_NET},
            test7: {networkType: NetworkType.MIJIN_TEST},
        }))
        expect(utils.getDefaultAccountNetworkType()).not.toBe(NetworkType.TEST_NET)
    })
})

