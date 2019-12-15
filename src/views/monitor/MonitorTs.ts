import {Message} from '@/config/index.ts'
import {Component, Vue} from 'vue-property-decorator'
import monitorSelected from '@/common/img/monitor/monitorSelected.png'
import monitorUnselected from '@/common/img/monitor/monitorUnselected.png'
import {copyTxt, formatNumber, localRead, localSave} from '@/core/utils'
import {mapState} from 'vuex'
import {AppInfo, MosaicNamespaceStatusType, StoreAccount} from '@/core/model'
import routes from '@/router/routers'
import numberGrow from '@/components/number-grow/NumberGrow.vue'

@Component({
  components: {
    numberGrow,
  },
  computed: {
    ...mapState({
      activeAccount: 'account',
      app: 'app',
    }),
  },
})
export class MonitorTs extends Vue {
  app: AppInfo
  activeAccount: StoreAccount
  mosaic: string
  mosaicName = ''
  showExpiredMosaics = false
  isShowAccountInfo = true
  isShowManageMosaicIcon = false
  isChecked = true
  monitorSelected = monitorSelected
  monitorUnselected = monitorUnselected
  formatNumber = formatNumber

  get balance(): number {
    const {wallet} = this.activeAccount
    if (!wallet) return 0
    return wallet.balance || 0
  }

  get xemUsdPrice() {
    return this.app.xemUsdPrice
  }

  get ticker() {
    return this.activeAccount.networkCurrency.ticker
  }

  get chainStatus() {
    return this.app.chainStatus
  }

  get mosaicsLoading() {
    return this.app.mosaicsLoading
  }

  get address() {
    return this.activeAccount.wallet ? this.activeAccount.wallet.address : ''
  }

  get mosaicMap() {
    return this.activeAccount.mosaics
  }

  get mosaics() {
    return this.activeAccount.mosaics
  }

  get mosaicList() {
    const {mosaics} = this
    if (this.mosaicsLoading || !mosaics) return []
    return Object.values(this.mosaics)
  }

  get filteredList() {
    const {mosaics} = this
    if (this.mosaicsLoading || !mosaics) return []
    return Object.values(this.mosaics).filter(({hide}) => !hide)
  }

  get currentHeight() {
    return this.app.chainStatus.currentHeight
  }

  get accountName() {
    return this.activeAccount.currentAccount.name
  }

  get routes() {
    const routesMeta: any[] = routes[0].children
      .find(({name}) => name === 'monitorPanel')
      .children

    return routesMeta.map(({path, name}) => ({
      path,
      name,
      active: this.$route.matched.map(matched => matched.path).includes(path),
    }))
  }

  hideAssetInfo() {
    this.isShowAccountInfo = false
  }

  manageMosaicList() {
    this.isShowManageMosaicIcon = !this.isShowManageMosaicIcon
  }

  copyAddress() {
    copyTxt(this.address).then(() => {
      this.$Notice.success(
        {
          title: `${this.$t(Message.COPY_SUCCESS)}`,
        },
      )
    })
  }

  toggleAllChecked() {
    this.isChecked = !this.isChecked
    const updatedList: any = {...this.mosaicMap}
    // eslint-disable-next-line no-return-assign
    Object.keys(updatedList).forEach(key => updatedList[key].hide = !this.isChecked)
    this.$store.commit('SET_MOSAICS', updatedList)
    localSave(this.address, JSON.stringify(updatedList))
  }

  toggleShowExpired() {
    this.showExpiredMosaics = !this.showExpiredMosaics
    const updatedList: any = {...this.mosaicMap}
    const {currentHeight} = this
    Object.keys(updatedList)
      .forEach(key => {
        const {expirationHeight} = updatedList[key]
        updatedList[key].hide = this.showExpiredMosaics
          ? false
          : expirationHeight !== MosaicNamespaceStatusType.FOREVER || currentHeight > expirationHeight
      })
    this.$store.commit('SET_MOSAICS', updatedList)
    localSave(this.address, JSON.stringify(updatedList))
  }

  showMosaicMap() {
    this.isShowManageMosaicIcon = !this.isShowManageMosaicIcon
  }

  toggleShowMosaic(mosaic) {
    const accountMap = JSON.parse(localRead('accountMap'))
    const wallets = accountMap.wallets
    const updatedList: any = {...this.mosaicMap}
    updatedList[mosaic.hex].hide = !updatedList[mosaic.hex].hide
    this.$store.commit('SET_MOSAICS', updatedList)
    wallets[0].hideMosaicMap = wallets[0].hideMosaicMap || {}
    if (!mosaic.show) {
      wallets[0].hideMosaicMap[mosaic.hex] = true
      accountMap.wallets = wallets
      localSave('accountMap', JSON.stringify(accountMap))
      return
    }
    // delete from hideMosaicList
    delete wallets[0].hideMosaicMap[mosaic.hex]
    accountMap.wallets = wallets
    localSave('accountMap', JSON.stringify(accountMap))
  }

  searchMosaic() {
    // @TODO: Query the network for mosaics that are not in the mosaic list
    if (this.mosaicName === '') {
      this.showErrorMessage(Message.MOSAIC_NAME_NULL_ERROR)
      return
    }
  }

  showErrorMessage(message) {
    this.$Notice.destroy()
    this.$Notice.error({title: `${this.$t(message)}`})
  }
}
