import {
    AppInfo,
    LockParams,
    StagedTransaction,
    Log,
    LoadingOverlayObject,
    NetworkProperties,
} from '@/core/model'
import {localRead} from "@/core/utils";
import {MutationTree} from 'vuex';
import Vue from 'vue'

const state: AppInfo = {
    timeZone: new Date().getTimezoneOffset() / 60,   // current time zone
    locale: 'en-US',
    walletList: [],
    mnemonic: '',
    NetworkProperties: null,
    mosaicsLoading: true,
    transactionsLoading: false,
    namespaceLoading: true,
    xemUsdPrice: 0,
    multisigLoading: true,
    _ENABLE_TREZOR_: localRead("_ENABLE_TREZOR_") === "true",
    isUiDisabled: false,
    uiDisabledMessage: '',
    stagedTransaction: {
        isAwaitingConfirmation: false,
        lockParams: LockParams.default(),
        transactionToSign: null,
    },
    logs: [],
    loadingOverlay: {
        show: false,
        message: '',
    },
}

const mutations: MutationTree<AppInfo> = {
    RESET_APP(state: AppInfo) {
        state.mnemonic = ''
        state.walletList = []
    },
    SET_WALLET_LIST(state: AppInfo, walletList: any[]): void {
        state.walletList = walletList
    },
    SET_MNEMONIC(state: AppInfo, mnemonic: string): void {
        state.mnemonic = mnemonic
    },
    SET_TIME_ZONE(state: AppInfo, timeZone: number): void {
        state.timeZone = timeZone
    },
    SET_MOSAICS_LOADING(state: AppInfo, bool: boolean) {
        state.mosaicsLoading = bool
    },
    SET_TRANSACTIONS_LOADING(state: AppInfo, bool: boolean) {
        state.transactionsLoading = bool
    },
    SET_MULTISIG_LOADING(state: AppInfo, bool: boolean) {
        state.multisigLoading = bool
    },
    SET_XEM_USD_PRICE(state: AppInfo, value: number) {
        state.xemUsdPrice = value
    },
    INITIALIZE_NETWORK_PROPERTIES(state: AppInfo, NetworkProperties: NetworkProperties) {
        state.NetworkProperties = NetworkProperties
    },
    SET_NETWORK_PROPERTIES(state: AppInfo, NetworkProperties: NetworkProperties) {
        Vue.set(state, 'NetworkProperties', NetworkProperties)
    },
    SET_NAMESPACE_LOADING(state: AppInfo, namespaceLoading: boolean) {
        state.namespaceLoading = namespaceLoading
    },
    SET_UI_DISABLED(state: AppInfo, {isDisabled, message}: {isDisabled: boolean, message: string}) {
        state.isUiDisabled = isDisabled;
        state.uiDisabledMessage = message;
    },
    SET_STAGED_TRANSACTION(state: AppInfo, stagedTransaction: StagedTransaction) {
        state.stagedTransaction = stagedTransaction
    },
    ADD_LOG(state: AppInfo, log: Log) {
        state.logs.unshift(log)
    },
    SET_LOADING_OVERLAY(state: AppInfo, loadingOverlay: LoadingOverlayObject) {
        Object.assign(state.loadingOverlay, loadingOverlay)
    },
    SET_TEMPORARY_PASSWORD(state: AppInfo, password: string) {
        state.loadingOverlay.temporaryInfo = {}
        state.loadingOverlay.temporaryInfo.password = password
    },
    SET_TEMPORARY_MNEMONIC(state: AppInfo, mnemonic: string) {
        state.loadingOverlay.temporaryInfo.mnemonic = mnemonic
    },
    REMOVE_TEMPORARY_INFO(state: AppInfo) {
        delete state.loadingOverlay.temporaryInfo
    },
    /** Subscribed in App.vue */
    TRIGGER_NOTICE(state: AppInfo, message: string) {},
}

const actions = {
    SET_NETWORK_PROPERTIES({commit, rootState}, payload: {endpoint: string, NetworkProperties: NetworkProperties}) {
        const {endpoint, NetworkProperties} = payload
        if (endpoint !== rootState.account.node) return
        commit('SET_NETWORK_PROPERTIES', NetworkProperties)
    },
}

export const appState = {state}
export const appMutations = {mutations}
export const appActions = {actions}
