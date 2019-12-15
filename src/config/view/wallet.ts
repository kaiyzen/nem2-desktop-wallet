import mosaic1Icon from '@/common/img/service/mosaic1.png'
import mosaic2Icon from '@/common/img/service/mosaic2.png'
import multisign1Icon from '@/common/img/service/multisign1.png'
import multisign2Icon from '@/common/img/service/multisign2.png'
import namespace1Icon from '@/common/img/service/namespace1.png'
import namespace2Icon from '@/common/img/service/namespace2.png'
import apostille1Icon from '@/common/img/service/apostille1.png'
import apostille2Icon from '@/common/img/service/apostille2.png'
import {localRead} from '@/core/utils'

import step1Of4 from '@/common/img/wallet/1_4.png'
import step2Of4 from '@/common/img/wallet/2_4.png'
import step3Of4 from '@/common/img/wallet/3_4.png'
import step4Of4 from '@/common/img/wallet/4_4.png'

import step1Of3 from '@/common/img/wallet/1_3.png'
import step2Of3 from '@/common/img/wallet/2_3.png'
import step3Of3 from '@/common/img/wallet/3_3.png'


const walletImportNavigationConfig = [
  {
    title: 'privatekey',
    name: 'walletImportPrivatekey',
    isSelected: false,
  }, {
    title: 'keystore',
    name: 'walletImportKeystore',
    isSelected: false,
  },
]

if (localRead && localRead('_ENABLE_TREZOR_') === 'true') 
{walletImportNavigationConfig.push({
  title: 'hardware',
  name: 'walletImportHardware',
  isSelected: false,
})}


export const walletFnNavConfig = [
  {name: 'create', to: '/walletCreate', active: false},
  {name: 'import', to: '/walletImportKeystore', active: true},
]

export const walletImportNavigatorConfig = walletImportNavigationConfig

export const walletStyleSheetType = {
  seedWallet: 'walletItem_bg_1',
  otherWallet: 'walletItem_bg_2',
  activeWallet: 'walletItem_bg_0',
}
export const seedWalletTitle = 'seedWallet-'
export const serviceSwitchFnConfig = [
  {
    name: 'mosaic',
    to: '/mosaic',
    iconDefault: mosaic1Icon,
    iconActive: mosaic2Icon,
    introduce: 'NEM_Mosaic_is_a_smart_asset_with_rich_attributes_and',
    active: false,
  },
  {
    name: 'multi_signature',
    to: '/multisigApi',
    iconDefault: multisign1Icon,
    iconActive: multisign2Icon,
    introduce: 'provides_an_editable_chain_on_protocol_in_a_multi_signature_account_which_is_the_best_way_to_store_funds_and_achieve_a_common_account',
    active: true,
  }, {
    name: 'namespace',
    to: '/namespace',
    iconDefault: namespace1Icon,
    iconActive: namespace2Icon,
    introduce: 'a_namespace_is_a_domain_name_that_stores_mosaics_Each_namespace_is_unique_within_a_block_chain_and_mosaics_can_be_defined_and_authenticated_on_a_multi_level_sub_namespace',
    active: false,
  },
  {
    name: 'apostille',
    to: '/apostille',
    iconDefault: apostille1Icon,
    iconActive: apostille2Icon,
    introduce: 'provides_an_editable_chain_on_protocol_in_a_multi_signature_account_which_is_the_best_way_to_store_funds_and_achieve_a_common_account',
    active: false,
  },
]

export const fourStepsPictureList = [step1Of4, step2Of4, step3Of4, step4Of4]
export const threeStepsPictureList = [step1Of3, step2Of3, step3Of3]
