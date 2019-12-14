import {FormattedTransaction, AppState, CosignatoryModifications} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {MultisigAccountModificationTransaction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedModifyMultisigAccount extends FormattedTransaction {

  constructor(tx: MultisigAccountModificationTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      minApprovalDelta: tx.minApprovalDelta,
      maxRemovalDelta: tx.minRemovalDelta,
      cosignatories: CosignatoryModifications.createFromMultisigAccountModificationTransaction(tx),
    }
  }
  dialogDetailMap: any
  icon: any
}
