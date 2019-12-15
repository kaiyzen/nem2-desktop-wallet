import {Vue, Component} from 'vue-property-decorator'

@Component
export default class GenerateMnemonicTs extends Vue {
  percent = 0
  isSlidable = true

  jumpToCreateMnemonic() {
    this.$Notice.success({
      title: `${this.$t('Generate_entropy_increase_success')}`,
    })
    setTimeout(() => {
      this.$router.push('/showMnemonic')
    }, 2000)
  }

  handleMousemove() {
    if (this.percent < 100) {
      this.percent ++
    } else {
      this.isSlidable = false
      this.jumpToCreateMnemonic()
    }
  }
}
