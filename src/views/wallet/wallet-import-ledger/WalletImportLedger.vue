<template>
  <div class="ledger">
    <div class="page_import_title">{{$t('connect_ledger_title')}}</div>
    <div class="describle">{{$t('ledger_description')}}</div>
    <ul>
      <li>
        <div class="title_info">
        {{$t('choose_network')}}
        </div>
        <div class="gray_content">
          <Select v-model="ledgerForm.networkType" :placeholder="$t('choose_network')">
            <Option v-for="item in NetworkTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
      </li>
      <li>
        <div class="title_info">
        {{$t('choose_account_index')}}
        </div>
        <div class="gray_content">
          <input class="absolute" type="number" min="0" max="1000000" v-model="ledgerForm.accountIndex"
                  :placeholder="$t('choose_account_index')">

        </div>
      </li>
      <li>
        <div class="title_info">
        {{$t('set_the_wallet_name')}}
        </div>
        <div class="gray_content">
          <input class="absolute" type="text" v-model="ledgerForm.walletName"
                  :placeholder="$t('set_the_wallet_name')">
        </div>
      </li>
    </ul>

    <div class="bottom_button ">
      <span class="back left" @click="toBack"> {{$t('back')}}</span>
      <span class="import right" @click="importAccountFromLedger">{{$t('connect_ledger_prompt')}}</span>
    </div>
  </div>

</template>

<script lang="ts">
    //@ts-ignore
    import {WalletImportLedgerTs} from '@/views/wallet/wallet-import-ledger/WalletImportLedgerTs'

    export default class WalletImportLedger extends WalletImportLedgerTs {

    }
</script>
<style scoped lang="less">
  @import "WalletImportLedger.less";
</style>
