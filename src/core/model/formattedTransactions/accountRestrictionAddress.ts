import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {AccountAddressRestrictionTransaction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedAccountRestrictionAddress extends FormattedTransaction {

  constructor(tx: AccountAddressRestrictionTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account

    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      // @MODAL
    }
  }
  dialogDetailMap: any
  icon: any
}
