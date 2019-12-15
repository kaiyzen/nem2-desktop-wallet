import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {MosaicAliasTransaction, AliasAction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedMosaicAlias extends FormattedTransaction {

  constructor(tx: MosaicAliasTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      action: tx.aliasAction === AliasAction.Link ? 'Link' : 'Unlink',
      mosaic: tx.mosaicId.toHex(),
      namespace: tx.namespaceId.toHex(),
    }
  }
  dialogDetailMap: any
  icon: any
}
