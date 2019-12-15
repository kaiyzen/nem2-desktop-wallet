import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {Store} from 'vuex'
import {SecretProofTransaction} from 'nem2-sdk'

export class FormattedSecretProof extends FormattedTransaction {
  constructor(tx: SecretProofTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      hashType: tx.hashType,
      proof: tx.proof,
    }
  }
  dialogDetailMap: any
  icon: any
}
