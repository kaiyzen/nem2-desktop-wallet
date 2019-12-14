<template>
  <div class="serviceSwitchWrap radius secondary_page_animate">
    <div class="serviceSwitchHead">
      <p class="tit">
        {{ $t('service') }}
      </p>
    </div>
    <div class="serviceList">
      <div
        v-for="(item,index) in serviceFnList" :key="index" :class="['serviceItem', item.active?'active':'']"
        @click="toPage(item)"
      >
        <div class="serviceName">
          <i><img :src="nowIcon(item)"></i> <span>{{ $t(item.name) }}</span>
        </div>
        <p v-if="item.active" class="serviceTxt">
          {{ $t(item.introduce) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import './ServiceSwitch.less'
// @ts-ignore
import {ServiceSwitchTs} from '@/views/service/service-switch/ServiceSwitchTs.ts'

export default class ServiceSwitch extends ServiceSwitchTs {

}
</script>

<style scoped>

</style>
