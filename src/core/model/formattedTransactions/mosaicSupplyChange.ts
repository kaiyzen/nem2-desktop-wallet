import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {MosaicSupplyChangeTransaction, MosaicSupplyChangeAction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedMosaicSupplyChange extends FormattedTransaction {

  constructor(tx: MosaicSupplyChangeTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      mosaicId: tx.mosaicId.toHex(),
      direction: tx.action === MosaicSupplyChangeAction.Increase ? 'Increase' : 'Decrease',
      delta: tx.delta.compact().toLocaleString(),
    }
  }
  dialogDetailMap: any
  icon: any
}
