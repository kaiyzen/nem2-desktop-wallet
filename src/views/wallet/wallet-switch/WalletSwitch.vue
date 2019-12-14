<template>
  <div class="walletSwitchWrap">
    <div class="walletSwitchHead">
      <p class="tit">
        {{ $t('Wallet_management') }}
      </p>
      <p class="back-up pointer" @click="showMnemonicDialog=true">
        {{ $t('backup_mnemonic') }}
      </p>
    </div>

    <div ref="walletScroll" class="walletList scroll">
      <div v-for="(item, index) in walletList" :key="index" class="wallet_scroll_item">
        <div
          ref="walletsDiv"
          :class="['walletItem', getWalletStyle(item), 'radius']"
          @click="switchWallet(item.address)"
        >
          <Row>
            <i-Col span="15">
              <div>
                <p class="walletName">
                  {{ item.name }}
                </p>
                <p class="walletAmount overflow_ellipsis">
                  {{ item.balance ? formatNumber(item.balance) : 0 }}
                  <span class="tails">{{ networkCurrency.ticker }}</span>
                </p>
              </div>
            </i-Col>
            <i-Col span="9">
              <div @click.stop>
                <div class="walletTypeTxt">
                  {{ isMultisig(item.address) ? $t('Public_account') : '' }}
                </div>
                <div class="options">
                  <span class="mosaics">
                    <Icon type="logo-buffer" />
                    <span>{{ item.numberOfMosaics ? formatNumber(item.numberOfMosaics ) : 0 }}</span>
                  </span>
                  <span class="delete" @click="showDeleteDialog=true">
                    <Icon type="md-trash" />
                  </span>
                </div>
              </div>
            </i-Col>
          </Row>
        </div>
      </div>
    </div>

    <div class="walletMethod">
      <Row>
        <i-Col span="12">
          <div class="createBtn pointer" @click="toCreate">
            {{ $t('from_seed') }}
          </div>
        </i-Col>
        <i-Col span="12">
          <div class="importBtn pointer" @click="toImport">
            {{ $t('from_privatekey') }}
          </div>
        </i-Col>
      </Row>
    </div>

    <CheckPasswordDialog
      v-if="showCheckPWDialog"
      :visible="showCheckPWDialog"
      :return-password="true"
      @close="showCheckPWDialog = false"
      @passwordValidated="passwordValidated"
    />

    <MnemonicDialog
      v-if="showMnemonicDialog"
      :show-mnemonic-dialog="showMnemonicDialog"
      @closeMnemonicDialog="showMnemonicDialog = false"
    />
    <TheWalletDelete
      :show-check-p-w-dialog="showDeleteDialog"
      :wallet-to-delete="wallet"
      @closeCheckPWDialog="showDeleteDialog=false"
      @on-cancel="showDeleteDialog = false"
    />
  </div>
</template>

<script lang="ts">
import './WalletSwitch.less'
// @ts-ignore
import {WalletSwitchTs} from '@/views/wallet/wallet-switch/WalletSwitchTs.ts'

export default class WalletSwitch extends WalletSwitchTs {
}
</script>

<style scoped>
</style>
