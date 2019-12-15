import {Message, isWindows} from '@/config/index.ts'
import monitorSelected from '@/common/img/window/windowSelected.png'
import monitorUnselected from '@/common/img/window/windowUnselected.png'
import {localRead, localSave} from '@/core/utils'
import {Component, Vue} from 'vue-property-decorator'
import {windowSizeChange, minWindow, maxWindow, unMaximize, closeWindow} from '@/core/utils/electron.ts'
import {mapState} from 'vuex'
import {NetworkType} from 'nem2-sdk'
import {languageConfig} from '@/config/view/language'
import {nodeListConfig} from '@/config/view/node'
import {StoreAccount, AppWallet, AppInfo, Endpoint} from '@/core/model'
import routes from '@/router/routers'

@Component({
  computed: {
    ...mapState({
      activeAccount: 'account',
      app: 'app',
    }),
  },
})
export class MenuBarTs extends Vue {
  app: AppInfo
  nodeList: Endpoint[] = [] // @TODO: review node list
  activeAccount: StoreAccount
  showNodeList = false
  isWindows = isWindows
  inputNodeValue = ''
  isNowWindowMax = false
  monitorSelected = monitorSelected
  monitorUnselected = monitorUnselected
  languageList = languageConfig
  NetworkType = NetworkType
  closeWindow = closeWindow

  get routes() {
    return routes[0].children
      .filter(({meta}) => meta.clickable)
      .map(({path, meta}) => ({path, meta}))
  }

  get isNodeHealthy() {
    return this.app.isNodeHealthy
  }

  get wallet() {
    return this.activeAccount.wallet || false
  }

  get walletList() {
    return this.app.walletList || []
  }

  get networkType() {
    return this.activeAccount.wallet ? NetworkType[this.activeAccount.wallet.networkType] : false
  }

  get node() {
    return this.activeAccount.node
  }

  get language() {
    return this.$i18n.locale
  }

  set language(lang) {
    this.$i18n.locale = lang
    localSave('locale', lang)
  }

  get nodeNetworkType() {
    return this.app.nodeNetworkType
  }

  get nodeNetworkTypeText() {
    const {nodeNetworkType} = this
    if (!this.isNodeHealthy) return this.$t('Invalid_node')
    return nodeNetworkType ? NetworkType[nodeNetworkType] : this.$t('Loading')
  }

  get currentWalletAddress() {
    if (!this.wallet) return null
    return this.activeAccount.wallet.address
  }

  set currentWalletAddress(newActiveWalletAddress) {
    AppWallet.updateActiveWalletAddress(newActiveWalletAddress, this.$store)
  }

  get accountName() {
    return this.activeAccount.currentAccount.name
  }


  get nodeLoading() {
    return this.app.nodeLoading
  }

  navigationIconClicked(route: any): void {
    if (!this.walletList.length) return
    if (this.$route.matched.map(({path}) => path).includes(route.path)) return
    this.$router.push(route.path).catch()
  }

  accountQuit() {
    this.$store.commit('RESET_APP')
    this.$store.commit('RESET_ACCOUNT')
    this.$router.push('login')
  }

  maxWindow() {
    this.isNowWindowMax = !this.isNowWindowMax
    maxWindow()
  }

  unMaximize() {
    this.isNowWindowMax = !this.isNowWindowMax
    unMaximize()
  }

  minWindow() {
    minWindow()
  }

  removeNode(index) {
    this.nodeList.splice(index, 1)
    localSave('nodeList', JSON.stringify(this.nodeList))
  }

  async selectEndpoint(index) {
    if (this.node === this.nodeList[index].value) return
    // eslint-disable-next-line no-return-assign
    this.nodeList.forEach(item => item.isSelected = false)
    this.nodeList[index].isSelected = true
    this.$store.commit('SET_NODE', this.nodeList[index].value)
  }

  checkNodeInput() {
    const {nodeList, inputNodeValue} = this
    if (inputNodeValue === '') {
      this.$Message.destroy()
      this.$Message.error(this.$t(Message.NODE_NULL_ERROR))
      return false
    }
    const flag = nodeList.find(item => item.url === inputNodeValue)
    if (flag) {
      this.$Message.destroy()
      this.$Message.error(this.$t(Message.NODE_EXISTS_ERROR))
      return false
    }
    return true
  }

  // @VEEVALIDATE
  changeEndpointByInput() {
    const {nodeList, inputNodeValue} = this
    if (!this.checkNodeInput()) return
    nodeList.push({
      value: `${inputNodeValue}`,
      name: inputNodeValue,
      url: inputNodeValue,
      isSelected: false,
    })
    this.nodeList = nodeList
    localSave('nodeList', JSON.stringify(nodeList))
  }

  initNodeList() {
    const nodeListData = localRead('nodeList')
    this.nodeList = nodeListData ? JSON.parse(nodeListData) : nodeListConfig
    this.$store.commit('SET_NODE', this.nodeList.find(item => item.isSelected).value)
  }

  created() {
    if (isWindows) windowSizeChange()
    this.initNodeList()
  }
}
