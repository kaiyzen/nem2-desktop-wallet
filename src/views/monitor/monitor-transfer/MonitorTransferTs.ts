import {Component, Vue} from 'vue-property-decorator'
import {TransferType} from '@/core/model'

import Transfer from '@/components/forms/transfer/Transfer.vue'
import CollectionRecord from '@/components/collection-record/CollectionRecord.vue'

@Component({
  components: {
    Transfer,
    CollectionRecord,
  },
})
export class MonitorTransferTs extends Vue {
  transferType = TransferType
}
