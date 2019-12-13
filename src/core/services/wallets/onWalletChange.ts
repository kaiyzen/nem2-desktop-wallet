import {Store} from 'vuex'
import {setMosaics, setNamespaces, setTransactionList} from '@/core/services'
import {Address} from 'nem2-sdk'
import {localRead} from '@/core/utils'
import {AppWallet, AppState, Listeners} from '@/core/model'

export const onWalletChange = async (
  store: Store<AppState>,
  listeners: Listeners,
  newWallet?: AppWallet,
): Promise<void> => {
 try {
  const wallet = newWallet || store.state.account.wallet
  if (!wallet) return

   store.commit("SET_TRANSACTIONS_LOADING", true);
   store.commit("SET_MOSAICS_LOADING", true);
   store.commit("SET_NAMESPACE_LOADING", true);
   store.commit("SET_MULTISIG_LOADING", true);
   store.commit("RESET_TRANSACTION_LIST");
   store.commit("RESET_MOSAICS");
   store.commit("RESET_NAMESPACES");

   //@TODO: move from there
   const mosaicListFromStorage = localRead(wallet.address);
   const appWallet = new AppWallet(wallet);
   const parsedMosaicListFromStorage =
     mosaicListFromStorage === "" ? false : JSON.parse(mosaicListFromStorage);

   if (mosaicListFromStorage) {
     await store.commit("SET_MOSAICS", parsedMosaicListFromStorage);
   }

   appWallet.setAccountInfo(store);
   await setMosaics(appWallet, store);
   await setNamespaces(wallet.address, store);

   /* Delay network calls to avoid ban */
   setTimeout(() => {
     try {
       setTransactionList(wallet.address, store);
       appWallet.setMultisigStatus(store.state.account.node, store);
     } catch (error) {
       console.error("App -> onWalletChange -> setTimeout -> error", error);
     }
   }, 500);

   listeners.switchAddress(Address.createFromRawAddress(wallet.address));
 } catch (error) {
   console.error("App -> onWalletChange -> error", error);
   store.commit("SET_TRANSACTIONS_LOADING", false);
   store.commit("SET_MOSAICS_LOADING", false);
   store.commit("SET_NAMESPACE_LOADING", false);
   store.commit("SET_MULTISIG_LOADING", false);
 }
}
