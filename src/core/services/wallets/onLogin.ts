import {Store} from 'vuex'
import {localRead, localSave} from '@/core/utils'
import {AppState, AppWallet, CurrentAccount} from '@/core/model'
import {setWalletsBalances} from '@/core/services'

export const onLogin = (accountName: string, store: Store<AppState>) => {
 persistAccountName(accountName)
 setValuesInLocalStorage(accountName, store)
 setWalletsBalances(store)
}

// @TODO: implement this in AppAccount
const persistAccountName = (accountName: string) => {
 localSave('activeAccountName', accountName)
}

const setValuesInLocalStorage = (accountName: string, store: Store<AppState>) => {
 // @TODO: implement this in AppAccount
 const accountMap = localRead('accountMap') ? JSON.parse(localRead('accountMap')) : {}
 store.commit('SET_WALLET_LIST', accountMap[accountName].wallets)

 // @TODO: implement this in AppWallet
 const activeWallet = new AppWallet(accountMap[accountName].wallets[0])
 store.commit('SET_WALLET', activeWallet)

 // @TODO: implement this in AppAccount
 store.commit(
  'SET_ACCOUNT_DATA',
  new CurrentAccount(accountName, accountMap.password, activeWallet.networkType),
 )
}
