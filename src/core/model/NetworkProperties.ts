import {BlockInfo, NetworkType} from 'nem2-sdk';
import {Store} from 'vuex'
import {networkConfig, nodeListConfig, NETWORK_CONSTANTS} from '@/config'
import {formatTimestamp} from '@/core/utils'
import {AppState} from '.'

export class NetworkProperties {
    nodeNumber: number = nodeListConfig.length
    targetBlockTime: number = networkConfig.targetBlockTime
    generationHash: string
    networkType: NetworkType
    endpoint: string
    lastBlock: BlockInfo
    lastBlocks: BlockInfo[]
    height: number = 0
    numTransactions: number = 0
    signerPublicKey: string = ''
    lastBlockTimestamp: number = 0
    healthy: boolean = true
    loading: boolean = false

    private constructor(private store: Store<AppState>) {}

    public static create(store: Store<AppState>) {
        return new NetworkProperties(store)
    }

    reset(endpoint: string) {
        this.generationHash = null
        this.networkType = null
        this.endpoint = null
        this.lastBlock = null
        this.lastBlocks = null
        this.healthy = false
        this.loading = false
        this.store.dispatch('SET_NETWORK_PROPERTIES', {endpoint, NetworkProperties: this})
    }

    setLoadingTrue(endpoint: string) {
        this.loading = true
        this.store.dispatch('SET_NETWORK_PROPERTIES', {endpoint, NetworkProperties: this})
    }  

    setValuesFromFirstBlock(block: BlockInfo, endpoint: string) {
        this.generationHash = block.generationHash
        this.networkType = block.networkType
        this.healthy = true
        console.log(NetworkType[this.networkType])
        this.store.dispatch('SET_NETWORK_PROPERTIES', {endpoint, NetworkProperties: this})
    }

    setValuesFromLatestBlocks(blocks: BlockInfo[], endpoint: string) {
        this.lastBlocks = blocks
        this.lastBlock = blocks[blocks.length -1]
        this.height = this.lastBlock.height.compact()
        this.loading = false
        this.healthy = true
        this.store.dispatch('SET_NETWORK_PROPERTIES', {endpoint, NetworkProperties: this})
    }

    setLastBlock(block: BlockInfo, endpoint: string) {
        this.lastBlock = block
        this.height = block.height.compact()
        this.numTransactions = block.numTransactions
        this.signerPublicKey = block.signer.publicKey
        this.lastBlockTimestamp = block.timestamp.compact()
        this.healthy = true
        this.store.dispatch('SET_NETWORK_PROPERTIES', {endpoint, NetworkProperties: this})
    }

    getTimeFromBlockNumber(blockNumber: number): string {
        const highestBlockTimestamp = Math.round(this.lastBlockTimestamp / 1000)
            + NETWORK_CONSTANTS.NEMESIS_BLOCK_TIMESTAMP

        const numberOfBlock = blockNumber - this.height
        return formatTimestamp((numberOfBlock * this.targetBlockTime + highestBlockTimestamp) * 1000)
    }
}
