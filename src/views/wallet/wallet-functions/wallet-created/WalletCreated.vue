<template>
  <div class="walletCreatedWrap">
    <div v-if="tags == 0" class="createdDiv1">
      <p class="pageTit">
        {{ $t('backup_mnemonic') }}
      </p>
      <p class="pageTxt">
        {{ $t('Backup_mnemonics_can_effectively_back_up_and_restore_your_account') }}
      </p>
      <p class="pageRemind">
        <span class="remindTit">{{ $t('tips') }}：</span>
        {{ $t('Do_not_reveal_the_mnemonic_you_backed_up_Anyone_with_a_mnemonic_can_always_own_the_wallet') }}
      </p>
      <p class="pageRemind ">
        {{ $t('Write_your_mnemonic_on_a_piece_of_paper_If_you_want_to') }}
      </p>
      <div class="mnemonicDiv clear">
        <span v-for="(item,index) in mnemonic" :key="index">{{ item }}</span>
        <div v-if="showCover" class="covering" @click="hideCover">
          <div class="lock">
            <img src="@/common/img/wallet/mnemonicLock.png">
          </div>
          <p class="txt">
            {{ $t('display_mnemonic') }}
          </p>
        </div>
      </div>
      <div class="btns clear">
        <Button class="prev left" type="default" @click="$emit('toWalletDetails')">
          {{ $t('previous') }}
        </Button>
        <Button class="next right" type="success" @click="changeTabs(1)">
          {{ $t('next') }}
        </Button>
      </div>
    </div>
    <div v-if="tags == 1" class="createdDiv2">
      <p class="pageTit">
        {{ $t('Confirm_mnemonic') }}
      </p>

      <div class="skip_button pointer" @click="skipInput(2)">
        {{ $t('skip') }}
      </div>

      <p class="pageTxt">
        {{ $t('Please_select_each_phrase_to_make_sure_the_mnemonic_is_correct') }}
      </p>
      <p class="pageRemind">
        {{ $t('If_you_have_a_record_to_back_up_your_own_supporting') }}{{ $t('click') }}<span
          class="tails pointer" @click="skipInput(2)"
        > SKIP</span>
        {{ $t('Skip_this_action_but_please_confirm_your_risk_If_you') }}
      </p>
      <div class="mnemonicInputDiv">
        <div ref="mnemonicWordDiv" class="mnemonicWordDiv clear" />
        <div class="wordDiv clear">
          <span v-for="(item,index) in mnemonicRandomArr" :key="index" @click="sureWord(index)">{{ item }}</span>
        </div>
      </div>
      <div class="btns clear">
        <Button class="prev left" type="default" @click="changeTabs(0)">
          {{ $t('previous') }}
        </Button>
        <Button class="next right" type="success" @click="changeTabs(2)">
          {{ $t('next') }}
        </Button>
      </div>
    </div>

    <div v-if="tags == 2" class="createdDiv3">
      <p class="pageTit">
        {{ $t('Congratulations_on_creating_a_wallet') }}
      </p>
      <p class="pageTxt">
        {{ $t('You_passed_the_test_please_be_sure_to_keep_your_mnemonic_safe') }}
      </p>
      <div class="safetyTips">
        <Row>
          <i-Col span="2">
            <div class="successImg">
              <img src="@/common/img/wallet/exported.png">
            </div>
          </i-Col>
          <i-Col span="19">
            <div class="safetyRemind">
              <p class="remindTit">
                {{ $t('Secure_storage_prompt') }}：
              </p>
              <p class="remindItem">
                {{ $t('Save_backups_in_multiple_locations') }}
              </p>
              <p class="remindItem">
                {{ $t('Don_not_share_mnemonics_with_anyone') }}
              </p>
              <p class="remindItem">
                {{ $t('Beware_of_phishing_Nano_wallet_does_not_naturally_ask_you_to_enter_a_mnemonic') }}
              </p>
              <p class="remindItem">
                {{ $t('If_you_need_to_back_up_your_mnemonics_again_you') }}
              </p>
              <p class="remindItem">
                {{ $t('Nem_wallet_can_not_recover_your_mnemonic') }}
              </p>
            </div>
          </i-Col>
        </Row>
      </div>
      <div class="btns">
        <Button class="next" type="success" @click="toWalletPage()">
          {{ $t('complete') }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import '@/views/wallet/wallet-functions/wallet-created/WalletCreated.less'
// @ts-ignore
import {WalletCreatedTs} from '@/views/wallet/wallet-functions/wallet-created/WalletCreatedTs.ts'

export default class WalletCreated extends WalletCreatedTs {

}
</script>

<style scoped>

</style>
