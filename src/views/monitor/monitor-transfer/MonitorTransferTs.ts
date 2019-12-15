import {Component, Vue} from 'vue-property-decorator'
import {TransferType} from '@/core/model'

import Transfer from '@/components/forms/transfer/Transfer.vue'
import CollectionRecord from '@/components/collection-record/CollectionRecord.vue'
import DisabledForms from '@/components/disabled-forms/DisabledForms.vue'

@Component({
  components: {
    Transfer,
    CollectionRecord,
    DisabledForms,
  },
})
export class MonitorTransferTs extends Vue {
  transferType = TransferType
}
