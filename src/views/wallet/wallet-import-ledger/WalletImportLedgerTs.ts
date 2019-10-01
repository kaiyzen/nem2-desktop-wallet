import {mapState} from 'vuex'
import {Component, Vue} from 'vue-property-decorator'
import {formDataConfig} from "@/config/view/form";
import {networkTypeConfig} from '@/config/view/setting'
import { Address } from 'nem2-sdk';
import {Message} from "@/config/index.ts"
import {AppInfo, StoreAccount, AppWallet} from '@/core/model'

import Nem from "./hw-app-nem.js"
// import { NemLedger } from "@/core/api/LedgerApi"
import TransportWebUSB from "@ledgerhq/hw-transport-webusb"
// import {encryptKey, getAccountByLedger, saveLocalWallet} from "@/core/utils/wallet"

@Component({
    computed: {
        ...mapState({
            activeAccount: 'account',
            app: 'app'
        })
    }
})
export class WalletImportLedgerTs extends Vue {
    activeAccount: StoreAccount
    app: AppInfo
    NetworkTypeList = networkTypeConfig
    account = {}
    showCheckPWDialog = false
    // TODO: prefill values (account Index and wallet name)
    // based on number of existing trezor accounts
    ledgerForm = formDataConfig.ledgerImportForm

    get getNode() {
        return this.activeAccount.node
    }

    get currentXEM1() {
        return this.activeAccount.currentXEM1
    }

    get walletList() {
        return this.app.walletList
    }

    toWalletDetails() {
        this.$Notice.success({
            title: this['$t']('Imported_wallet_successfully') + ''
        })
        this.$store.commit('SET_HAS_WALLET', true)
        this.$router.push('dashBoard')
    }

    toBack() {
        this.$router.push('initAccount')
    }

    // checkImport() {
    //     const { accountIndex, networkType, walletName } = this.ledgerForm;
    //     if (!walletName || walletName == '') {
    //         this.showNotice(this.$t(Message.WALLET_NAME_INPUT_ERROR))
    //         return false
    //     }
    //     return true
    // }

    // showNotice(text) {
    //     this.$Notice.destroy()
    //     this.$Notice.error({
    //         title: text + ''
    //     })
    // }

    async importAccountFromLedger() {
        const { accountIndex, networkType, walletName } = this.ledgerForm

        // await this.checkImport();

        this.$store.commit('SET_UI_DISABLED', {
            isDisabled: true,
            message: "ledger_awaiting_interaction"
        });

        const transport = await TransportWebUSB.create();
        const nemH = new Nem(transport);

        const accountResult = await nemH.getAccount(`m/44'/43'/${networkType}'/0'/${accountIndex}'`)

        const publicKey = accountResult.publicKey;
        const serializedPath = accountResult.path;
        const address = accountResult.address;

        new AppWallet().createFromLedger(
            walletName,
            networkType,
            serializedPath,
            publicKey,
            address,
            this.$store
        );

        transport.close();

        this.$store.commit('SET_UI_DISABLED', {
            isDisabled: false,
            message: ""
        });

        this.toWalletDetails();
    }
}