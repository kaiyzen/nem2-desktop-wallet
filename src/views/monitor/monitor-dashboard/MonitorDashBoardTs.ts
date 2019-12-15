import {mapState} from 'vuex'
import {Component, Vue} from 'vue-property-decorator'
import {formatNumber} from '@/core/utils'
import TransactionList from '@/components/transaction-list/TransactionList.vue'
import {networkStatusConfig} from '@/config/view/setting'
import {AppInfo, StoreAccount} from '@/core/model'

@Component({
  computed: {...mapState({activeAccount: 'account', app: 'app'})},
  components: {
    TransactionList,
  },
})
export class MonitorDashBoardTs extends Vue {
  app: AppInfo
  activeAccount: StoreAccount
  updateAnimation = ''
  networkStatusList = networkStatusConfig
  page = 1
  formatNumber = formatNumber

  get wallet() {
    return this.activeAccount.wallet
  }
}
