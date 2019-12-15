import {MnemonicQR} from 'nem2-qr-library'
import {MnemonicPassPhrase} from 'nem2-hd-wallets'
import {Component, Vue, Prop, Provide} from 'vue-property-decorator'
import {mapState} from 'vuex'
import {of} from 'rxjs'
import {pluck, concatMap} from 'rxjs/operators'
import {AppAccounts, StoreAccount} from '@/core/model'
import {copyTxt} from '@/core/utils'
import {Message, fourStepsPictureList} from '@/config'
import failureIcon from '@/common/img/monitor/failure.png'
import {validation} from '@/core/validation'
import MnemonicVerification from '@/components/mnemonic-verification/MnemonicVerification.vue'
import ErrorTooltip from '@/components/other/forms/errorTooltip/ErrorTooltip.vue'

@Component({
  computed: {
    ...mapState({
      activeAccount: 'account',
    }),
  },
  components: {
    MnemonicVerification,
    ErrorTooltip,
  },
  subscriptions() {
    const qrCode$ = this
      .$watchAsObservable('qrCodeArgs', {immediate: true})
      .pipe(pluck('newValue'),
        concatMap(args => {
          if (args instanceof MnemonicQR) return args.toBase64()
          return of(failureIcon)
        }))
    return {qrCode$}
  },
})
export class MnemonicDialogTs extends Vue {
  @Provide() validator: any = this.$validator
  activeAccount: StoreAccount
  MnemonicQR = MnemonicQR
  validation = validation
  copyTxt = copyTxt
  stepIndex = 0
  mnemonic = ''
  password = ''
  QRCode = ''
  fourStepsPictureList = fourStepsPictureList
  stringOfSteps = [ 'input_password', 'backup_prompt', 'backup_mnemonic', 'confirm_backup' ]
  @Prop()
  showMnemonicDialog: boolean

  get show() {
    return this.showMnemonicDialog
  }

  set show(val) {
    if (!val) 
    {this.$emit('closeMnemonicDialog')}
    
  }

  get cipher() {
    return this.activeAccount.currentAccount.password
  }

  get qrCodeArgs(): MnemonicQR {
    const {mnemonic, password} = this
    const {generationHash, wallet} = this.activeAccount
    const {networkType} = wallet
    if (password.length < 8) return null
    try {
      return new this.MnemonicQR(
        new MnemonicPassPhrase(mnemonic),
        password,
        networkType,
        generationHash,
      )
    } catch (error) {
      console.error('MnemonicDialogTs -> qrCodeArgs -> error', error)
      return null
    }
  }

  submit() {
    this.$validator
      .validate()
      .then(valid => {
        if (!valid) return
        this.mnemonic = AppAccounts().decryptString(
          this.activeAccount.wallet.encryptedMnemonic,
          this.password,
        )
        this.stepIndex = 1
      })
  }

  async copyMnemonic() {
    await this.copyTxt(this.mnemonic)
    this.$Notice.success({
      title: `${this.$t(Message.COPY_SUCCESS)}`,
    })
  }
}
