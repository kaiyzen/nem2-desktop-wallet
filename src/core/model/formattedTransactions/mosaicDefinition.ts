import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {MosaicDefinitionTransaction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedMosaicDefinition extends FormattedTransaction {

  constructor(tx: MosaicDefinitionTransaction,
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
      supplyMutable: tx.flags.supplyMutable || 'false',
      transferable: tx.flags.transferable || 'false',
      restrictable: tx.flags.restrictable || 'false',
    }
  }
  dialogDetailMap: any
  icon: any
}

