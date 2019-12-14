import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {AccountLinkTransaction, LinkAction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedLinkAccount extends FormattedTransaction {

  constructor(  tx: AccountLinkTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account

    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      action: tx.linkAction === LinkAction.Link ? 'Link' : 'Unlink',
      Remote_public_key: tx.remotePublicKey,
    }
  }
  dialogDetailMap: any
  icon: any
}
