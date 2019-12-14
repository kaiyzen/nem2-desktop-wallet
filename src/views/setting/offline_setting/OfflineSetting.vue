<template>
  <div class="offline-setting-wrapper">
    <form @submit.prevent="validateForm('offline-setting')" @keyup.enter="submit">
      <ul>
        <li>
          <div class="input-title">
            {{ $t('generation_hash') }}
          </div>
          <div class="default-value">
            {{ $t('current') }}:{{ generationHash }}
          </div>
          <ErrorTooltip field-name="generationHash" placement-override="left">
            <input
              v-model="formItems.generationHash"
              v-validate="validation.generationHash"
              class="radius"
              data-vv-name="generationHash"
              :data-vv-as="$t('generation_hash')"
              :placeholder="$t('please_input_generation_hash')"
              type="text"
            >
          </ErrorTooltip>
        </li>
        <li>
          <div class="input-title">
            {{ $t('mosaicId') }}
          </div>
          <div class="default-value">
            {{ $t('current') }}:{{ networkCurrency.hex }}
          </div>
          <ErrorTooltip field-name="mosaicId" placement-override="left">
            <input
              v-model="formItems.mosaicId"
              v-validate="validation.mosaicId"
              class="radius"
              data-vv-name="mosaicId"
              :data-vv-as="$t('mosaicId')"
              :placeholder="$t('please_input_mosaic_hex')"
              type="text"
            >
          </ErrorTooltip>
        </li>
        <li>
          <div class="input-title">
            {{ $t('mosaic_divisibility') }}
          </div>
          <div class="default-value">
            {{ $t('current') }}:{{ networkCurrency.divisibility }}
          </div>
          <ErrorTooltip field-name="divisibility" placement-override="left">
            <input
              v-model="formItems.divisibility"
              v-validate="validation.divisibility"
              class="radius"
              data-vv-name="divisibility"
              :data-vv-as="$t('divisibility')"
              :placeholder="$t('please_input_divisibility')"
              type="text"
            >
          </ErrorTooltip>
        </li>
        <li>
          <div class="input-title">
            {{ $t('mosaicName') }}
          </div>
          <div class="default-value">
            {{ $t('current') }}:{{ networkCurrency.name }}
          </div>
          <input v-model="formItems.mosaicName" :placeholder="$t('Mosaic_alias')" type="text">
        </li>
      </ul>
      <span class="submit-button radius" @click="submit">{{ $t('confirm') }}</span>
    </form>
  </div>
</template>

<script lang="ts">
import OfflineSettingTs from './OfflineSettingTs'
import "./OfflineSetting.less"

export default class OfflineSetting extends OfflineSettingTs {


}
</script>
<style scoped lang="less">

</style>
