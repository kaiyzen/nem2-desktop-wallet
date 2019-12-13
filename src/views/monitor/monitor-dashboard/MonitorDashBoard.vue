<template>
  <div class="monitor-dashboard-wrapper radius secondary_page_animate">
    <div class="top_network_info radius">
      <div class="top_wallet_info">
        <div class="netWork radius">
          <div class="title">
            <span class="title_txt">{{$t('nodes')}}</span>
          </div>
          <img src="@/common/img/monitor/network.png"/>
          <span class="txt_info"><numberGrow :value="NetworkProperties.nodeNumber"></numberGrow></span>
        </div>
        <div class="block_height radius">
          <div class="title">
            <span class="title_txt">{{$t('blocks')}}</span>
          </div>
          <img src="@/common/img/monitor/block_height.png"/>
          <span class="txt_info">
            <numberGrow :value="NetworkProperties.height"></numberGrow>
          </span>
        </div>
        <div class="amount radius">
          <div class="title">
            <span class="title_txt">{{$t('transactions')}}</span>
          </div>
          <img src="@/common/img/windowDashboardActive.png"/>
          <span class="txt_info">
            <numberGrow :value="NetworkProperties.numTransactions"></numberGrow>
          </span>
        </div>
        <div class="block_time radius">
          <div class="title">
            <span class="title_txt">{{$t('time')}} <span  class="title_txt">{{NetworkProperties.getTimeFromBlockNumber(NetworkProperties.height)}}</span></span>
          </div>
          <img src="@/common/img/monitor/amount.png"/>
          <span class="txt_info">
            <numberGrow :value="NetworkProperties.targetBlockTime"></numberGrow>
          </span>
        </div>
      </div>
    </div>
    <div class="transaction-list-wrapper">
      <TransactionList/>
    </div>

  </div>
</template>

<script lang="ts">
    // @ts-ignore
    import {MonitorDashBoardTs} from '@/views/monitor/monitor-dashboard/MonitorDashBoardTs.ts'
    export default class DashBoard extends MonitorDashBoardTs {
    }
</script>

<style scoped lang="less">
  @import "MonitorDashBoard.less";
</style>
