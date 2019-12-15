import {shallowMount, config, createLocalVue} from '@vue/test-utils'
import VueRouter from 'vue-router'
import iView from 'view-design'
import Vuex from 'vuex'
import VeeValidate from 'vee-validate'
// @ts-ignore
import MultisigCosign from '@/views/multisig/multisig-cosign/MultisigCosign.vue'
import {accountMutations, accountState} from '@/store/account'
import {appMutations, appState} from '@/store/app'
import {veeValidateConfig} from '@/core/validation'
import VueRx from 'vue-rx'

import {
  mosaicsLoading,
  multisigAccountInfo,
  mosaics,
  CosignWallet,
  // @ts-ignore
} from '@@/mock/conf/conf.spec'
// @ts-ignore
const localVue = createLocalVue()
const router = new VueRouter()
localVue.use(VueRouter)
localVue.use(iView)
localVue.use(Vuex)
localVue.use(VeeValidate, veeValidateConfig)
localVue.use(VueRx)
localVue.directive('focus', {
  inserted: function (el) {
    el.focus()
  },
})
// close warning
config.logModifiedComponents = false

describe('MultisigCosign', () => {
  let store
  let wrapper
  beforeEach(() => {
    store = store = new Vuex.Store({
      modules: {
        account: {
          state: Object.assign(accountState.state, {
            wallet: CosignWallet,
            mosaics,
            multisigAccountInfo,
          }),
          mutations: accountMutations.mutations,
        },
        app: {
          state: Object.assign(appState.state, {mosaicsLoading}),
          mutations: appMutations.mutations,
        },
      },
    }
    )
    wrapper = shallowMount(MultisigCosign, {
      sync: false,
      mocks: {
        $t:msg => msg,
      },
      localVue,
      store,
      router,
    })
  }
  )

  it('Component MultisigCosign is not null ', () => {
    expect(wrapper).not.toBeNull()
  })
})
