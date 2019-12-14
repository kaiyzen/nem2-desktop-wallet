import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {SecretLockTransaction, NamespaceId, Address, Transaction} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedSecretLock extends FormattedTransaction {

  constructor(tx: SecretLockTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency} = store.state.account
    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
      block: this.txHeader.block,
      hash: this.txHeader.hash,
      mosaics: [tx.mosaic],
      duration_blocks: tx.duration.compact().toLocaleString(),
      hashType: tx.hashType,
      secret: tx.secret,
      aims: this.getRecipient(),
    }
  }
  dialogDetailMap: any
  icon: any

  getRecipient(): string | NamespaceId {
    const rawTx: any = this.rawTx
    const recipientAddress: NamespaceId | Address = rawTx.recipientAddress
    if (recipientAddress instanceof NamespaceId) return recipientAddress
    return recipientAddress.pretty()
  }
}
