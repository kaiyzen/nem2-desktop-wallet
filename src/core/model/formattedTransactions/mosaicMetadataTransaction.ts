import {FormattedTransaction} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {Transaction} from 'nem2-sdk'
import {AppState} from '../types'
import {Store} from 'vuex'

export class FormattedMosaicMetadataTransaction extends FormattedTransaction {

  constructor(    tx: Transaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    const {divisibility, ticker} = networkCurrency

    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
    }
  }
  dialogDetailMap: any
  icon: any
}
