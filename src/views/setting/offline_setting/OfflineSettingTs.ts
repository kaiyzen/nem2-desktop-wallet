import {Component, Provide, Vue} from 'vue-property-decorator'
import {validation} from "@/core/validation"
import ErrorTooltip from '@/components/other/forms/errorTooltip/ErrorTooltip.vue'
import {formDataConfig, Message} from "@/config"
import {cloneData} from "@/core/utils"
import {mapState} from "vuex"
import {StoreAccount} from "@/core/model"

@Component({
    components: {
        ErrorTooltip
    },
    computed: {
        ...mapState({
            activeAccount: 'account',
        })
    }
})
export default class extends Vue {
    activeAccount: StoreAccount
    @Provide() validator: any = this.$validator
    validation = validation
    formItems = cloneData(formDataConfig.offsetLineForm)

    get generationHash(){
        return this.activeAccount.generationHash
    }

    get networkCurrency(){
        return this.activeAccount.networkCurrency
    }
    submit() {
        this.$validator
            .validate()
            .then((valid) => {
                if (!valid) return
                this.setOfflineInfo()
            })
    }

    setOfflineInfo() {
        const {generationHash, mosaicName, ticker, mosaicId, divisibility} = this.formItems
        this.$store.commit('SET_GENERATION_HASH', generationHash)
        this.$store.commit('SET_NETWORK_CURRENCY', {
            hex: mosaicId,
            divisibility,
            name: mosaicName,
            ticker
        })
        this.$Notice.success({
            title: this.$t(Message.SUCCESS) + ''
        })
        this.resetForm()
    }

    resetForm() {
        this.formItems = cloneData(formDataConfig.offsetLineForm)
    }
    mounted(){
       this.resetForm()
    }
}
