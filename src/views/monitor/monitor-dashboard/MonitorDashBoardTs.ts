import {mapState} from "vuex"
import {Component, Vue} from 'vue-property-decorator'
import numberGrow from '@/components/number-grow/NumberGrow.vue'
import TransactionList from '@/components/transaction-list/TransactionList.vue'
import {AppInfo} from "@/core/model"

@Component({
    computed: {...mapState({app: 'app'})},
    components: {
        numberGrow,
        TransactionList,
    }
})
export class MonitorDashBoardTs extends Vue {
    app: AppInfo

    get NetworkProperties() {
        return this.app.NetworkProperties
    }
}
