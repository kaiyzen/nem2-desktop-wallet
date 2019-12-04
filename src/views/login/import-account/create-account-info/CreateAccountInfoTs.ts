import {Component, Vue} from 'vue-property-decorator'
import {formDataConfig, Message} from "@/config"
import {cloneData, localRead} from "@/core/utils"
import {AppAccounts, AppAccount, AppWallet, StoreAccount, CurrentAccount} from '@/core/model'
import {networkTypeConfig} from "@/config/view/setting"
import {mapState} from "vuex"
import {NetworkType} from "nem2-sdk"

@Component({
    computed: {
        ...mapState({
            activeAccount: 'account',
            app: 'app'
        })
    }
})
export class CreateAccountInfoTs extends Vue {
    activeAccount: StoreAccount
    formItem = cloneData(formDataConfig.createAccountForm)
    networkTypeList = networkTypeConfig

    get accountName() {
        return this.activeAccount.currentAccount.name
    }


    checkInput() {
        const {accountName, networkType, password, passwordAgain} = this.formItem
        const appAccounts = AppAccounts()
        if (appAccounts.getAccountFromLocalStorage(accountName)) {
            this.$Notice.error({title: this.$t(Message.ACCOUNT_NAME_EXISTS_ERROR) + ''})
            return false
        }
        if (!accountName || accountName == '') {
            this.$Notice.error({title: this.$t(Message.ACCOUNT_NAME_INPUT_ERROR) + ''})
            return false
        }
        if (!password || password.length < 8) {
            this.$Notice.error({title: this.$t(Message.PASSWORD_SETTING_INPUT_ERROR) + ''})
            return false
        }
        if (passwordAgain !== password) {
            this.$Notice.error({title: this.$t(Message.INCONSISTENT_PASSWORD_ERROR) + ''})
            return false
        }
        if (!(networkType in NetworkType)) {
            this.$Notice.error({title: this.$t(Message.NETWORK_TYPE_INVALID) + ''})
            return false
        }
        return true
    }

    submit() {
        const appAccounts = AppAccounts()
        let {accountName, password, networkType, hint} = this.formItem
        if (!this.checkInput()) return
        const encryptedPassword = AppAccounts().encryptString(password, password)
        const appAccount = new AppAccount(accountName, [], encryptedPassword, hint, networkType)
        appAccounts.saveAccountInLocalStorage(appAccount)
        this.$Notice.success({title: this.$t(Message.OPERATION_SUCCESS) + ''})
        const currentAccount: CurrentAccount = {
            name: accountName,
            password: encryptedPassword,
            networkType,
        }
        this.$store.commit('SET_ACCOUNT_DATA', currentAccount)
        this.$store.commit('SET_TEMPORARY_PASSWORD', password)
        this.$router.push('importMnemonic')
    }
}
