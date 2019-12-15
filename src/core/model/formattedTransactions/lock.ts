import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {LockFundsTransaction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedLock extends FormattedTransaction {

  constructor(tx: LockFundsTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block.toLocaleString(),
      hash: this.txHeader.hash,
      duration_blocks: tx.duration.compact(),
      mosaics: [tx.mosaic],
    }
  }
  dialogDetailMap: any
  icon: any
}
