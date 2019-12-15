import {FormattedTransaction, AppState} from '@/core/model'
import {absoluteAmountToRelativeAmountWithTicker} from '@/core/utils'
import {NamespaceRegistrationTransaction, NamespaceRegistrationType} from 'nem2-sdk'
import {Store} from 'vuex'

export class FormattedRegisterNamespace extends FormattedTransaction {

  constructor(tx: NamespaceRegistrationTransaction,
    store: Store<AppState>) {
    super(tx, store)
    const {networkCurrency, wallet} = store.state.account
    const routeOrSub = tx.registrationType === NamespaceRegistrationType
      .RootNamespace ? 'root' : 'sub'
    const namespaceName = `${tx.namespaceName}(${routeOrSub})`

    this.dialogDetailMap = {
      self: tx.signer ? tx.signer.address.pretty() : store.state.account.wallet.address,
      transaction_type: this.txHeader.tag,
      namespace_name: namespaceName,
      root_namespace: tx.parentId ? tx.parentId.id.toHex() : '-',
      sender: wallet.publicKey,
      duration: tx.duration ? tx.duration.compact() : 0,
      fee: absoluteAmountToRelativeAmountWithTicker(tx.maxFee.compact(), networkCurrency),
    }
  }
  dialogDetailMap: any
  icon: any
}
