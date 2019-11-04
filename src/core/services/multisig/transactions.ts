import {
  NetworkType, Transaction, PublicAccount, AggregateTransaction,
  Deadline, UInt64, Listener, TransactionHttp, HashLockTransaction,
  Mosaic, MosaicId, Account, Address,
} from 'nem2-sdk'
import { Store } from 'vuex'
import { AppState, CreateWalletType } from '@/core/model'
import { filter, mergeMap } from 'rxjs/operators'
import {defaultNetworkConfig} from '@/config'
const {DEFAULT_LOCK_AMOUNT} = defaultNetworkConfig

import "regenerator-runtime"
import {NemLedger} from '@/core/api/LedgerApi'
import TransportWebUSB from "@ledgerhq/hw-transport-webusb"

export const createCompleteMultisigTransaction = ( transactions: Array<Transaction>,
                                                   multisigPublicKey: string,
                                                   networkType: NetworkType,
                                                   fee: number) => {
  const publicAccount = PublicAccount.createFromPublicKey(multisigPublicKey, networkType)

  return AggregateTransaction.createComplete(
    Deadline.create(),
    transactions.map(tx => tx.toAggregate(publicAccount)),
    networkType,
    [],
    UInt64.fromUint(fee)
  )
}

export const createBondedMultisigTransaction = ( transactions: Array<Transaction>,
                                                 multisigPublicKey: string,
                                                 networkType: NetworkType,
                                                 fee: number) => {
   const publicAccount = PublicAccount.createFromPublicKey(multisigPublicKey, networkType)

   return AggregateTransaction.createBonded(
     Deadline.create(),
     transactions.map(tx => tx.toAggregate(publicAccount)),
     networkType,
     [],
     UInt64.fromUint(fee)
   )
}

export const announceBondedWithLock = ( aggregateTransaction: AggregateTransaction,
                                        account: Account,
                                        listener: Listener,
                                        node: string,
                                        fee: number,
                                        store: Store<AppState>) => {
    const {wallet, networkCurrency, generationHash} = store.state.account
    const {networkType} = wallet

    const transactionHttp = new TransactionHttp(node)
    const signedTransaction = account.sign(aggregateTransaction, generationHash)
    const hashLockTransaction = HashLockTransaction
        .create(
            Deadline.create(),
            new Mosaic(new MosaicId(networkCurrency.hex), UInt64.fromUint(DEFAULT_LOCK_AMOUNT)),
            UInt64.fromUint(480),
            signedTransaction,
            networkType,
            UInt64.fromUint(fee)
        )

    // @WALLETS: wallet refactor, should not sign here
    const hashLockTransactionSigned = account.sign(hashLockTransaction, generationHash)

    // @TODO: listener should probably not be here
    listener.open().then(() => {
        transactionHttp
            .announce(hashLockTransactionSigned)
            .subscribe(x => console.log(x), err => console.error(err))

        listener
            .confirmed(account.address)
            .pipe(
              filter((transaction) => transaction.transactionInfo !== undefined
                  && transaction.transactionInfo.hash === hashLockTransactionSigned.hash),
              mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction)),
            )
            .subscribe(
                announcedAggregateBonded => console.log(announcedAggregateBonded),
                err => console.error(err),
            )
    }).catch((error) => {
        console.error(error)
    })
}

export const announceBondedWithLockForLedger = async ( aggregateTransaction: AggregateTransaction,
                                                      address: any,
                                                      path: string,
                                                      listener: Listener,
                                                      node: string,
                                                      fee: number,
                                                      store: Store<AppState>) => {
    const {wallet, networkCurrency, generationHash} = store.state.account
    const {networkType} = wallet

    console.log("Vo day roi");                                                       
    const transactionHttp = new TransactionHttp(node)

    var signedTransaction
    var hashLockTransactionSigned

    const transport = await TransportWebUSB.create();
    const nemH = new NemLedger(transport, "NEM");
    await nemH.signTransaction(
        path,
        aggregateTransaction.serialize(),
        generationHash,
        networkType
    )
    .then(sig => {
        signedTransaction = sig;
    })
    .catch(error => {
        transport.close();
        throw new Error(error)
    })
    console.log("signedTransaction")
    console.log(signedTransaction)

    const hashLockTransaction = HashLockTransaction
        .create(
            Deadline.create(),
            new Mosaic(new MosaicId(networkCurrency.hex), UInt64.fromUint(DEFAULT_LOCK_AMOUNT)),
            UInt64.fromUint(480),
            signedTransaction,
            networkType,
            UInt64.fromUint(fee)
        )

    // @WALLETS: wallet refactor, should not sign here
    await nemH.signTransaction(
        path,
        hashLockTransaction.serialize(),
        generationHash,
        networkType
    )
    .then(sig => {
        hashLockTransactionSigned = sig;
    })
    .catch(error => {
        transport.close();
        throw new Error(error)
    })
    transport.close();

    // @TODO: listener should probably not be here
    listener.open().then(() => {
        transactionHttp
        .announce(hashLockTransactionSigned)
        .subscribe(x => console.log(x), err => console.error(err))

        listener
            .confirmed(address)
              .pipe(
                filter((transaction) => transaction.transactionInfo !== undefined
                    && transaction.transactionInfo.hash === hashLockTransactionSigned.hash),
                mergeMap(ignored => transactionHttp.announceAggregateBonded(signedTransaction)),
              )
        .subscribe(
            announcedAggregateBonded => console.log(announcedAggregateBonded),
            err => console.error(err),
        )
    }).catch((error) => {
        console.error(error)
    })
}
